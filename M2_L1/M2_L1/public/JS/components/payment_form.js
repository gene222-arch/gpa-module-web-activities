import * as _$ from '../modules/helper.js';

/*
 * ORDER PAYMENT FORM FIELDS AND METHODS
 */

    export const PAYMENT_FORM_FIELDS = 
    {
    /*
     * BUTTONS
     */ 
        btnRemovePurchase: _$.selectAll('.remove-purchase'),
        btnSubmitPurchase: _$.select('.submit-customer-order'),

    /*
     * Customer Query (Radio Buttons)
     */

        isShipByBillingAddress () 
        {
            this.isShipByBillingAddressField().forEach( choice => 
            {
                if (choice.checked) {
                    return choice.value;
                }
            });
        },

        doSendGift () 
        {
            this.doSendGiftField().forEach(choice => 
            {
                if (choice.checked) {
                    return choice.value;
                }
            });
        },

    /*
     * Customer Personal Informations Fields
     */

        firstName : () => _$.select('.customer-firstname').value,
        lastName: () => _$.select('.customer-lastname').value,
        email: () => _$.select('.customer-email').value,
        phoneNumber: () => _$.select('.customer-phonenumber').value,


    /*
     * Customer Billing Address Fields
     */

        city: () => _$.select('.customer-city').value,
        province: () => _$.select('.customer-province').value,
        country: () => _$.select('.customer-country').value,
        zipCode: () => _$.select('.customer-zipcode').value,

    /*
     * Queries Fields
     */

        isShipByBillingAddressField () 
        {
            return _$.selectAll('.is-ship-by-billing-address');
        },
        doSendGiftField () 
        {
            return _$.selectAll('.do-send-gift');
        },
    };

