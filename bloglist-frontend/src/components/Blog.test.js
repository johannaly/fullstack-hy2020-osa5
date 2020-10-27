import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but does not render url or likes', () => {
    const blog = {
        title: 'Test-title',
        author: 'Teemu Testaaja'
    }


    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Test-title Teemu Testaaja'
    )
    expect(component.container).not.toHaveTextContent(
        'likes'
    )

    expect(component.container).not.toHaveTextContent(
        'url'
    )
})
