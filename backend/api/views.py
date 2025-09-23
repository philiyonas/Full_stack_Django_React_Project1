from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .serializers import NoteSerializer, UserSerializer 

# Create your views here.
class createUserView(generics.CreateAPIView):
    queryset = User.objects.all() # Queryset for User model 
    serializer_class = UserSerializer # Serializer to handle user creation
    permission_classes = [AllowAny] # Allow anyone to create a user


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer # Serializer to handle Note serialization
    permission_classes = [IsAuthenticated] # Only authenticated users can access this view
    
    def get_queryset(self): # Override to return notes for the logged-in user only
            return Note.objects.filter(author=self.request.user) # Filter notes by the logged-in user
    

    def perform_create(self, serializer): # Override to set the author to the logged-in user
        if serializer.is_valid():
             serializer.save(author=self.request.user) # Set the author to the logged-in user
        else:
            print(serializer.errors)# need to handle this case appropriately
 
 
class NoteDeleteView(generics.DestroyAPIView):
    serializer_class = NoteSerializer # Serializer to handle Note serialization
    permission_classes = [IsAuthenticated] # Only authenticated users can access this view

    def get_queryset(self): # Override to ensure users can only delete their own notes
        return Note.objects.filter(author=self.request.user) # Filter notes by the logged-in user