describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Johanna Lyytinen',
            username: 'lyyt',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
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

        })
        it('fails with wrong credentials and shows error message with red border', function() {
            cy.contains('logout').click()
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
})