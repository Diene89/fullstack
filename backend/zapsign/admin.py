from django.contrib import admin
from zapsign.models import Company, Doc, User

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'last_updated_at', 'locale', 'lang', 'created_by')
    list_display_links = ('id', 'name')
    search_fields = ('name', 'created_at', 'last_updated_at', 'locale', 'lang', 'created_by')
    list_per_page = 20

admin.site.register(Company, CompanyAdmin)

class DocAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'deleted', 'created_at', 'last_update_at', 'date_limit_to_sign', 'signed', 'company', 'created_by')
    list_display_links = ('id', 'name')
    search_fields = ('name', 'deleted', 'created_at', 'last_update_at', 'date_limit_to_sign', 'signed', 'company', 'created_by')
    list_per_page = 20

admin.site.register(Doc, DocAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'company')
    list_display_links = ('id', 'email',)
    search_fields = ('email', 'last_password_redefinition_at', 'email_verified', 'password', 'created_at', 'last_update_at', 'company', 'companies')
    list_per_page = 20

admin.site.register(User, UserAdmin)
