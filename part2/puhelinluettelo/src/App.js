import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import Persons from './components/Persons';

const App = () => {
	const [ persons, setPersons] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [filter, setFilter] = useState('')

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
		<Filter filter={filter} setFilter={setFilter}/>
		<h2>add a new</h2>
		<AddPerson newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}/>
		 <h2>Numbers</h2>
		   <Persons persons={persons} filter={filter}/>
	  </div>
	)
  }

  export default App
