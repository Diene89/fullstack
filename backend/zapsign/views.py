from rest_framework import viewsets, generics
from zapsign.models import Company, Doc, User
from zapsign.serializer import CompanySerializer, DocSerializer, UserSerializer, ListDocsUserSerializer, ListDocsCompanySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    authentication_classes = []
    permission_classes = []

class DocViewSet(viewsets.ModelViewSet):
    queryset = Doc.objects.all()
    serializer_class = DocSerializer
    authentication_classes = []
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

class ListDocsUserViewSet(generics.ListAPIView):
    queryset = Doc.objects.all()
    def get_queryset(self):
        return Doc.objects.filter(created_by=self.kwargs['pk'])
    serializer_class = ListDocsUserSerializer
    authentication_classes = []
    permission_classes = []

class ListDocsCompanyViewSet(generics.ListAPIView):
    queryset = Doc.objects.all()
    def get_queryset(self):
        return Doc.objects.filter(company=self.kwargs['pk'])
    serializer_class = ListDocsCompanySerializer
    authentication_classes = []
    permission_classes = []