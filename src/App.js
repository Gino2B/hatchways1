import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      setStudents(students.data.students);
      setSearchResults(students.data.students);
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    const results = students.filter(
      (student) =>
        student.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        student.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
    // setApplySort(true);
  };
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="App">
      <div className="student-container">
        <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
        {searchResults.map((student) => (
          <div key={student.id} className="student">
            <img
              src={student.pic}
              alt={student.firstname}
              className="student-image"
            ></img>
            <div className="student-info-container">
              <div className="student-name">
                {student.firstName} {student.lastName}
              </div>
              <div className="student-email">Email: {student.email}</div>
              <div className="student-company">Company: {student.company}</div>
              <div className="student-skill">Skill: {student.skill}</div>
              <div className="student-average">
                Average:{" "}
                {student.grades.map(Number).reduce((a, b) => a + b, 0) /
                  student.grades.length}
                %
              </div>
              <button>+</button>
              {/* <div className="show-grades">
                {student.grades.map((grades) => (
                  <div>{grades}</div>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
