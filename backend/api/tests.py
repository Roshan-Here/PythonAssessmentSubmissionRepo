from django.test import TestCase

import httpx
import asyncio
import requests


# Create your tests here.

def fetch_data():
        query = "hello world"
        github_api_endpoint = f"https://api.github.com/search/repositories?q={query}"
        response = requests.get(github_api_endpoint)
        data = response.json()
        print(data)
        
fetch_data()