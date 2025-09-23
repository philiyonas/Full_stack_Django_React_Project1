from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer): # Serializer for User model created implecitly with fields id, username, password    
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}# Ensure password is write-only
    def create(self, validated_data): # Override create method to hash password
        user =User.objects.create_user(**validated_data) # create_user method hashes the password
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note  
        fields = ["id", "title", "content", "created_at", "author"] 
        extra_kwargs = {"author": {"read_only": True}} # Ensure author is read-only and set automatically by the view 
        
