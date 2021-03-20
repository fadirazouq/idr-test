import { signUpPage, myInformation } from '../locators';
import { utils } from '../src/Utils';
import pages from '../fixtures/pages.json';

// describe('Checking the functionality of creating a new Individual account', () => {
//   it('Checking the functionality of navigating to the sign-up page for Individual, @ID: 01', () => {
//     cy.visit('/');
//     cy.get(signUpPage.idrLogo).should('be.visible');
//     cy.get(signUpPage.signUpButton).click();
//     cy.get(signUpPage.createIndividualAccountButton).click();
//     cy.url().should(
//       'eq',
//       'https://idr-dev.realblocks.com/auth/signup?type=Individual'
//     );
//   });

//   it('Checking the functionality of "Have an account?" like navigates to login page, @ID: 02', () => {
//     cy.visit('/auth/signup?type=Individual');
//     cy.get(signUpPage.haveAnAccountLink).click();
//     cy.url().should('eq', 'https://idr-dev.realblocks.com/auth/signin');
//   });
//   it('Filling the sign-up form with invalid data and making sure error message is visible, @ID: 03', () => {
//     cy.visit('/auth/signup?type=Individual');
//     utils.fillSignUpPage(false);
//     cy.contains(signUpPage.termsAndConditionsCheckBox).click();
//     cy.get(signUpPage.firstNameErrorMessage).should('be.visible');
//     cy.get(signUpPage.lastNameErrorMessage).should('be.visible');
//     cy.get(signUpPage.passwordErrorMessage)
//       .should('have.css', 'color')
//       .and('eq', 'rgb(229, 57, 53)');
//     cy.get(signUpPage.emailErrorMessage).should('be.visible');
//   });

//   it('Filling the sign-up form with valid data will show the "Verify Email" popup, @ID: 04', () => {
//     cy.visit('/auth/signup?type=Individual');
//     utils.fillSignUpPage();
//     cy.contains(signUpPage.termsAndConditionsCheckBox).click();
//     cy.get(signUpPage.CreateAccountButton).click();
//     cy.get(signUpPage.EmailConfirmButton).should('be.visible');
//   });

//   it.only('Filling the sign-up form with valid data to finish the sign-up proses, @ID: 05', () => {
//     cy.visit('/auth/signup?type=Individual');
//     utils.fillSignUpPage();
//     cy.contains(signUpPage.termsAndConditionsCheckBox).click();
//     cy.get(signUpPage.CreateAccountButton).click();
//     cy.get(signUpPage.EmailConfirmButton).should('have.attr', 'disabled');
//     cy.get(signUpPage.EmailCodeInput).type(pages.signUpPage.verificationCode);
//     cy.get(signUpPage.EmailConfirmButton)
//       .click()
//       .should('not.have.attr', 'disabled');
//   });
// });

describe('Checking the functionality of creating a new Individual account', () => {
  it.only('Filling the sign-up form with valid data to finish the sign-up proses, @ID: 05', () => {
    cy.visit('/auth/signup?type=Individual');
    utils.fillSignUpPage();
    cy.contains(signUpPage.termsAndConditionsCheckBox).click();
    cy.get(signUpPage.CreateAccountButton).click();
    cy.get(signUpPage.EmailConfirmButton).should('have.attr', 'disabled');
    cy.get(signUpPage.EmailCodeInput).type(pages.signUpPage.verificationCode);
    cy.get(signUpPage.EmailConfirmButton).click();
    utils.fillOnboardPage('all');
  });
});
