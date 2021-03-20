Cypress.Commands.add('typeKeys', (selector, value, enter = true) => {
  if (enter) {
    cy.get(selector).clear().type(`${value}`, { delay: 35 });
  } else {
    cy.get(selector).clear().type(value, { delay: 35 });
  }
});
