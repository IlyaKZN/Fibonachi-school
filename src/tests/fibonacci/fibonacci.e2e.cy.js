import { SHORT_DELAY_IN_MS } from "../../constants/delays";

describe('Страница чисел Фибоначчи функционирует корректно', function() {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="fibonacciLink"]').click();
  });

  it('При пустом инпуте кнопка добавления недоступна', function() {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').should('not.have.value');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('12');
    cy.get('@button').should('be.enabled');

    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('Числа генерируются корректно', function() {
    const resFibonacciNumbers = [1, 1, 2, 3, 5];
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').type('4');
    cy.get('@button').click();

    const checkElements = (amountNumbers) => {
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', amountNumbers).each(($el, index) => {
        cy.get($el.children()[1]).as('circle');
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle').children('p').as('text');
        cy.get('@text').should('contain', resFibonacciNumbers[index]);
      })
    }
    checkElements(1);
    cy.wait(SHORT_DELAY_IN_MS);
    checkElements(2);
    cy.wait(SHORT_DELAY_IN_MS);
    checkElements(3);
    cy.wait(SHORT_DELAY_IN_MS);
    checkElements(4);
    cy.wait(SHORT_DELAY_IN_MS);
    checkElements(5);
  });
})