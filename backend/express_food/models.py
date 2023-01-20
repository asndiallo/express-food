from djongo import models


class Customer(models.Model):
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    birthday = models.DateTimeField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    adresse = models.CharField(max_length=255)
    zip = models.IntegerField()
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name + " " + self.last_name
