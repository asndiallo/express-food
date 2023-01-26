from djongo import models


class Menu(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.FloatField()
    type = models.CharField(max_length=255)
    image = models.CharField(max_length=1024)

    def __str__(self):
        return self.name
