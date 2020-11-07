import * as _$ from "./helper.js";
/**
 * Documentation
 * 
 * 1. initValidation(), will hide all the div.error-feedback elem
 * 2. startValidation(), will reset all  the validation after resubmission
 * 
 * Error Feedback
 * 1. Create a div with a classname which contains classNames;
 *  1.1. error-feedback
 *  1.2. customFieldName 
 *  1.3. -err
 * 
 * ex: <div class="error-feedback password-err"></div>
 * 
 * Validate Method
 * 
 * VALIDATE (FieldName, InputClassName, Data)
 * 1. Param #1 -> div.className + "-err" 
 *  ex: <div class=""
 * 2. Param #2 -> inputClassName 
 * 3. Param #3 -> Data
 *
 * 
 */

/* * * * * * * * * * *
 * 
 * OBJECTS
 * 
 * * * * * * * * * * /


/*
 * Error Messages
 */

    export const ERROR_MESSAGES = 
    {
        /**
         * Name Fields
         * @param {*} fieldName 
         */
        name (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName } field must contain a minimum of 2 characters characters only`
            ];
        },

        /**
         * Email Field
         * @param {*} fieldName 
         */
        email (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName } field is invalid`
            ];
        },

        /**
         * Password Field
         * @param {*} fieldName 
         */
        password (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName} field must contain a minimum 8 characters and at least 1 symbol, 1 upper and lower case letters and a number `
            ];
        },

        /**
         * Phone Number Field
         * @param {*} fieldName 
         */
        phoneNumber (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName } field must contain a total of 11 numerical data only`
            ];
        },

        /**
         * Place Field
         * @param {*} fieldName 
         */

        place (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName } field is invalid`
            ];
        },

        /**
         * Zip Code Field
         * @param {*} fieldName 
         */
        zipCode (fieldName) {
            return [
                `${ fieldName } field is required.`,
                `${ fieldName } field is invalid`
            ];
        }
    };
        
    /*
    * Set Error Messages
    */

    export const SET_ERROR_MESSAGES = 
    {

        /**
         * Name fields
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName
         * @param {*} errMessage 
         */
        data (fieldName, inputClassName, errMessage) 
        {
            showErrorFeedback(fieldName);
            addErrorMessage(fieldName, errMessage);
            addClassInvalid(inputClassName);
            
        }
    };

    export const SET_VALID_DATA_SYMBOL = {
        
        /**
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         */
        data (fieldName, inputClassName) 
        {
            addClassHidden(fieldName);
            addClassValid(inputClassName);
        }
    };

    /*
    * Regex Pattern
    */
    const REGEX = 
    {
        name: /^([a-zA-Z_ ]){2,30}$/gi,
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/gi, ///^[ A-Za-z0-9_@./-]*$/gi
        password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        phone: /((^(\+)(\d){12}$)|(^\d{11}$))/g,
        place: /^([a-zA-Z]){2,30}$/gi,
        zipCode: /^([0-9]){,4}$/g,
    }

    /*
    * Validate Fields
    */
    export const VALIDATE = 
    {

        /**
         * Name Fields
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         * @param {*} fieldValue 
         */
        name (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue === '') {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.name(fieldName)[0]
                );

            } else if (! fieldValue.match(REGEX.name)) {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.name(fieldName)[1]
                );
            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);

            return fieldValue;
        },

        /**
         * Email Field
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         * @param {*} fieldValue 
         */
        email (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue === '') {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName, 
                    ERROR_MESSAGES.email(fieldName)[0]
                );
                
            } else if (! fieldValue.match(REGEX.email)) {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.email(fieldName)[1]
                );

            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);
            return fieldValue;
        },

        /**
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         * @param {*} fieldValue 
         */
        password (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue === '') {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName, 
                    ERROR_MESSAGES.password(fieldName)[0]
                );
                
            } else if (! fieldValue.match(REGEX.password)) {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.password(fieldName)[1]
                );

            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);
            return fieldValue;
        },

        /**
         * Phone Number Field
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         * @param {*} fieldValue 
         */
        phoneNumber (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue === '') {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName,
                    ERROR_MESSAGES.phoneNumber(fieldName)[0]
                );
                
            } else if (! fieldValue.match(REGEX.phone)) {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName,
                    ERROR_MESSAGES.phoneNumber(fieldName)[1]
                );
            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);
            return fieldValue;
        },

        /**
         * Place Field
         * 
         * @param {*} fieldName 
         * @param {*} inputClassName 
         * @param {*} fieldValue 
         */

        place (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue === '') {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.place(fieldName)[0]
                );
                
            } else if (! fieldValue.match(REGEX.place)) {

                SET_ERROR_MESSAGES.data(
                    fieldName, 
                    inputClassName, 
                    ERROR_MESSAGES.place(fieldName)[1]
                );
            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);
            return fieldValue;
        },

        /**
         * Zip Code
         * 
         * @param {*} fieldName 
         * @param {*} fieldValue 
         */
        zipCode (fieldName, inputClassName, fieldValue) 
        {
            if (fieldValue == '') {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName,
                    ERROR_MESSAGES.zipCode(fieldName)[0]
                );
                
            } else if (! fieldValue.match(REGEX.zipCode)) {

                SET_ERROR_MESSAGES.data(
                    fieldName,
                    inputClassName,
                    ERROR_MESSAGES.zipCode(fieldName)[1]
                );
            }

            SET_VALID_DATA_SYMBOL.data(fieldName, inputClassName);
            return fieldValue;
        },

    };



/* * * * * * * * * * *
 * 
 * HELPER FUNCTIONS
 * 
 * * * * * * * * * * /


 /**
  * 
  * Validation Initiation
  */
  
 export const initValidation = () => hideErrorFeedback();
 export const startValidation = () => { resetErrMessageValidation(); resetErrorValidation(); };

/**
 * Set Validation
 */

 const showErrorFeedback = (fieldName)  => document.querySelector(`.${ fieldName.toLowerCase() }-err`).style.display = 'block';

 export const hideErrorFeedback = () => document.querySelectorAll('.error-feedback').forEach( elem => elem.style.display = 'none');

 const addClassInvalid = (inputClassName) => document.querySelector(`.${ inputClassName }`).classList.add('is-invalid');

 const addClassValid = (inputClassName) => document.querySelector(`.${ inputClassName }`).classList.add('is-valid');
 const addClassHidden = (fieldName) => document.querySelector(`.${ fieldName.toLowerCase() }-err`).classList.add('hidden');

 const addErrorMessage = (fieldName, errMessage) => document.querySelector(`.${ fieldName.toLowerCase() }-err`).innerHTML = errMessage;



/**
 * Reset Validation
 */

 export const resetErrorValidation = ()  => {
    document.querySelectorAll('input').forEach(ele => ele.classList.remove('is-invalid'));
    document.querySelectorAll('textarea').forEach(ele => ele.classList.remove('is-invalid'));
    document.querySelectorAll('select').forEach(ele => ele.classList.remove('is-invalid'));
    document.querySelectorAll('input').forEach(ele => ele.classList.remove('is-valid'));
    document.querySelectorAll('textarea').forEach(ele => ele.classList.remove('is-valid'));
    document.querySelectorAll('select').forEach(ele => ele.classList.remove('is-valid'));
 };

 export const resetErrMessageValidation = () => document.querySelectorAll('.error-feedback').forEach(elem => elem.innerHTML = '');
 
