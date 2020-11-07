import * as _$ from '../modules/helper.js';

/*
 * ORDER PAYMENT FORM FIELDS AND METHODS
 */

    export const LOGIN_FORM_FIELDS = 
    {
    /*
     * BUTTONS
     */ 
        btnLoginAccount: _$.select('.login-account'),

    /*
     * User Info Fields
     */

        email : () => _$.select('.login-form-email').value,
        password: () => _$.select('.login-form-password').value,
    };

