from bson import ObjectId
from jwt import PyJWT
import datetime
from decouple import config
from rest_framework.response import Response
from rest_framework import generics, views, status, viewsets
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404
from .models import Customer, Cart, Order
from .serializers import CustomerSerializer, SignupSerializer, LoginSerializer, CartSerializer, OrderSerializer


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
    lookup_field = 'cart_id'

    def get_object(self):
        return Cart.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))

    def get_queryset(self):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(_id=ObjectId(customer_id))
        return Cart.objects.filter(customer=customer)

    def add_to_cart(self, request, *args, **kwargs):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(_id=ObjectId(customer_id))
        queryset = Cart.objects.filter(customer=customer)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print('instance', instance)
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'order_id'

    def get_object(self):
        return get_object_or_404(Order, _id=self.kwargs[self.lookup_field])

    def get_queryset(self):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(_id=ObjectId(customer_id))
        return Order.objects.filter(customer=customer)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        order = self.get_object()
        serializer = self.get_serializer(
            order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        order = self.get_object()
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
