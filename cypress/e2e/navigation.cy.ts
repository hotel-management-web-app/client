describe('Navigation', () => {
  it('should display Home page', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', '/');
  });

  it('should navigate to rooms page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.flex > [href="/rooms"]').click();
    cy.url().should('include', '/rooms');
    cy.get('h1').contains('Rooms & suite');
  });

  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "about" and click it
    cy.get('.flex > [href="/about"]').click();

    // The new url should include "/about"
    cy.url().should('include', '/about');

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Us');
  });

  it('should navigate to contact page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.flex > [href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.get('h1').contains('Contact');
  });
});
