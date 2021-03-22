import {
  signUpPage,
  myInformation,
  additionalInfo,
  noticeAddress,
  uploadDoc,
  shared,
} from '../locators';
import pages from '../fixtures/pages.json';

export class Utils {
  /**
   * Generate a random test email
   *
   * @param {number} max max number of random integer to be added to the email to make it unique(default value is 1000000).
   *
   */
  generateEmail = (max = 1000000) =>
    `Testuser${Math.floor(Math.random() * Math.floor(max))}@gmail.com`;

  /**
   * Generate a random test email
   *
   * @param {object} signUpUserData object contain user data
   * @param {boolean} isDataValid a flag that determinants what data should be filled in the sign-up page.
   *
   */
  fillSignUpPage(signUpUserData, isDataValid) {
    cy.typeKeys(signUpPage.firstNameInput, signUpUserData.firstName);
    cy.typeKeys(signUpPage.lastNameInput, signUpUserData.lastName);
    cy.typeKeys(
      signUpPage.emailInput,
      isDataValid ? utils.generateEmail() : signUpUserData.email
    );
    cy.typeKeys(signUpPage.passwordInput, signUpUserData.password);
    cy.get(signUpPage.selectCountryDropdown).click();
    cy.contains(signUpUserData.countryOfResidence).click();
  }

  /**
   * fill my information form
   */
  myInformation() {
    cy.typeKeys(
      myInformation.clientAccountType,
      pages.myInformation.accountType
    );
    cy.get(shared.selectFirstOption).click();
    cy.get(myInformation.SalutationInput).click();
    cy.get(myInformation.salutationItemMr).click();
    cy.typeKeys(myInformation.middleNameInput, pages.myInformation.middleName);
    cy.typeKeys(myInformation.genderDropdown, pages.myInformation.gender);
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(
      myInformation.countryOfCitizenshipDropdown,
      `${pages.additionalInfo.countryOfResidence}{enter}`
    );
  }

  /**
   * fill additional information form
   *
   * @param {boolean} differentNoticeAddress a flag that determinants if there is a different notice address.
   */
  additionalInfo(differentNoticeAddress) {
    cy.typeKeys(
      additionalInfo.countryOfResidence,
      pages.additionalInfo.countryOfResidence
    );
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(
      additionalInfo.firstStreetName,
      pages.additionalInfo.streetNumber1
    );
    cy.typeKeys(
      additionalInfo.secondStreetName,
      pages.additionalInfo.streetNumber2
    );
    cy.typeKeys(additionalInfo.cityName, pages.additionalInfo.cityName);
    cy.typeKeys(additionalInfo.region, pages.additionalInfo.regionName);
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(additionalInfo.zipCode, pages.additionalInfo.zipCode);
    cy.typeKeys(additionalInfo.taxID, pages.additionalInfo.validSSN);
    cy.typeKeys(additionalInfo.dateOfBirth, pages.additionalInfo.dataOfBirth);
    cy.typeKeys(additionalInfo.phoneNumber, pages.additionalInfo.phoneNumber);
    if (differentNoticeAddress) this.noticeAddress();
    if (pages.additionalInfo.countryOfResidence !== 'United States Of America')
      this.uploadDocuments();
    cy.get(shared.saveFormButton).click();
    cy.get(shared.saveAndContinueButton).click();
  }

  /**
   * fill notice address form
   */
  noticeAddress() {
    cy.get(noticeAddress.differentNoticeAddress).click();
    cy.typeKeys(noticeAddress.country, pages.noticeAddress.noticeAddress);
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(
      noticeAddress.nFirstStreetName,
      pages.noticeAddress.nStreetNumber1
    );
    cy.typeKeys(
      noticeAddress.nSecondStreetName,
      pages.noticeAddress.nStreetNumber2
    );
    cy.typeKeys(noticeAddress.nCityName, pages.noticeAddress.nCityName);
    cy.typeKeys(noticeAddress.nRegion, pages.noticeAddress.nRegionName);
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(noticeAddress.nZipCode, pages.noticeAddress.nZipCode);
  }

  /**
   * fill upload document form
   */
  uploadDocuments() {
    const testImage = 'test.jpg';

    cy.typeKeys(uploadDoc.documentType, pages.uploadDocuments.documentType);
    cy.get(shared.selectFirstOption).click();
    cy.typeKeys(
      uploadDoc.idExpiresOnDatePicker,
      pages.uploadDocuments.ExpiresOnDatePicker
    );
    cy.typeKeys(uploadDoc.issuingCountry, pages.uploadDocuments.issuingCountry);
    cy.get(shared.selectFirstOption).click();
    cy.get(uploadDoc.inputIDFrontDrop).attachFile(testImage);
  }
}

export const utils = new Utils();
