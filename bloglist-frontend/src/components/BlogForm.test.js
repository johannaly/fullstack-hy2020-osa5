import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('BlogForm-component updates information given and calls onSubmit', () => {
    const mockHandler = jest.fn()

    const component = render(
        <BlogForm createBlog = {mockHandler}/>
    )

    const form = component.container.querySelector('form')    

    fireEvent.change(title, {
        target: {value: 'testing blogform' }
    })
    fireEvent.change(author, {
        target: {value: 'Tiina Testaaja'}
    })
    fireEvent.change(url, {
        target: {value: 'www.testing.com'}
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing blogform')
    expect(mockHandler.mock.calls[0][0].author).toBe('Tiina Testaaja')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.testing.com')
})