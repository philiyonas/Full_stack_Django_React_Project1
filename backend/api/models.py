from django.db import models
from django.contrib.auth.models import User


# Create your models here.
"""expalanation of class Note: it represents a note-taking model with fields for title, 
content, creation timestamp, and an author relationship to the User model."""
# note here our user author is linked to the built-in User model from django.contrib.auth.models
# we will import it in the views.py file where we will use it to create users
# and in the serializers.py file where we will serialize user data for API responses.
# The author field establishes a foreign key relationship with the User model,
# indicating that each note is associated with a specific user.
# The related_name='notes' allows us to access all notes created by a user via user.notes.all().
# This setup is essential for implementing user-specific note management in the application.

#USer model is imported from django.contrib.auth.models in views.py and serializers.py
#and not here to avoid circular importand we can access notes created by author suing related name and using user.notes.all() 
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='notes')# author has 1 to many relationship with User model and notes is the related name to access notes of a user
    
    def __str__(self):
        return self.title

