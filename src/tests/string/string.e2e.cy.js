import { DELAY_IN_MS } from "../../constants/delays";

describe('Страница разворота строки функционирует корректно', function() {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="recursionLink"]').click();
  });

  it('При пустом инпуте кнопка добавления недоступна', function() {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').should('not.have.value');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('test text');
    cy.get('@button').should('be.enabled');

    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('Строка разворачивается корректно', function() {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').type('Hello');
    cy.get('@button').click();

    cy.get('[data-testid="circlesContainer"] > div').should('have.length', 5).each(($el, index) => {
      cy.get($el.children()[1]).as('circle');
      cy.get('@circle').children('p').as('text');
      cy.get('@text').should('contain', 'Hello'.charAt(index));

      if (index === 0 || index === 4) {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      } else {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[data-testid="circlesContainer"] > div').should('have.length', 5).each(($el, index) => {
      cy.get($el.children()[1]).as('circle');
      cy.get('@circle').children('p').as('text');
      cy.get('@text').should('contain', 'oellH'.charAt(index));

      if (index === 0 || index === 4) {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      } else if (index === 1 || index === 3) {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
      } else {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[data-testid="circlesContainer"] > div').should('have.length', 5).each(($el, index) => {
      cy.get($el.children()[1]).as('circle');
      cy.get('@circle').children('p').as('text');
      cy.get('@text').should('contain', 'olleH'.charAt(index));

      if (index !== 2) {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
      } else {
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
      }
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[data-testid="circlesContainer"] > div').should('have.length', 5).each(($el, index) => {
      cy.get($el.children()[1]).as('circle');
      cy.get('@circle').children('p').as('text');
      cy.get('@text').should('contain', 'olleH'.charAt(index));

      cy.get('@circle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
    });
  });
})