describe('Роутинг в приложении работает корректно', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('Переход на страницу разворота статьи осуществляется корректно', function() {
    cy.get('[data-testid="recursionLink"]').click();
    cy.location('pathname').should('eq', '/recursion');
    cy.go('back');
  });

  it('Переход на страницу последовательности Фибоначчи осуществляется корректно', function() {
    cy.location('pathname').should('eq', '/');
    cy.get('[data-testid="fibonacciLink"]').click();
    cy.location('pathname').should('eq', '/fibonacci');
    cy.go('back');
  });

  it('Переход на страницу сортировки массива осуществляется корректно', function() {
    cy.location('pathname').should('eq', '/');
    cy.get('[data-testid="sorting"]').click();
    cy.location('pathname').should('eq', '/sorting');
    cy.go('back');
  });

  it('Переход на страницу стэка осуществляется корректно', function() {
    cy.location('pathname').should('eq', '/');
    cy.get('[data-testid="stack"]').click();
    cy.location('pathname').should('eq', '/stack');
    cy.go('back');
  });

  it('Переход на страницу очереди осуществляется корректно', function() {
    cy.location('pathname').should('eq', '/');
    cy.get('[data-testid="queue"]').click();
    cy.location('pathname').should('eq', '/queue');
    cy.go('back');
  });

  it('Переход на страницу списка осуществляется корректно', function() {
    cy.location('pathname').should('eq', '/');
    cy.get('[data-testid="list"]').click();
    cy.location('pathname').should('eq', '/list');
    cy.go('back');
  });
  
}); 