const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
morgan.token('custom', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :custom'))
let persons = [
	{
	  id: 1,
	  name: "Arto Hellas",
	  number: "040-123456"
	},
	{
	  id: 2,
	  name: "Ada Lovelace",
	  number: "39-44-5323523"
	},
	{
	  id: 3,
	  name: "Dan Abramov",
	  number: "12-34-234345"
	},
	{
	  id: 4,
	  name: "Mary Poppendick",
	  number: "39-23-6423122"
	}
  ]
  app.get('/api/persons', (req, res) => {
	  res.json(persons)
  })

  const date = new Date()

  app.get('/info', (req, res) => {
	  res.send(`Phonebook has info for ${persons.length} people </br> ${date}`)
  })

  const GenerateId = () => {
	const maxId = persons.length > 0
	? Math.max(...persons.map(p => p.id)) : 0
	return maxId + 1
  }

  app.post('/api/persons', (req, res) => {
		const body = req.body
		if (!body) {
			return res.status(400).json({
				error: 'content missing'
			})
		}
		if (!body.name || !body.number) {
			!body.name ? res.status(400).json({ error: 'name missing' })
			: res.status(400).json({ error: 'number missing' })
			return
		}
		if (persons.find(p => p.name === body.name)) {
			res.status(400).json({ error: 'name must be unique' })
			return
		}
		const newPerson = {
			name: body.name,
			number: body.number,
			id: GenerateId()
		}
		persons = persons.concat(newPerson)
		res.json(newPerson)
	})

  app.get('/api/persons/:id', (req, res) => {
	  const id = Number(req.params.id)
	  const person = persons.find(person => person.id === id)
	  person ? res.json(person) : res.status(404).end()
  })

  app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
  })
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })
