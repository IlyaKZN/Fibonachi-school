import { SHORT_DELAY_IN_MS } from "../../constants/delays";

describe('Страница стека функционирует корректно', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="stack"]').click();
  });

  it('При пустом инпуте кнопка добавления недоступна', () => {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').should('not.have.value');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('12');
    cy.get('@button').should('be.enabled');

    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  });

  it('Элементы добавляются корректно', () => {

    const elements = [];
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');

    cy.get('@input').type('1');
    cy.get('@button').click();
    elements.push(1);

    const checkElements = (lastCheck = false) => {
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', elements.length).each(($el, index) => {
        cy.get($el.children()[0]).as('head');
        cy.get($el.children()[1]).as('circle');
        cy.get($el.children()[1]).as('index');
        cy.get('@circle').children('p').as('text');

        if (index === elements.length - 1 && lastCheck === false) {
          cy.get('@head').should('contain', 'top');
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
          cy.get('@text').should('contain', elements[index]);
        } else if (index === elements.length - 1) {
          cy.get('@head').should('contain', 'top');
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
          cy.get('@text').should('contain', elements[index]);
        } else {
          cy.get('@head').should('contain', '');
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
          cy.get('@text').should('contain', elements[index]);
        }
        
      })
    };

    checkElements();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type('2');
    cy.get('@button').click();
    elements.push(2);
    checkElements();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type('4');
    cy.get('@button').click();
    elements.push(4);
    checkElements();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type('6');
    cy.get('@button').click();
    elements.push(6);
    checkElements();
    cy.wait(SHORT_DELAY_IN_MS);

    checkElements(true);
  })

  it('Кнопка "Очистить" работает корректно', () => {
    cy.get('[data-testid="clearButton"]').click();
    cy.get('[data-testid="circlesContainer"] > div').should('not.exist');
  })

  it('Элементы удаляются корректно', () => {

    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="button"]').as('button');
    cy.get('@input').type('1');
    cy.get('@button').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@input').type('4');
    cy.get('@button').click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@input').type('8');
    cy.get('@button').click();
    cy.wait(SHORT_DELAY_IN_MS);

    const checkElements = (amountNumbers) => {
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', amountNumbers).each(($el, index) => {
        cy.get($el.children()[0]).as('head');
        cy.get($el.children()[1]).as('circle');
        cy.get($el.children()[1]).as('index');
        cy.get('@circle').children('p').as('text');
        if (index === amountNumbers - 1) {
          cy.get('@head').should('contain', 'top');
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        } else {
          cy.get('@head').should('contain', '');
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        }
      })
    };
    
    cy.get('[data-testid="deleteButton"]').as('deleteButton');
    cy.get('@deleteButton').click();
    checkElements(3);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@deleteButton').click();
    checkElements(2);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@deleteButton').click();
    checkElements(1);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="circlesContainer"] > div').should('not.exist');
  })
})