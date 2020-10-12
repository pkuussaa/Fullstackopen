import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => <div><h1>{props.title}</h1>{anecdotes[props.index]}<br />has {props.points[props.index]} votes</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = (props) => {
  const [votes, setVotes] = useState(new Array(anecdotes.length +1).join('0').split('').map(parseFloat))
  const [selected, setSelected] = useState(Math.floor(Math.random() *  anecdotes.length))

  const mostVotes = votes.indexOf(Math.max(...votes))

  const Vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const handleAnecdote = () => {
    let i = selected

    while (i === selected) {
      i = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(i)
  }

  return (
    <div>
       <Anecdote title='Anecdote of the day' index={selected} points={votes} />
      <Button onClick={Vote} text='vote'/>
      <Button onClick={handleAnecdote} text='next anecdote'/>
      <Anecdote title='Anecdote of the day' index={mostVotes} points={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
