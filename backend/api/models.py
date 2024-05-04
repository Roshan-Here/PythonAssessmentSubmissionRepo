from django.db import models

# Create your models here.

class Repositories(models.Model):
    repo_name = models.CharField(max_length=256, blank=False, null=False)
    owner_name = models.CharField(max_length=256, blank=False)
    description = models.TextField()
    language = models.CharField(max_length=256, blank=True, null=True)
    html_url =  models.CharField(max_length=250,blank=False)
    # profile image url 
    avathar_url = models.CharField(max_length=250, blank=False)
    stars_count = models.IntegerField()
    forks_count = models.IntegerField()
    searched_at = models.DateTimeField(auto_now_add=True)
    