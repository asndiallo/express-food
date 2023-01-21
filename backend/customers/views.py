from bson import ObjectId
import jwt
from rest_framework.response import Response
from rest_framework import generics, views, status
from django.contrib.auth.hashers import make_password, check_password
from .models import Customer
from .serializers import CustomerSerializer, SignupSerializer, LoginSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

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


class LoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = Customer.objects.filter(email=email).first()
        if user and check_password(password, user.password):
            # Generate JWT token
            token = jwt.encode({'email': email}, 'secret-key')
            return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

