# Generated by Django 5.0.6 on 2024-06-05 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('partapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordermodel',
            name='city',
            field=models.CharField(default=1, max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ordermodel',
            name='first_name',
            field=models.CharField(default=1, max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ordermodel',
            name='last_name',
            field=models.CharField(default=1, max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ordermodel',
            name='payment_method',
            field=models.CharField(default=1, max_length=128),
            preserve_default=False,
        ),
    ]
