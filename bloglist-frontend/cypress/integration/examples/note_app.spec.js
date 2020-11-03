const { func } = require("prop-types")

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Johanna Lyytinen',
            username: 'lyyt',
            password: 'salainen'
        }
        const secUser = {
            name: 'Jussi Jänönen',
            username: 'Jussi',
            password: 'jänö'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.request('POST', 'http://localhost:3001/api/users', secUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Blogs')
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('lyyt')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Johanna Lyytinen logged in')

        })
        it('fails with wrong credentials and shows error message with red border', function() {
            cy.get('#username').type('lyyt')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('lyyt')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('Johanna L.')
            cy.get('#url').type('www.all.fi')
            cy.get('#createNew-button').click()
            cy.contains('new blog Johanna L.')
            cy.contains('view').click()
        })
        it('Like can be added to the blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('Johanna L.')
            cy.get('#url').type('www.all.fi')
            cy.get('#createNew-button').click()
            cy.contains('new blog Johanna L.')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })
        it.only('Blog can be removed by the user who has added it', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('Johanna L.')
            cy.get('#url').type('www.all.fi')
            cy.get('#createNew-button').click()
            cy.contains('new blog Johanna L.')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.get('.blogTitleAndAuthor').should('not.contain', 'new blog Johanna L.')
        })
    })        

    describe('different user logged in', function() {
        it('Only the blog author can remove the blog', function() {
            cy.get('#username').type('lyyt')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('create new blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('Johanna L.')
            cy.get('#url').type('www.all.fi')
            cy.get('#createNew-button').click()
            cy.contains('new blog Johanna L.')
            cy.get('#logout-button').click()
            cy.get('#username').type('Jussi')
            cy.get('#password').type('jänö')
            cy.get('#login-button').click()
            cy.contains('view').click()
            cy.get('.blog').should('not.contain', 'remove')
            
        })    
    })
})
  
    

