describe('Contact', () => {
  it('should submit form', () => {
    cy.visit('http://localhost:3000/contact');
    cy.get('#first-name').type('John');
    cy.get('#second-name').type('Doe');
    cy.get(':nth-child(3) > #email').type('johndoe@example.com');
    cy.get('#phone-number').type('123456789');
    cy.get('#subject').type('subject');
    cy.get('#message').type('message');

    cy.get('[data-testid="contact-form"] > .bg-black').click();

    cy.get('.text-4xl').should('contain', 'Message sent successfully!');
  });
});
