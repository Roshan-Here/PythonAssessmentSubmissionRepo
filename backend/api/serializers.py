from rest_framework import serializers


# custom search query serializer

class SearchQuerySerializer(serializers.Serializer):
    userquery = serializers.CharField(max_length=250)
    
    def validate_query(self, query):
        if not query:
            raise serializers.ValidationError("search query is required!")
        return query