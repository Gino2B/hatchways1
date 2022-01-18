import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import Student from "./components/Student/Student";

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
  };
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="App">
      <div className="student-container">
        <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
        {searchResults.map((student) => (
          <Student student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
