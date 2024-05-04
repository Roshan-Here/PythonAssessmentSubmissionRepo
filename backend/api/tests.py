from django.test import TestCase

import httpx
import asyncio
import requests


# Create your tests here.

def fetch_repolist_data():
        query = "hello world"
        github_api_endpoint = f"https://api.github.com/search/repositories?q={query}"
        response = requests.get(github_api_endpoint)
        data = response.json()
        print(data)
        
# uncomment it when needed !
# fetch_data() 

# -> https://api.github.com/repos/OWNER/REPO to fetch data from particular repository

def fetch_repo_data():
        query = "Roshan-here/Xhatgpt"
        github_api_endpint = f"https://api.github.com/repos/{query}"
        response = requests.get(github_api_endpint)
        data = response.json()
        print(data)
        
# uncomment it when needed !
# fetch_repo_data()