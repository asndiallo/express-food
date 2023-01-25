from bson import ObjectId
from jwt import PyJWT
import datetime
from decouple import config
from rest_framework.response import Response
from rest_framework import generics, views, status, viewsets
from django.contrib.auth.hashers import make_password, check_password
from .models import Customer, Cart
from menus.models import Menu
from .serializers import CustomerSerializer, SignupSerializer, LoginSerializer, CartSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = '_id'

    def get_object(self):
        return Customer.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer

    def perform_create(self, serializer):
        # Hash the user's password before saving it to the database
        password = serializer.validated_data.pop('password')
        hashed_password = make_password(password)
        serializer.validated_data['password'] = hashed_password
        # Create a new customer object and save it to the database
        customer = Customer(**serializer.validated_data)
        customer.save()
        return Response(status=status.HTTP_201_CREATED)


class LoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = Customer.objects.filter(email=email).first()
        if user and check_password(password, user.password):
            # Create a new JWT object
            jwt_encoder = PyJWT()

            # Set the payload for the JWT
            payload = {
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }

            # Encode the payload and create the token
            secret_key = config('TOKEN_SECRET_KEY')
            token = jwt_encoder.encode(payload, secret_key)
            return Response({'token': token, 'customer_id': str(user._id), }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(_id=ObjectId(customer_id))
        return Cart.objects.filter(customer=customer)

    def perform_create(self, request, *args, **kwargs):
        serializer = CartSerializer(data=request.data)
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(_id=ObjectId(customer_id))
        serializer.save(customer=customer)
