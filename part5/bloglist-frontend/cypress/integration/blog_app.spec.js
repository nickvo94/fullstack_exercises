describe('blog app', function() {
     beforeEach(function() {
      /* cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'mik',
        name: 'Mikko Jarvi',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) */
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      //cy.visit('http://localhost:3000')
      cy.contains('login')
    })
  
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login')
        cy.get('#username').type('mik')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Mikko Jarvi logged-in')
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('logout').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'invalid username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.error').should('have.css', 'border-style', 'solid')
      })

    })

    describe.only('Blog app', function() {
      // ...
    
      describe('When logged in', function() {
        beforeEach(function() {
          cy.contains('login')
          cy.get('#username').type('mik')
          cy.get('#password').type('salainen')
          cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('a blog created by cypress')
          cy.get('#author').type('cypress')
          cy.get('#create-button').click()
          cy.contains('a new blog a blog created by cypress')
        })

        it('A blog can be liked', function() {
          cy.contains('a blog created by cypress')
            .contains('view')
            .click()
          cy.contains('like').click()
          cy.contains('likes').should('contain', '1') 
        })

        it('A blog can be deleted by own author', function() {
          cy.contains('a blog created by cypress')
            .contains('view')
            .click()
          cy.contains('remove')
            .click()
          cy.should('not.contain','a blog created by cypress')
        })

      })
    
    })


  })