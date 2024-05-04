from django.urls import path
from .views import FetchRepoListData,FetchRepoData

urlpatterns = [
    path("listrepo/", FetchRepoListData.as_view(), name="fetch-repositories-data"),
    path("repo/", FetchRepoData.as_view(), name="fetch-particular-repo-data")
]
