import { useState } from 'react'
import {
	Switch, Route,
	useRouteMatch
} from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1'
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2'
		}
	])

	const [notification, setNotification] = useState('')

	const match = useRouteMatch('/anecdotes/:id')
	const anecdote = match 
		? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
		: null

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	/* const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)*/

	const createNotification = (content) => {
		console.log('content is ', content)
		setNotification(`a new anecdote ${content} created`)
		setTimeout(() => setNotification(''), 10000)
	}

	/* 	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	} */

	return (
    
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<div style={notification ? {display: 'block'} : {display: 'none'}}>{notification}</div>
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/create">
					<CreateNew addNew={addNew} createNotification={createNotification} />
				</Route>
				<Route path="/anecdotes/:id">
					<Anecdote anecdote={anecdote} />
				</Route>
				<Route path="/">
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>
			<Footer />
		</div>
	)
}

export default App