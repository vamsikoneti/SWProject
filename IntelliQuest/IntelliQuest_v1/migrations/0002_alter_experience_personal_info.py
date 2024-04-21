# Generated by Django 4.2.7 on 2024-04-21 12:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("IntelliQuest_v1", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="experience",
            name="personal_info",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="experience",
                to="IntelliQuest_v1.personalprofile",
            ),
        ),
    ]
