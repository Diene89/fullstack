from rest_framework import serializers
from zapsign.models import Company, Doc, User

class CompanySerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.email')
    class Meta:
        model = Company
        fields = ('id', 'name', 'created_at', 'last_updated_at', 'locale', 'lang', 'created_by')

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = User
        fields = ('id', 'email', 'last_password_redefinition_at', 'email_verified', 'created_at', 'last_update_at', 'company')

class DocSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='email'
    )
    company = serializers.SlugRelatedField(
        queryset=Company.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Doc
        fields = ('id', 'name', 'deleted', 'created_at', 'last_update_at', 'date_limit_to_sign', 'signed', 'created_by', 'company')

class ListDocsUserSerializer(serializers.ModelSerializer):  
    created_by = UserSerializer()
    created_by = serializers.ReadOnlyField(source='created_by.email')

    class Meta:
        model = Doc
        fields = ('id', 'name', 'deleted', 'created_at', 'last_update_at', 'date_limit_to_sign', 'signed', 'company', 'created_by')

class ListDocsCompanySerializer(serializers.ModelSerializer):  
    company = CompanySerializer()
    created_by = serializers.ReadOnlyField(source='created_by.email')
    class Meta:
        model = Doc
        fields = ('id', 'name', 'deleted', 'created_at', 'last_update_at', 'date_limit_to_sign', 'signed', 'company', 'created_by')
