from django.urls import path
from .views import FetchRepoListData

urlpatterns = [
    path("repo/", FetchRepoListData.as_view(), name="fetch-repositories-data")
]
