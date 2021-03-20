import { signUpPage, myInformation, additionalInfo, noticeAddress, uploadDoc } from '../locators';
import pages from '../fixtures/pages.json';

export class Utils {
  /**
   * Generate a random test email
   *
   * @param {number} max max number of random integer to be added to the email to make it unique(default value is 1000000).
   *
   */
  generateEmail(max = 1000000) {
    return (
      'Testuser' + Math.floor(Math.random() * Math.floor(max)) + '@gmail.com'
    );
  }

  /**
   * Generate a random test email
   *
   * @param {boolean} isDataValid a flag that determinants what data should be filled in the sign-up page.
   *
   */
  fillSignUpPage(isDataValid = true) {
    if (isDataValid) {
      cy.typeKeys(signUpPage.firstNameInput, pages.signUpPage.validFirstName)
      cy.typeKeys(signUpPage.lastNameInput, pages.signUpPage.validLastName)
      cy.typeKeys(signUpPage.emailInput, utils.generateEmail())
      cy.typeKeys(signUpPage.passwordInput, pages.signUpPage.validPassword)
      cy.get(signUpPage.selectCountryDropdown).click();
      cy.contains(pages.shared.countryOfResidence).click();
    } else {
      cy.typeKeys(signUpPage.firstNameInput, pages.signUpPage.invalidFirstName)
      cy.typeKeys(signUpPage.lastNameInput, pages.signUpPage.invalidLastName)
      cy.typeKeys(signUpPage.emailInput, pages.signUpPage.invalidEmail)
      cy.typeKeys(signUpPage.passwordInput, pages.signUpPage.invalidPassword)
      cy.get(signUpPage.selectCountryDropdown).click();
      cy.contains(pages.shared.countryOfResidence).click();
    }
  }

  fillOnboardPage(FormType, DifferentNoticeAddress = true) {
    if (FormType == 'myInformation' || FormType == 'all') {
      cy.typeKeys(myInformation.clientAccountType, pages.myInformation.accountType)
      cy.get('[id*="option-0"]').click()
      cy.get(myInformation.SalutationInput).click();
      cy.get(myInformation.salutationItemMr).click();
      cy.typeKeys(myInformation.middleNameInput, pages.myInformation.middleName)
      cy.typeKeys(myInformation.genderDropdown, pages.myInformation.gender)
      cy.get('[id*="option-0"]').click()
      cy.typeKeys(myInformation.countryOfCitizenshipDropdown, pages.shared.countryOfResidence)
      cy.get('[id*="option"]').and('contain', pages.shared.countryOfResidence).click()

    }
    if (FormType == 'additionalInfo' || FormType == 'all') {
      cy.typeKeys(additionalInfo.countryOfResidence, pages.shared.countryOfResidence)
      cy.get('[id*="option-0"]').click()

      cy.typeKeys(additionalInfo.firstStreetName, pages.additionalInfo.streetNumber1)
      
      cy.typeKeys(additionalInfo.secondStreetName, pages.additionalInfo.streetNumber2)
      cy.typeKeys(additionalInfo.cityName, pages.additionalInfo.cityName)
      cy.typeKeys(additionalInfo.region, pages.additionalInfo.regionName)
      cy.typeKeys(additionalInfo.zipCode, pages.additionalInfo.zipCode)
      cy.typeKeys(additionalInfo.taxID, pages.additionalInfo.validSSN)
      cy.typeKeys(additionalInfo.dateOfBirth, pages.additionalInfo.dataOfBirth)
      cy.typeKeys(additionalInfo.phoneNumber, pages.additionalInfo.phoneNumber, false)
    }
    if(DifferentNoticeAddress){
      cy.get(noticeAddress.differentNoticeAddress).click()
      cy.typeKeys(noticeAddress.country, pages.noticeAddress.noticeAddress)
      cy.typeKeys(noticeAddress.nFirstStreetName, pages.noticeAddress.nStreetNumber1)
      cy.typeKeys(noticeAddress.nSecondStreetName, pages.noticeAddress.nStreetNumber2)
      cy.typeKeys(noticeAddress.nCityName, pages.noticeAddress.nCityName)
      cy.typeKeys(noticeAddress.nRegion, pages.noticeAddress.nRegionName)
      cy.get('#IDV_NoticesRegionId-option-0').click()
      cy.typeKeys(noticeAddress.nZipCode, pages.noticeAddress.nZipCode, false)
    }
    if(pages.shared.countryOfResidence !=='United States Of America'){
      cy.typeKeys(uploadDoc.documentType, pages.uploadDocuments.documentType, false)
      cy.get('[id*="option-0"]').click()
      cy.typeKeys(uploadDoc.idExpiresOnDatePicker, pages.uploadDocuments.ExpiresOnDatePicker, false)
      cy.typeKeys(uploadDoc.issuingCountry, pages.uploadDocuments.issuingCountry, false)
      cy.get('[id*="option-0"]').click()
      const testImage = 'test.jpg';
      cy.get(uploadDoc.inputIDFrontDrop).attachFile(testImage);
    }
  }
}

export const utils = new Utils();
