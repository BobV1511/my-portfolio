describe('Portfolio App - Home Page', () => {
  it('Visits the home page and checks welcome text', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Welcome to My Portfolio');
  });

  it('Navigates to About Me page from navbar', () => {
    cy.visit('http://localhost:3000');
    cy.get('a').contains('About Me').click();
    cy.url().should('include', '/about');
    cy.contains('About Me'); // Bạn có thể thay đổi nội dung theo trang bạn có
  });

  it('Checks if navigation bar is visible', () => {
    cy.visit('http://localhost:3000');
    cy.get('nav').should('be.visible');
    cy.contains('Home');
    cy.contains('Projects');
    cy.contains('Services');
    cy.contains('Contact Me');
  });
});
