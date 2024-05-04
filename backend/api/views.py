from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SearchQuerySerializer,RepositoriesSerializer
from .models import Repositories
import requests

# creating view for fetching List of Repository datas 

class FetchRepoListData(generics.CreateAPIView):
    """
    fetch data using user input
    """
    serializer_class = SearchQuerySerializer
    
    def create(self, request, *args, **kwargs):
        # print(request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data["userquery"]
            try:
                github_api_endpoint = f"https://api.github.com/search/repositories?q={query}"
                
                resp = requests.get(github_api_endpoint)
                
                if resp.status_code == 200:
                    data = resp.json()
                    # updata = data["items"]
                    # name, forks_count, full_name ->html_url , owner.login, stargazers_count
                    full_data = []
                    for items in data.get("items",[]):
                        my_data = {
                            "name" : items["name"],
                            "description" : items["description"],
                            "owner": items["owner"]["login"],
                            "url": items["html_url"],
                            "stars" : items["stargazers_count"],
                            "forks" : items["forks_count"]
                        }
                        full_data.append(my_data)
                    searched_repositorys = {
                        "repositories": full_data
                    }    
                    
                    # print(updata)
                    return Response(searched_repositorys, status=status.HTTP_200_OK)
                else:
                    ERR_MSG = {"error": "Failed to fetch data! Maybe unavailable"}
                    return Response(ERR_MSG, status=resp.status_code)
                
            except Exception as e:
                print(e)
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FetchRepoData(generics.CreateAPIView):
    """_summary_
        fetching particular repository name using same serializer for query
    """
    serializer_class = SearchQuerySerializer
    
    def create(self, request, *args, **kwargs):
        # incomming data
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data["userquery"]
            # print(query)
            try:
                git_endpint = f"https://api.github.com/repos/{query}"
                resp = requests.get(git_endpint)
                data = resp.json()
                # print(data["full_name"]) # username/repo_name
                # print(data["owner"]["login"]) # username
                # print(data["description"])
                # print(data["html_url"]) # go to repository link
                # print(data["owner"]["avatar_url"])
                # print(data["stargazers_count"]) # stars count
                # print(data["forks"]) # fork count
                
                my_data = {
                    "repo_name" : data["full_name"],
                    "owner_name" : data["owner"]["login"],
                    "description" : data["description"],
                    "html_url" : data["html_url"],
                    "avathar_url" : data["owner"]["avatar_url"],
                    "stars_count" : data["stargazers_count"],
                    "forks_count" : data["forks"] 
                }
                
                data_instance = Repositories.objects.create(**my_data)
                print(data_instance)
                if resp.status_code ==200:
                    return Response(my_data, status=status.HTTP_200_OK)
                else:
                    ERR_MSG = {
                        "error": "No data found for this repository" 
                    }
                    return Response(ERR_MSG, status=resp.status_code)
                
            except Exception as e:
                return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SavedRepositroyListView(generics.ListAPIView):
    queryset = Repositories.objects.all().order_by('searched_at')
    serializer_class = RepositoriesSerializer
    
    
class EraseAllSavedRepositories(APIView):
    def delete(self,request,*args,**kwargs):
        try:
            Repositories.objects.all().delete()
            return Response({"message": "All data deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)