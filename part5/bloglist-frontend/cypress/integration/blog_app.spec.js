describe('blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'mik',
        name: 'Mikko Jarvi',
        password: 'salainen',
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('front page can be opened and login form exist', function() {
      cy.contains('login')
    })
  
    it('login form can be opened', function() {
    })
  })