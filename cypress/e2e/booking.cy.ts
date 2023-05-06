describe('Booking', () => {
  it('Should book a room', () => {
    cy.visit('http://localhost:3000');
    cy.get('#start-date').type('07/05/2023');
    cy.get('#end-date').type('09/05/2023');
    cy.get('.justify-center > .bg-yellow-500').click();
    cy.get('a[href*="booking-form"]').contains('Book Now').first().click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#phone-number').type('123456789');
    cy.get('#notes').type('Message');
    cy.get('#privacy-terms').check();
    cy.get('#booking-conditions').check();
    cy.get('.bg-dark-gray').click();
  });
});
