import { SHORT_DELAY_IN_MS } from "../../constants/delays";

describe("Страница списка функционирует корректно", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="list"]').click();
  });

  it("При пустом инпуте кнопки кнопки добавления, добавления по индексу и удаления по индексу недоступны", () => {
    cy.get('[data-testid="elInput"]').as("elInput");
    cy.get('[data-testid="indexInput"]').as("indexInput");
    cy.get('[data-testid="addToHeadButton"]').as("addToHeadButton");
    cy.get('[data-testid="addToTailButton"]').as("addToTailButton");
    cy.get('[data-testid="addByIndexButton"]').as("addByIndexButton");
    cy.get('[data-testid="deleteByIndexButton"]').as("deleteByIndexButton");

    cy.get("@elInput").should("not.have.value");
    cy.get("@addToHeadButton").should("be.disabled");
    cy.get("@addToTailButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");

    cy.get("@indexInput").should("not.have.value");
    cy.get("@deleteByIndexButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
  });

  it("Начальный список элементов отрисовывается корректно", () => {
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)");
    cy.get("[class*=circle_content]").first().contains("head");
    cy.get("[class*=circle_content]").last().contains("tail");
  });

  it("Элемент корректно добавляется в head", () => {
    cy.get('[data-testid="elInput"]').as("elInput");
    cy.get('[data-testid="addToHeadButton"]').as("addToHeadButton");
    cy.get("@elInput").type("12");
    cy.get("@addToHeadButton").click();
    cy.get("[class*=circle_content]")
      .first()
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("contain", '12');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").each(($el, index) => {
      if (index === 0) {
        cy.get($el).find('[class*="circle_head"]').should('contain', 'head');
        cy.get($el).find('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(127, 224, 81)")
      }
      if (index === 1) {
        cy.get($el).find('[class*="circle_head"]').should('not.have.descendants', 'div');
      }
    })

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)")
  });

  it("Элемент корректно добавляется в tail", () => {
    cy.get('[data-testid="elInput"]').as("elInput");
    cy.get('[data-testid="addToTailButton"]').as("addToTailButton");
    cy.get("@elInput").type("24");
    cy.get("@addToTailButton").click();
    cy.get("[class*=circle_content]")
      .last()
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("contain", '24');
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_content]").as('circles');
    cy.get("@circles").last().as('lastCircle');
    cy.get("@lastCircle").find('[class*="circle_tail"]').should('contain', 'tail');
    cy.get("@lastCircle").find('[class*="circle_circle"]').should("have.css", "border", "4px solid rgb(127, 224, 81)")
    cy.get("@circles").eq(-2).find('[class*="circle_head"]').should('not.have.descendants', 'div');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)")
  });

  it("Элемент корректно добавляется по index", () => {
    cy.get('[data-testid="elInput"]').as("elInput");
    cy.get('[data-testid="indexInput"]').as("indexInput");
    cy.get('[data-testid="addByIndexButton"]').as("addByIndexButton");
    cy.get("@elInput").type("36");
    cy.get("@indexInput").type("1");
    cy.get("@addByIndexButton").click();

    cy.get("[class*=circle_content]").as('circles');
    cy.get("@circles")
      .first()
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("contain", '36');

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .first()
      .children('[class*="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get("@circles")
      .first()
      .find('[class*="circle_head"]')
      .should('contain', 'head');
    cy.get("@circles")
      .eq(1)
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("contain", '36');
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .eq(1)
      .children('[class*="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)")
  });

  it("Элемент корректно удаляется из tail", () => {
    cy.get("[class*=circle_content]").as('circles');
    cy.get("@circles").then(($arr) => {
      const initialLength = $arr.length;
      cy.wrap(initialLength).as('initialLength')
    });
    cy.get('[data-testid="removeFromTailButton"]').as("removeFromTailButton");
    cy.get("@removeFromTailButton").click();

    cy.get("@circles")
      .last()
      .find('[class*="circle_circle"]')
      .first()
      .find('[class*="text"]')
      .should('not.have.value');
    cy.get("@circles")
      .last()
      .find('[class*="circle_tail60"]')
      .find('[class*="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .last()
      .find('[class*="circle_tail60"]')
      .should('contain', 'tail')
    cy.get("@initialLength").then((initialLength) => {
      cy.get("@circles").should('have.length', initialLength - 1);
    });
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("Элемент корректно удаляется из head", () => {
    cy.get("[class*=circle_content]").as('circles');
    cy.get("@circles").then(($arr) => {
      const initialLength = $arr.length;
      cy.wrap(initialLength).as('initialLength')
    });
    cy.get('[data-testid="removeFromHeadButton"]').as("removeFromHeadButton");
    cy.get("@removeFromHeadButton").click();

    cy.get("@circles")
      .first()
      .find('[class*="circle_circle"]')
      .first()
      .find('[class*="text"]')
      .should('not.have.value');
    cy.get("@circles")
      .first()
      .find('[class*="circle_tail60"]')
      .find('[class*="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .first()
      .find('[class*="circle_head"]')
      .should('contain', 'head')
    cy.get("@initialLength").then((initialLength) => {
      cy.get("@circles").should('have.length', initialLength - 1);
    });
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("Элемент корректно удаляется по index", () => {
    cy.get("[class*=circle_content]").as('circles');
    cy.get("@circles").then(($arr) => {
      const initialLength = $arr.length;
      cy.wrap(initialLength).as('initialLength')
    });
    cy.get('[data-testid="indexInput"]').as("indexInput");
    cy.get('[data-testid="deleteByIndexButton"]').as("deleteByIndexButton");
    cy.get("@indexInput").type("1");
    cy.get("@deleteByIndexButton").click();

    cy.get("@circles")
      .first()
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .eq(1)
      .find('[class*="circle_circle"]')
      .first()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles")
      .eq(1)
      .find('[class*="circle_circle"]')
      .first()
      .find('[class*="text"]')
      .should('not.have.value');
    cy.get("@circles")
      .eq(1)
      .find('[class*="circle_tail60"]')
      .find('[class*="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@initialLength").then((initialLength) => {
      cy.get("@circles").should('have.length', initialLength - 1);
    });
    cy.get("[class*=circle_circle]").should("have.css", "border", "4px solid rgb(0, 50, 255)");
  })
});
