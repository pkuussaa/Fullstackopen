import React from "react";
import contactService from '../services/Contacts';

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
	  if (props.persons.map(person =>
		person.name.toLowerCase()).includes(props.newName.toLowerCase())) {
	  for (let i  = 0;i < props.persons.length; i++) {
		if (props.persons[i].name.toLowerCase() === nameObject.name.toLowerCase()) {
		  if  (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
			const newContact = {...props.persons[i], name: props.newName, number: props.newNumber}
			console.log(newContact)
			contactService.update(newContact.id, newContact)
			.then((contact) => {
				console.log(contact)
				props.setPersons(props.persons.map(con => con.name.toLowerCase() === contact.name.toLowerCase() ? contact : con))
			}).catch(error => {
				props.setErrorMessage(`Contact ${nameObject.name} was already removed from the sever`)
				setTimeout(() => {
					props.setErrorMessage(null)
				}, 5000)
			})
			props.setErrorMessage(`Changed contact ${nameObject.name}`)
			setTimeout(() => {
				props.setErrorMessage(null)
			}, 5000)
		  }
		}
	  }
	}
	else {
	  contactService.create(nameObject).then(newObject => {
		  props.setPersons(props.persons.concat(newObject))
		  props.setNewName('')
		  props.setNewNumber('')
	  })
	  props.setErrorMessage(`Added contact ${nameObject.name}`)
	  setTimeout(() => {
		  props.setErrorMessage(null)
	  }, 5000)
	}
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
