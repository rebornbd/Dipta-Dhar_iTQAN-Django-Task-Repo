from django.db import models


class Category(models.Model):
  name  = models.CharField(max_length=150, unique=True)
  photo = models.TextField(null=True, blank=True)

  def __str__(self):
    return self.name


class Product(models.Model):
  category      = models.ForeignKey(Category, verbose_name='category', related_name='products', on_delete=models.CASCADE)
  name          = models.CharField(verbose_name='name', max_length=255)
  short_desc    = models.TextField(verbose_name='short description', null=True, blank=True)
  long_desc     = models.TextField(verbose_name='long description', null=True, blank=True)
  photo         = models.TextField(null=True, blank=True)
  is_published  = models.BooleanField(default=True)
  view_count    = models.IntegerField(default=0)
  custom1       = models.CharField(max_length=255, null=True, blank=True)
  custom2       = models.CharField(max_length=255, null=True, blank=True)
  custom3       = models.CharField(max_length=255, null=True, blank=True)
  
  created_at  = models.DateTimeField(auto_now_add=True)
  updated_at  = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.name
