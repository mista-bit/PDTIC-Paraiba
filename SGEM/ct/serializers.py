from rest_framework import serializers
from ct.models import ct

class CTSerializer(serializers.ModelSerializer):
    class Meta:
        model = ct
        fields = '__all__'
        read_only_fields = ['id_ct']
        