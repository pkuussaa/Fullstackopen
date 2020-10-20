import React from "react";
import contactService from '../services/Contacts';

const RemoveContact = (filtered, persons, setPersons, errorMessage, setErrorMessage) => {
	if (window.confirm(`Delete ${filtered.name}`)) {
		contactService.remove(filtered).then(() => {
			setPersons(persons.filter(person => person.id !== filtered.id))
		})
		setErrorMessage(`Removed contact ${filtered.name}`)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}
}

const Persons = (props) => {
	let filtered = [...props.persons]
	if(props.filter){
		filtered = filtered.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()));
	}

	return (
	  <div>
		{filtered.map(filtered => {
		return (
		<p key={filtered.name}>{filtered.name} {filtered.number} <button onClick={() => RemoveContact(filtered, props.persons, props.setPersons, props.errorMessage, props.setErrorMessage)}>delete</button></p>)}
		)}
	  </div>
	)
  };

export default Persons;
