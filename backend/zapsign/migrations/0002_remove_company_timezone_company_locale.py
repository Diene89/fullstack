# Generated by Django 4.2.2 on 2023-06-20 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zapsign', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='timezone',
        ),
        migrations.AddField(
            model_name='company',
            name='locale',
            field=models.CharField(default='-03:00', max_length=50),
        ),
    ]
