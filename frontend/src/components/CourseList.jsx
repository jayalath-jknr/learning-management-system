import React, { useEffect, useState } from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetch('http://localhost:8000/courses/')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      alert('You need to sign in to enroll in a course');
      return;
    }

    const enrollmentData = {
      student_id: user.id,
      course_id: courseId,
      enrollment_date: new Date().toISOString(),
      status: 'enrolled'
    };

    const response = await fetch('http://localhost:8000/enroll/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    if (response.ok) {
      alert('Enrollment successful');
    } else {
      alert('Enrollment failed');
    }
  };

  return (
    <div>
      <SignedIn>
        {courses.map(course => (
          <Card key={course._id} style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll
              </Button>
            </CardContent>
          </Card>
        ))}
      </SignedIn>
      <SignedOut>
        <Typography variant="h5" align="center">
          Please <Link to="/sign-in-student">sign in</Link> to view and enroll in courses.
        </Typography>
      </SignedOut>
    </div>
  );
};

export default CourseList;
