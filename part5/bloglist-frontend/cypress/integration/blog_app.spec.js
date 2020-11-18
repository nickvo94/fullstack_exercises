const helper = require('../../../../part4/tests/test_helper.js')

describe('blog app', function() {
     before(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'mik',
        name: 'Mikko Jarvi',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.login({ username: 'mik', password: 'salainen' })
      helper.initialBlogs.map(b => {
        console.log(b)
        cy.createBlog({content: b})
      })

      cy.visit('http://localhost:3000')
      cy.contains('logout').click()
    })


  
    it('Login form is shown', function() {
      //cy.visit('http://localhost:3000')
      cy.contains('login')
      //cy.contains('logout').click()
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
        cy.get('#username').type('muu')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'invalid username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.error').should('have.css', 'border-style', 'solid')

        cy.visit('http://localhost:3000')
      })

    })

    describe('Blog app', function() {
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

          cy.contains('logout').click()
        })

        it('A blog can be liked', function() {
          cy.contains('Canonical string reduction')
            .contains('view')
            .click()
          cy.contains('like').click()
          cy.get('#likes').should('contain', '1')

          cy.contains('logout').click()
        })

        it('A blog can be deleted by own author', function() {
          cy.get('li:first')
            .contains('Canonical string reduction')
            .contains('view')
            .click()
          cy.contains('remove')
            .click()
          cy.should('not.contain','Canonical string reduction')

          cy.contains('logout').click()
        })

        it('blogs likes arraged correctly', function() {
          cy.get('li').then( ($lis) => {
            console.log($lis)
            const nums = []
            cy.wrap($lis)
              .each(($li, index, $lis) => {
                console.log($li, index)
                cy.wrap($li)
                  .contains('view')
                  .click()
                  .get('#likes')
                  .get('span')
                  .then(($s) => {
                    console.log($s.text())
                    nums.push(Number($s.text()))
                  })
                cy.wrap($li)
                  .contains('hide')
                  .click()
              })
              .then(() => {
                console.log(nums)
                const isDescending = a => a.slice(1)
                                        .map((e,i) => e < a[i] || e === a[i] )
                                        .every(x => x);
                console.log(isDescending(nums)) 
                cy.expect(isDescending(nums)).to.be.true
              })
          })
  
        })

      })
    
    })


  })