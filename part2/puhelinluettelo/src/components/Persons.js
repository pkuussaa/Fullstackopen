import React from "react";

const Persons = (props) => {
	let filtered = [...props.persons];
	if(props.filter){
		filtered = filtered.filter((person) => person.name.toLowerCase().includes(props.filter));
	}

	return (
	  <div>
		{filtered.map(filtered => <p key={filtered.name}>{filtered.name} {filtered.number}</p>)}
	  </div>
	)
  };

export default Persons;
