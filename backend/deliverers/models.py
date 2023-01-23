from djongo import models


class Deliverer(models.Model):
    _id = models.ObjectIdField()
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    status = models.CharField(max_length=255, default='free')
    position = models.CharField(max_length=255)
    command_count = models.IntegerField()
    rating = models.FloatField()
