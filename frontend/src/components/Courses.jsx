import React, { useEffect } from "react";

export default function Courses() {
  const courses = [
    { name: "Java"},
    { name: "Python"},
    { name: "CPP"},
    { name: "AWS" },
    { name: "JavaScript"},
    { name: "AI/ML"},
    { name: "Frontend Development"},
    { name: "Data Science"},
    { name: "Swift"},
    { name: "Kotlin"},
    { name: "DevOps"},
    { name: "Cloud Computing"},
  ];

  useEffect(() => {
    // Save the current body background
    const originalBackground = document.body.style.background;

    // Remove background completely
    document.body.style.background = "white";

    // Restore background when component unmounts
    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  const startExam = (courseName) => {
    window.location.href = `/exam?course=${encodeURIComponent(courseName)}`;
  };

  return (
    <div className="courses-page">
      <h2>Your Available Courses</h2>
      <div className="course-container">
        {courses.map((course) => (
          <div key={course.name} className="course-card">
            <img
              src={`/images/${course.img}`}
              alt={course.name}
              className="course-img"
            />
            <h3>{course.name}</h3>
            <button onClick={() => startExam(course.name)}>Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}
