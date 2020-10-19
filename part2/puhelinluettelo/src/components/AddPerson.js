import React from "react";

const AddPerson = (props) =>  {

	const handleNameChange = (event) => {
	  console.log('console: ', event.target.value)
	  props.setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
	  console.log('console: ', event.target.value)
	  props.setNewNumber(event.target.value)
	}

	const addNewPerson = (event) => {
	  event.preventDefault()
	  const nameObject = {
		name: props.newName,
		number: props.newNumber
	  }
	  for (let i  = 0;i < props.persons.length; i++) {
		if (props.persons[i].name === nameObject.name) {
		  alert(`${nameObject.name} is already added to phonebook`)
		  return
		}
	  }
	  props.setPersons(props.persons.concat(nameObject))
	}
	return (
	<div>
	  <form onSubmit={addNewPerson}>
		  <div>
			name: <input
			value={props.newName}
			onChange={handleNameChange}
			/>
		  </div>
		  <div>
			number: <input
			value={props.newNumber}
			onChange={handleNumberChange}
			/>
		  </div>
		  <div>
			<button type="submit">add</button>
		  </div>
		</form>
	  </div>
	)
  }

export default AddPerson;
