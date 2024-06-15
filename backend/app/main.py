from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from bson import ObjectId
from pymongo import MongoClient
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins (for development purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MongoDB client
client = MongoClient('mongodb+srv://<username>:<password>@learning.paqzzi8.mongodb.net/?retryWrites=true&w=majority&appName=learning')
db = client['online_learning']
students_collection = db['students']
courses_collection = db['courses']
enrollments_collection = db['enrollments']

# Pydantic models for request/response validation
class Student(BaseModel):
    email: str
    name: str
    password: str

class Course(BaseModel):
    title: str
    description: str
    instructor: str

class Enrollment(BaseModel):
    student_id: str
    course_id: str
    enrollment_date: datetime
    status: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Online Learning Platform API"}

@app.post("/students/", response_model=Student)
async def create_student(student: Student):
    student_data = student.dict()
    student_data['_id'] = ObjectId()
    result = students_collection.insert_one(student_data)
    return student

@app.get("/courses/", response_model=List[Course])
async def list_courses():
    courses = list(courses_collection.find())
    return courses

@app.post("/enroll/", response_model=Enrollment)
async def enroll_student(enrollment: Enrollment):
    enrollment_data = enrollment.dict()
    enrollment_data['_id'] = ObjectId()
    result = enrollments_collection.insert_one(enrollment_data)
    return enrollment

@app.get("/enrollments")
async def get_enrollments(user_id: str):
    enrollments = enrollments_collection.find({"student_id": user_id})
    courses = []
    for enrollment in enrollments:
        course = courses_collection.find_one({"_id": ObjectId(enrollment["course_id"])})
        if course:
            course_data = {
                "id": str(course["_id"]),
                "title": course["title"],
                "description": course["description"]
            }
            courses.append(course_data)
    return courses

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
