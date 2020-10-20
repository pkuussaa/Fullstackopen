import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import Persons from './components/Persons';
import './index.css'

const Notification = ( {message} ) => {
	if (message === null) {
		return null
	}
	if (message.includes('was already')) {
		return (
			<div className="error">
				{message}
			</div>
		)
	}
	return (
		<div className="message">
			{message}
		</div>
	)
}

const App = () => {
	const [ persons, setPersons] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [filter, setFilter] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:3001/persons')
		.then(response => {
		  console.log('promise fulfilled')
		  setPersons(response.data)
		})
	  }, [])

	return (
	  <div>
		<h2>Phonebook</h2>
		<Notification message={errorMessage}/>
		<Filter filter={filter} setFilter={setFilter}/>
		<h2>add a new</h2>
		<AddPerson newName={newName} setNewName={setNewName}
		newNumber={newNumber} setNewNumber={setNewNumber} persons={persons}
		setPersons={setPersons} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
		 <h2>Numbers</h2>
		   <Persons persons={persons} setPersons={setPersons} filter={filter} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
	  </div>
	)
  }

  export default App
