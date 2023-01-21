from bson import ObjectId
from rest_framework import generics
from .models import Customer
from .serializers import CustomerSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Customer.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


""" def create_customer(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('customer_list')
    else:
        form = CustomerForm()
    return render(request, 'create_customer.html', {'form': form}) """


""" def customer_detail(request, pk):
    customer = Customer.objects.get(_id=ObjectId(pk))
    return render(request, 'customer_detail.html', {'customer': customer}) """
