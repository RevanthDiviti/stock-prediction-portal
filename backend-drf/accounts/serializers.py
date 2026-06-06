from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only = True,min_length = 8,style={'input_type': 'password' })
    #To not work for get method. Password should not be retrieved. 
    # It should only work with post and put.
    # it is only writable. Cannot Read
    
    class Meta:
        model = User
        fields = ['username','email','password']
    
    def create(self,validated_data):
        # User.objects.craete --> Save the password in a plane text
        # User.objects.create_user  --> Automatically hash the password

        user = User.objects.create_user(
           username =  validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password'],
        )
        # user = User.objects.create_user(**validated_data)
        return user