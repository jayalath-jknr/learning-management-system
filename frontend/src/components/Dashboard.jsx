import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const { user } = useUser();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8000/enrollments?user_id=${user.id}`);
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {user.firstName}
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Your Enrolled Courses
      </Typography>
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map(course => (
          <Card key={course.id} style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">
          You have not enrolled in any courses yet.
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
