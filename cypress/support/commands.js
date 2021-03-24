const { MailSlurp } = require('mailslurp-client');

const apiKey =
  '6f518202c781077d4a8d058b1ea7c61c79af5efd84ee33fb06eea665fda632b0';
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add('typeKeys', (selector, value) => {
  cy.get(selector).clear().type(value, { delay: 35 });
});

Cypress.Commands.add('createInbox', () => {
  const mailslurp = new  MailSlurp({ apiKey });
  return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId);
});
