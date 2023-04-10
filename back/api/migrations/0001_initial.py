# Generated by Django 4.1.3 on 2023-04-06 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Correctpic",
            fields=[
                ("uid", models.AutoField(primary_key=True, serialize=False)),
                (
                    "picturefilename",
                    models.FileField(
                        blank=True,
                        db_column="pictureFileName",
                        max_length=255,
                        upload_to="doctor/",
                    ),
                ),
            ],
            options={"db_table": "correctPic", "managed": False,},
        ),
        migrations.CreateModel(
            name="Doctor",
            fields=[
                ("uid", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=30)),
                ("id", models.CharField(max_length=30, unique=True)),
                ("password", models.CharField(max_length=50)),
                ("email", models.CharField(max_length=50, unique=True)),
                (
                    "doctornum",
                    models.IntegerField(db_column="doctorNum", null=True, unique=True),
                ),
                (
                    "hospitalname",
                    models.CharField(
                        blank=True, db_column="hospitalName", max_length=50, null=True
                    ),
                ),
                (
                    "state",
                    models.CharField(
                        blank=True, db_column="state", default="ready", max_length=30
                    ),
                ),
            ],
            options={"db_table": "doctor", "managed": False,},
        ),
        migrations.CreateModel(
            name="Doctorcomment",
            fields=[
                ("uid", models.AutoField(primary_key=True, serialize=False)),
                ("text", models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={"db_table": "doctorComment", "managed": False,},
        ),
        migrations.CreateModel(
            name="Manage",
            fields=[("uid", models.AutoField(primary_key=True, serialize=False)),],
            options={"db_table": "manage", "managed": False,},
        ),
        migrations.CreateModel(
            name="Patient",
            fields=[
                ("uid", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=30)),
                ("id", models.CharField(max_length=30, unique=True)),
                ("password", models.CharField(max_length=50)),
                ("email", models.CharField(max_length=50, unique=True)),
            ],
            options={"db_table": "patient", "managed": False,},
        ),
        migrations.CreateModel(
            name="Patientpic",
            fields=[
                ("uid", models.AutoField(primary_key=True, serialize=False)),
                (
                    "picturefilename",
                    models.FileField(
                        db_column="pictureFileName", max_length=255, upload_to="patient"
                    ),
                ),
                ("score", models.IntegerField(blank=True, null=True)),
            ],
            options={"db_table": "patientPic", "managed": False,},
        ),
    ]
