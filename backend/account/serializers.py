from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class RegisterUserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True,
    validators=[validate_password]
  )

  class Meta:
    model = User
    fields = ['username', 'first_name', 'last_name', 'email', 'password']
    extra_kwargs = {
      'password': {'write_only': True},
    }
  
  def create(self, validated_data):
    user = User(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data.get('first_name', ''),
      last_name=validated_data.get('last_name', '')
    )
    user.set_password(validated_data['password'])
    user.save()
    return user
