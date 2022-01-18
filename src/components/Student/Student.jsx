import { useState } from "react";
import "./Student.css";

function Student({ student }) {
  const [buttonState, setButtonState] = useState("+");
  const [showMore, setShowMore] = useState("true");

  const handleShowMore = () => {
    if (showMore === false) {
      setButtonState("+");
    } else {
      setButtonState("-");
    }
    setShowMore(!showMore);
  };
  return (
    <div key={student.id} className="student">
      <div className="student-info-container">
        <img
          src={student.pic}
          alt={student.firstname}
          className="student-image"
        ></img>
        <div className="student-text">
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
        </div>
        <button className="show-more-button" onClick={handleShowMore}>
          {buttonState}
        </button>
      </div>
      <div
        className="show-grades"
        style={showMore === false ? { display: "" } : { display: "none" }}
      >
        {student.grades.map((grades, index) => (
          <div key={index}>
            Test {index + 1}:{" "}
            <div className="grade-number " style={{ display: "inline" }}>
              {grades}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Student;
