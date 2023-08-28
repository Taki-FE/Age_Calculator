document.addEventListener("DOMContentLoaded", () => {

  const submitBtn = document.querySelector('.submit');
  const dayOfBirth = document.querySelector('.day');
  const monthOfBirth = document.querySelector('.month');
  const yearOfBirth = document.querySelector('.year');
  const yearResult = document.querySelector('.year-result');
  const monthResult = document.querySelector('.month-result');
  const dayResult = document.querySelector('.day-result');
  const dayError = document.querySelector('.day-error');
  const monthError = document.querySelector('.month-error');
  const yearError = document.querySelector('.year-error');
  const dayLabelError = document.querySelector('.d-error');
  const monthLabelError = document.querySelector('.m-error');
  const yearLabelError = document.querySelector('.y-error');
  const allResultsContainers = document.querySelectorAll('.results-container');

  submitBtn.addEventListener('click', () => {

    // Arrays for input fields, error messages, and associated text labels.
    const inputFields = [dayOfBirth, monthOfBirth, yearOfBirth];
    const errorMessages = [dayError, monthError, yearError];
    const textLabels = [dayLabelError, monthLabelError, yearLabelError];

    let hasEmptyField = false;

    // Clear existing error messages
    inputFields.forEach(element => {
      element.style.borderColor = '#dbdbdb'
    })

    errorMessages.forEach(message => {
      message.textContent = '';
    });
    
    textLabels.forEach(label => {
      label.style.color = '#818080';
    });

    // Clear existing result
    yearResult.textContent = '- -';
    monthResult.textContent = '- -';
    dayResult.textContent = '- -';

    // Check for empty fields.
    for (let i = 0; i < inputFields.length; i++) {
      if (inputFields[i].value === '') {
        errorMessages[i].textContent = 'This field is required';
        errorMessages[i].style.display = 'inline';
        textLabels[i].style.color = '#ff5757';
        inputFields[i].style.borderColor = '#ff5757';

        hasEmptyField = true;
      }
    }

    if (hasEmptyField) {
      // Move icon.
      submitBtn.style.top = '30%';
    
      // Move icon for mobile screens.
      if (window.innerWidth <= 500) {
        submitBtn.style.top = '35%';
      } else {
        submitBtn.style.top = '30%';
      }
    
      console.log('Empty!');
      return; // Stop further processing.

    } else {
      
      // Get data from user, store in variables.
      const day = parseInt(dayOfBirth.value, 10);
      const month = parseInt(monthOfBirth.value, 10);
      const year = parseInt(yearOfBirth.value, 10);

      if ((day <= 0 || day > 31) && (month <= 0 || month > 12) && (year < 1900 || year > 2023)) {
        errorMessages[0].textContent = 'Must be a valid day';
        errorMessages[1].textContent = 'Must be a valid month';
        errorMessages[2].textContent = 'Must be in the past';
        submitBtn.style.top = '30%';
        textLabels.forEach(element => {
          element.style.color = '#ff5757';
        });
        inputFields.forEach(element => {
          element.style.borderColor = '#ff5757';
        });

        return; // Stop further processing.
      }

      // Initialize the Date object to get current date.
      const currentDate = new Date();
      const birthDate = new Date(year, month - 1, day);
      
      if (day <= 0 || day > 31 || month <= 0 || month > 12 || year < 1900 || year > 2023 || (day > 30 && (month === 4 || month === 6 || month === 9 || month === 11))) {
        // The input date is not valid.
        dayError.textContent = 'Must be a valid date';
        submitBtn.style.top = '30%';
        textLabels.forEach(element => {
          element.style.color = '#ff5757';
        });
        inputFields.forEach(element => {
          element.style.borderColor = '#ff5757';
        });

        return; // Stop further processing.
      }

      const ageInMilliseconds = currentDate - birthDate;
      const ageInSeconds = ageInMilliseconds / 1000;
      const ageInMinuites = ageInSeconds / 60;
      const ageInHours = ageInMinuites / 60;
      const ageInDays = ageInHours / 24;
      const ageInMonths = ageInDays / 30.44;
      const ageInYears = ageInMonths / 12;

      const userYears = Math.floor(ageInYears);
      const userMonths = Math.floor(ageInMonths % 12);
      const userDays = Math.floor(ageInDays % 30.44);

      // Store calculated results in variables.
      const resultInYears = userYears;
      const resultInMonths = userMonths;
      const resultInDays = userDays;

      // Output result to the user.
      yearResult.textContent = resultInYears;
      monthResult.textContent = resultInMonths;
      dayResult.textContent = resultInDays;

      allResultsContainers.forEach(resultsContainer => {
        resultsContainer.classList.add('show-results');
      });

    };
  });
  
  [dayOfBirth, monthOfBirth, yearOfBirth].forEach(inputField => {
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission.
        submitBtn.click(); // Trigger submit button click.
      }
    });
  });
});