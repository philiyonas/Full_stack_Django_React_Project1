from django.urls import path
from . import views 
#from .views import NoteDeleteView, NoteListCreateView, createUserView


urlpatterns = [
    #path('create-user/', createUserView.as_view(), name='create-user'), # Endpoint for user creation
    path('notes/', views.NoteListCreateView.as_view(), name='note-list'), # Endpoint for listing and creating notes
    path('notes/delete/<int:pk>/', views.NoteDeleteView.as_view(), name='delete-note'), # Endpoint for deleting a specific note
]