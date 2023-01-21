# Generated by Django 4.1.5 on 2023-01-21 22:17

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                (
                    "_id",
                    djongo.models.fields.ObjectIdField(
                        auto_created=True, primary_key=True, serialize=False
                    ),
                ),
                ("last_name", models.CharField(max_length=255)),
                ("first_name", models.CharField(max_length=255)),
                ("birthday", models.DateTimeField()),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("password", models.CharField(max_length=255)),
                ("phone", models.CharField(max_length=15)),
                ("address", models.CharField(max_length=255)),
                ("zip", models.IntegerField()),
                ("country", models.CharField(max_length=255)),
            ],
        ),
    ]
