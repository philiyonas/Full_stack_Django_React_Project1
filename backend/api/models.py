from django.db import models

# Create your models here.
"""expalanation of class Note: it represents a note-taking model with fields for title, 
content, creation timestamp, and an author relationship to the User model."""

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('User',on_delete=models.CASCADE,related_name='notes')# Foreign key to User model for author relationship
    
    def __str__(self):
        return self.title
