import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import Student from "./components/Student/Student";

function App() {
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [tagCollection, setTagCollection] = useState({});

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

  const handleSearchName = (e) => {
    const results = students.filter(
      (student) =>
        student.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        student.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchTag = (e) => {
    if (e.target.value === "") {
      setSearchResults(students);
      return;
    }

    const matchingIds = Object.keys(tagCollection).filter((id) =>
      tagCollection[id].some((arr) => arr.includes(e.target.value))
    );

    const results = students.filter((student) =>
      matchingIds.includes(student.id)
    );

    setSearchResults(results);
  };

  return (
    <div className="App">
      <div className="student-container">
        <Search placeholder="Search by Name" handleSearch={handleSearchName} />
        <Search placeholder="Search by Tag" handleSearch={handleSearchTag} />
        {searchResults.map((student) => (
          <Student
            key={student.id}
            student={student}
            tagCollection={tagCollection}
            setTagCollection={setTagCollection}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
