import * as _$ from '../modules/helper.js';

/*
 * ORDER PAYMENT FORM FIELDS AND METHODS
 */

    export const REGISTER_FORM_FIELDS = 
    {
    /*
     * BUTTONS
     */ 
        btnCreateAccount: _$.select('.create-account'),

    /*
     * User Info Fields
     */
        firstName : () => _$.select('.create-account-firstname').value,
        email : () => _$.select('.create-account-email').value,
        password: () => _$.select('.create-account-password').value,
    };

