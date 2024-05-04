from rest_framework import serializers
from .models import Repositories

# custom search query serializer

class SearchQuerySerializer(serializers.Serializer):
    userquery = serializers.CharField(max_length=250)
    
    def validate_query(self, query):
        if not query:
            raise serializers.ValidationError("search query is required!")
        return query
    
class RepositoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repositories
        fields = [
            "id",
            "repo_name", 
            "owner_name",
            "description",
            "html_url",
            "avathar_url",
            "stars_count",
            "forks_count", 
        ]