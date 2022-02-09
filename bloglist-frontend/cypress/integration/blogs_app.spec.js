/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    // create user here:
    const user = {
      name: 'Matti Esko',
      username: 'mesko',
      password: 'salainen',
    };

    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mesko');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Esko logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mesko');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials');
      //  .and('have.css', 'color', 'rgb(255, 0, 0)')
      //  .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Matti Esko logged in');
    });
  });
  describe('When logged in', function() {
    beforeEach(function() {
      // logs in user here:
      cy.get('#username').type('mesko');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('John Cypress');
      cy.get('#url').type('www.maketestnotwar.io');
      cy.get('#create-button').click();
      cy.contains('a blog created by cypress');

    });
  });


});
