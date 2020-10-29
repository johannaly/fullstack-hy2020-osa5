import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but does not render url or likes', () => {
    const blog = {
        _id: "91",
        user: {
            _id: "81",
            username: "tepsu",
            name: 'Teemu Testaaja'
        },
        likes: 32,
        author: 'Tiina Testaaja',
        title: 'Test-title',
        url: 'www.software.com'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Test-title Tiina Testaaja'
    )
    expect(component.container).not.toHaveTextContent(
        '32'
    )

    expect(component.container).not.toHaveTextContent(
        'www.software.com'
    )
})

test('renders also url and likes after button has been pressed', async () => {
    const blog = {
        _id: "91",
        user: {
            _id: "81",
            username: "tepsu",
            name: "Teemu Testaaja"
        },
        likes: 32,
        author: "Tiina Testaaja",
        title: "Test-title",
        url: "www.software.com"
    }
    const user = {
        _id: "81",
        blogs: Array,
        username: "tepsu",
        name: "Teemu Testaaja"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} toggleVisible={mockHandler} />
    )
    component.debug()

    const button = component.getByText('view')
    fireEvent.click(button)
    
    const elementUrl = component.getByText(
        'www.software.com'
    )
    expect(elementUrl).toBeDefined()
    
    const elementLikes = component.getByText('32')
    expect(elementLikes).toHaveTextContent("32")   
})


test('if like-button is pressed twice, the func is also called twice', async () => {
    const blog = {
        _id: "91",
        user: {
            _id: "81",
            username: "tepsu",
            name: "Teemu Testaaja"
        },
        likes: 32,
        author: "Tiina Testaaja",
        title: "12 Steps to Better Code",
        url: "www.software.com"
    }
    const user = {
        _id: "81",
        blogs: Array,
        username: "tepsu",
        name: "Teemu Testaaja"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user = {user} addLike={mockHandler} toggleVisible={mockHandler} />
    )

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls.length).toBe(2)
})
