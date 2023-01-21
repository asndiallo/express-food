from django.shortcuts import render, redirect
from bson.objectid import ObjectId
from .models import Customer
from django.views.generic import ListView
from .forms import CustomerForm


class CustomerListView(ListView):
    model = Customer
    template_name = 'customer_list.html'
    context_object_name = 'customers'


def create_customer(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('customer_list')
    else:
        form = CustomerForm()
    return render(request, 'create_customer.html', {'form': form})


def customer_detail(request, pk):
    customer = Customer.objects.get(_id=ObjectId(pk))
    return render(request, 'customer_detail.html', {'customer': customer})
