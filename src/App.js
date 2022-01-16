import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      setStudents(students.data.students);
    };
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <div className="student-container">
        {students.map((student) => (
          <div key={student.id} className="student">
            <img
              src={student.pic}
              alt={student.firstname}
              className="student-image"
            ></img>
            <div className="name">
              {student.firstName} {student.lastName}
            </div>
            <div>Email: {student.email}</div>
            <div>Company: {student.company}</div>
            <div>
              Average:{" "}
              {student.grades.map(Number).reduce((a, b) => a + b, 0) /
                student.grades.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
