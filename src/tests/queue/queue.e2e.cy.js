import { SHORT_DELAY_IN_MS } from "../../constants/delays";

describe('Страница очереди функционирует корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="queue"]').click();
  });

  it('При пустом инпуте кнопка добавления недоступна', () => {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="addButton"]').as('addButton');

    cy.get('@input').should('not.have.value');
    cy.get('@addButton').should('be.disabled');

    cy.get('@input').type('12');
    cy.get('@addButton').should('be.enabled');

    cy.get('@input').clear();
    cy.get('@addButton').should('be.disabled');
  });

  it('Элементы добавляются корректно', () => {

    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="addButton"]').as('addButton');

    const currentElements = new Array(7).fill(null);

    const checkColor = (indexModifiableEl = -1) => {
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', 7).each(($el, index) => {
        cy.get($el.children()[1]).as('circle');

        if (index === indexModifiableEl) {
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        } else {
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        }
      })
    }

    const checkEl = (headIndex, tailIndex) => {
      const localCurrentElements = [...currentElements];
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', 7).each(($el, index) => {
        cy.get($el.children()[0]).as('head');
        cy.get($el.children()[2]).as('index');
        cy.get($el.children()[3]).as('tail')
        cy.get($el.children()[1]).as('circle');
        cy.get('@circle').children('p').as('text');

        if (index === headIndex) {
          cy.get('@head').should('contain', 'head')
        }

        if (index === tailIndex) {
          cy.get('@tail').should('contain', 'tail')
        }

        if (localCurrentElements[index]) {
          cy.get('@text').should('contain', localCurrentElements[index]);
        } else {
          cy.get('@text').should('not.have.value');
        }
      })
    }

    cy.get('@input').type('1');
    cy.get('@addButton').click();
    currentElements[0] = 1;
    checkColor(0);
    cy.wait(SHORT_DELAY_IN_MS);
    checkEl(0, 0);

    cy.get('@input').type('3');
    cy.get('@addButton').click();
    checkColor(1);
    cy.wait(SHORT_DELAY_IN_MS);
    currentElements[1] = 3;
    checkEl(0, 1);

    cy.get('@input').type('7');
    cy.get('@addButton').click();
    checkColor(2);
    cy.wait(SHORT_DELAY_IN_MS);
    currentElements[2] = 7;
    checkEl(0, 2);
  });

  it('Элементы удаляются корректно', () => {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="deleteButton"]').as('deleteButton');

    const currentElements = [1, 3, 7, null, null, null, null];

    const checkColor = (indexModifiableEl = -1) => {
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', 7).each(($el, index) => {
        cy.get($el.children()[1]).as('circle');

        if (index === indexModifiableEl) {
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        } else {
          cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        }
      })
    }

    const checkEl = (headIndex, tailIndex) => {
      const localCurrentElements = [...currentElements];
      cy.get('[data-testid="circlesContainer"] > div').should('have.length', 7).each(($el, index) => {
        cy.get($el.children()[0]).as('head');
        cy.get($el.children()[2]).as('index');
        cy.get($el.children()[3]).as('tail')
        cy.get($el.children()[1]).as('circle');
        cy.get('@circle').children('p').as('text');

        if (index === headIndex) {
          cy.get('@head').should('contain', 'head')
        }

        if (index === tailIndex) {
          cy.get('@tail').should('contain', 'tail')
        }

        if (localCurrentElements[index]) {
          cy.get('@text').should('contain', localCurrentElements[index]);
        } else {
          cy.get('@text').should('not.have.value');
        }
      })
    }

    cy.get('@deleteButton').click();
    currentElements[0] = null;
    checkColor(0);
    cy.wait(SHORT_DELAY_IN_MS);
    checkEl(1, 2);

    cy.get('@deleteButton').click();
    currentElements[1] = null;
    checkColor(1);
    cy.wait(SHORT_DELAY_IN_MS);
    checkEl(2, 2);

    cy.get('@deleteButton').click();
    currentElements[2] = null;
    checkColor(2);
    cy.wait(SHORT_DELAY_IN_MS);
    checkEl(2, -1);

  })

  it('Кнопка "Очистить" работает корректно', () => {
    cy.get('[data-testid="input"]').as('input');
    cy.get('[data-testid="addButton"]').as('addButton');

    cy.get('@input').type('1');
    cy.get('@addButton').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type('15');
    cy.get('@addButton').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('@input').type('30');
    cy.get('@addButton').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="clearButton"]').click();
    cy.get('[data-testid="circlesContainer"] > div').each(($el, index) => {
      cy.get($el.children()[1]).as('circle');
      cy.get('@circle').children('p').should('not.have.value');
    });
  })
})