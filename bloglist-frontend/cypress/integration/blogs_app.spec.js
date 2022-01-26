describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    // create user here:
    const user = {
      name: 'Matti Esko',
      username: 'mesko',
      password: 'salainen',
    };
    // something wrong in this route - log in does not work at all
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // ...
    });

    it('fails with wrong credentials', function () {
      // ...
    });
  });
});
