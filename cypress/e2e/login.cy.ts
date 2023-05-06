describe('Admin Panel', () => {
  it('Should login to Admin Panel', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('.mt-6 > .bg-black').click();
    cy.get('h1.text-2xl').contains('Dashboard');
  });
});
