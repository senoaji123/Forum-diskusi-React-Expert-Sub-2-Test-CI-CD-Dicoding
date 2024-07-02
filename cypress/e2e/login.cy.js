/**
 * skenario Test
 * -should display login page correctly
 * -should display alert when email is empty
 * -should display alert when password is empty
 */

describe('Login Page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // login tanpa isi email
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // isi email
    cy.get('input[placeholder="Email"]').type('akun111@gmail.com');

    // login tanpa isi password
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
});
