from django.db import models
from timezone_field import TimeZoneField

class Company(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    locale = models.CharField(max_length=50, default="-03:00")
    lang = models.CharField(max_length=2, choices=[('pt', 'Português'), ('es', 'Espanhol'), ('en', 'Inglês')], default='pt')
    created_by = models.ForeignKey('User', on_delete=models.CASCADE, related_name="Companies_created")

    def __str__(self):
        return self.name

class Doc(models.Model):
    name = models.CharField(max_length=255, blank=True)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update_at = models.DateTimeField(auto_now=True)
    date_limit_to_sign = models.DateTimeField(null=True)
    signed = models.BooleanField(default=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="Docs")
    created_by = models.ForeignKey('User', on_delete=models.CASCADE, related_name="Docs_created")

    def __str__(self):
        return self.name

class User(models.Model):
    email = models.EmailField(max_length=255)
    last_password_redefinition_at = models.DateTimeField(null=True)
    email_verified = models.BooleanField(default=False)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update_at = models.DateTimeField(auto_now=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name='Users')
    companies = models.ManyToManyField(Company, blank=True)

    def __str__(self):
        return self.email
