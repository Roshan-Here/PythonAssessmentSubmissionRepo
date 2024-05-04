from django.urls import path
from .views import (
    FetchRepoListData,
    FetchRepoData,
    SavedRepositroyListView,
    EraseAllSavedRepositories
    )

urlpatterns = [
    path("listrepo/", FetchRepoListData.as_view(), name="fetch-repositories-data"),
    path("repo/", FetchRepoData.as_view(), name="fetch-particular-repo-data"),
    path("savedrepo/", SavedRepositroyListView.as_view(), name="view-all-saved-repo"),
    path("eraseall/", EraseAllSavedRepositories.as_view(), name="delete-all-history")
]
