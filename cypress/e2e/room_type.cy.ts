describe('Room Types', () => {
  it('Should navigate to room type page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.mt-6 > .bg-black').click();
    cy.get(':nth-child(5) > .justify-between > .flex').click();
    cy.get('[href="/admin/hotel-configuration/room-types"]');
    cy.contains('Room Types');
  });

  it('Should add room type', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.mt-6 > .bg-black').click();
    cy.get(':nth-child(5) > .justify-between > .flex').click();
    cy.get('[href="/admin/hotel-configuration/room-types"]').click();
    cy.get('.mt-10 > :nth-child(1) > :nth-child(1) > .flex').click();
    cy.get('#name').type('Added room');
    cy.get('#description').type('Description for added room');
    cy.get('#occupancy').type('3');
    cy.get('#price').type('100000');
    cy.get('.justify-center > .bg-black').click();
    cy.contains('Added room');
  });

  it('Should edit room type', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.mt-6 > .bg-black').click();
    cy.get(':nth-child(5) > .justify-between > .flex').click();
    cy.get('[href="/admin/hotel-configuration/room-types"]').click();
    cy.get('table a').last().click();
    cy.get('#name').type('Edited room');
    cy.get('#description').type('Description for edited room');
    cy.get('#occupancy').type('4');
    cy.get('#price').type('200000');
    cy.get('.justify-center > .bg-black').click();
    cy.contains('Edited room');
  });

  it('Should delete room type', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.mt-6 > .bg-black').click();
    cy.get(':nth-child(5) > .justify-between > .flex').click();
    cy.get('[href="/admin/hotel-configuration/room-types"]').click();
    cy.get('table button').last().click();
    cy.get('td').should('not.have.value', 'Edited room');
  });
});
