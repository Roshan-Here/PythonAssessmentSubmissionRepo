from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import SearchQuerySerializer
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
