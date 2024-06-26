# Generated by Django 4.2.7 on 2024-05-01 19:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('IntelliQuest_v1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookmarked',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paperID', models.CharField(max_length=50)),
                ('year', models.IntegerField(null=True)),
                ('title', models.CharField(max_length=512)),
                ('papersource', models.BigIntegerField(null=True)),
                ('personal_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='IntelliQuest_v1.personalprofile')),
            ],
            options={
                'verbose_name_plural': 'Bookmarked Papers',
                'unique_together': {('personal_info', 'paperID')},
            },
        ),
    ]
