import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Jack',
    title: 'Component testing is done with react-testing-library',
    url: 'www',
    likes: 4,
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockHandler}/>
  )

  const buttonView = component.getByText('view')

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Jack'
  )
  expect(component.container).not.toHaveTextContent(
    'www'
  )
  expect(component.container).not.toHaveTextContent(
    '4'
  )

  fireEvent.click(buttonView)

  component.debug()

  expect(component.container).toHaveTextContent(
    'www'
  )

  expect(component.container).toHaveTextContent(
    '4'
  )

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  console.log(mockHandler.mock.calls)

  expect(mockHandler.mock.calls).toHaveLength(2)

})