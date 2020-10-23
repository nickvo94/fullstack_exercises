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

  const component = render(
    <Blog blog={blog} />
  )

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

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()

  expect(component.container).toHaveTextContent(
    'www'
  )

  expect(component.container).toHaveTextContent(
    '4'
  )

})