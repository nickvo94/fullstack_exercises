import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlogForm handleCreateBlog={createBlog} />
  )

  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][1].title).toBe('testing of forms could be easier' )
})