//import React, { useState } from 'react'
import {
	useHistory
} from 'react-router-dom'
import {useField} from '../hooks'

const CreateNew = (props) => {
	/* const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('') */

	const history = useHistory()
	const content = useField('content')
	const author = useField('anuthor')
	const info = useField('info')
  
	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		history.push('/')
		props.createNotification(content.value)
	}

	const resetClick = (e) => {
		e.preventDefault()
		content.onReset()
		author.onReset()
		info.onReset()
	}
  
	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>content
					<input {...content} />
				</div>
				<div>author
					<input {...author} />
				</div>
				<div>url for more info
					<input {...info}/>
				</div>
				<button>create</button>
				<button onClick={resetClick}>reset</button>
			</form>
		</div>
	)
  
}
export default CreateNew