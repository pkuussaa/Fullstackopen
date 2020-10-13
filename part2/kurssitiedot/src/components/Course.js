import React from "react";

const Header = (props) => {
    return (<h1>{props.courseName}</h1>);
};

const Content = ({parts}) => {
  const rows = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />);
      return (<div>{rows}</div>);
};

const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>);
};

const Total = ({parts}) => {
  const total = parts.reduce((accumulator,thisPart) => accumulator + thisPart.exercises, 0)
  return (<p><strong>total of {total} exercises</strong></p>)
};

const  Course = ({course}) => {
  return (
    <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

export default Course;
