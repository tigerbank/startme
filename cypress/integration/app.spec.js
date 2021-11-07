describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('https://www.google.co.th/');

    cy.get('input.gLFyf') // 2.
      .type('hello'); // 3.

    cy.get('input.gNO89b').first().click();

    // cy.get('div.yuRUbf').should();

    // Find a link with an href attribute containing "about" and click it
    // cy.get('a[href*="about"]').click();
    // cy.get('a[href*="/th/iphone-13-pro/"]').click();

    // The new url should include "/about"
    // cy.url().should('include', '/about');

    // The new page should contain an h1 with "About page"
    // cy.get('h1').contains('Apple (Thailand)');
  });
});
