import * as _$ from './modules/helper.js';
import * as v from './modules/validation.js';
import * as p from "./components/payment_form.js";
import * as l from "./components/login_form.js";
import * as r from "./components/register_form.js";

(function(){


    v.initValidation();

    window.addEventListener('DOMContentLoaded', (e) => 
    {   

        /*
         * REGISTER FORM FIELDS
         * * * * * * * * * * * * */

        if (r.REGISTER_FORM_FIELDS.btnCreateAccount) {

            // Disable create account button
            _$.disableElem(_$.select('.create-account'));

            _$.selectAll('input').forEach( elem => {

                elem.addEventListener('keyup', () => 
                {   
                    if ( 
                        _$.isEmpty( r.REGISTER_FORM_FIELDS.firstName()) ||
                        _$.isEmpty( r.REGISTER_FORM_FIELDS.email()) || 
                        _$.isEmpty( r.REGISTER_FORM_FIELDS.password())
                    ) {

                        _$.disableElem(_$.select('.create-account'));

                     }  else  {

                        _$.enableElem(_$.select('.create-account'));
                     }

                });

            });

            r.REGISTER_FORM_FIELDS.btnCreateAccount.addEventListener('click', (e) => {

                e.preventDefault();
                v.startValidation();

                v.VALIDATE.name(
                    'Firstname',
                    'create-account-firstname',
                    r.REGISTER_FORM_FIELDS.firstName()
                );

                v.VALIDATE.email(
                    'Email', 
                    'create-account-email', 
                    r.REGISTER_FORM_FIELDS.email()
                );
    
                v.VALIDATE.password(
                    'Password', 
                    'create-account-password', 
                    r.REGISTER_FORM_FIELDS.password()
                );    

            })

        }

        /*
         * LOGIN FORM
         * * * * * * * * */

        if (l.LOGIN_FORM_FIELDS.btnLoginAccount) {
            
            // Disable login button
            _$.disableElem(_$.select('.login-account'));

            _$.selectAll('input').forEach( elem => {

                elem.addEventListener('keyup', () => 
                {   

                    if ( 
                        _$.isEmpty( l.LOGIN_FORM_FIELDS.email()) || 
                        _$.isEmpty( l.LOGIN_FORM_FIELDS.password())
                    ) {

                        _$.disableElem(_$.select('.login-account'));

                     }  else  {

                        _$.enableElem(_$.select('.login-account'));
                     }

                });

            });

            l.LOGIN_FORM_FIELDS.btnLoginAccount.addEventListener('click', (e) => 
            {
                e.preventDefault();
                v.startValidation();
 
                v.VALIDATE.email(
                    'Email', 
                    'login-form-email', 
                    l.LOGIN_FORM_FIELDS.email()
                );
    
                v.VALIDATE.password(
                    'Password', 
                    'login-form-password', 
                    l.LOGIN_FORM_FIELDS.password()
                );       
            });
            
    
        }

        /*
         * PAYMENT FORM
         * * * * * * * * */

        /*
         * Remove purchase
         */

        p.PAYMENT_FORM_FIELDS.btnRemovePurchase.forEach(btn => 
        {
            btn.addEventListener('click', () => 
            {
                const DO_REMOVEPRODUCT = confirm('Remove product in your cart?') ? 1 : 0;
                const PURCHASE_ITEM = '.purchase-product' + _$.attrib(btn, 'id');

                const TOTAL_PRICE_FIELD = _$.select('.total-added-to-cart');
                let PURCHASE_COUNT = parseInt(TOTAL_PRICE_FIELD.innerText.trim());

                if (DO_REMOVEPRODUCT) {

                    _$.select(PURCHASE_ITEM).style.display = "none";
                    -- PURCHASE_COUNT;
                    TOTAL_PRICE_FIELD.innerText = PURCHASE_COUNT;
                    console.log(PURCHASE_COUNT)
                    if (!PURCHASE_COUNT) {
                        window.history.back();
                    }
                    
                }
            });
        });

        /*
         * On Submit Purchase
         */

        if (p.PAYMENT_FORM_FIELDS.btnSubmitPurchase) {
            
            // Disable submit order button
            _$.disableElem(_$.select('.submit-customer-order'));

            _$.selectAll('input').forEach( elem => {

                elem.addEventListener('keyup', () => 
                {
                    if ( 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.firstName()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.lastName()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.email()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.phoneNumber()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.city()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.province()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.zipCode()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.country())
                    ) {

                        _$.disableElem(_$.select('.submit-customer-order'));

                     }  else  {

                        _$.enableElem(_$.select('.submit-customer-order'));
                     }

                });

            });

            p.PAYMENT_FORM_FIELDS.btnSubmitPurchase.addEventListener('click', (e) => 
            {   
                e.preventDefault();
                v.startValidation();

                v.VALIDATE.name(
                    'Firstname', 
                    'customer-firstname', 
                    p.PAYMENT_FORM_FIELDS.firstName()
                );
    
                v.VALIDATE.name(
                    'Lastname', 
                    'customer-lastname', 
                    p.PAYMENT_FORM_FIELDS.lastName()
                );
    
                v.VALIDATE.email(
                    'Email', 
                    'customer-email', 
                    p.PAYMENT_FORM_FIELDS.email()
                );
    
                v.VALIDATE.phoneNumber(
                    'Phonenumber', 
                    'customer-phonenumber', 
                    p.PAYMENT_FORM_FIELDS.phoneNumber()
                );
    
                v.VALIDATE.place(
                    'City', 
                    'customer-city', 
                    p.PAYMENT_FORM_FIELDS.city()
                );
    
                v.VALIDATE.place(
                    'Province', 
                    'customer-province', 
                    p.PAYMENT_FORM_FIELDS.province()
                );
    
                v.VALIDATE.place(
                    'ZipCode', 
                    'customer-zipcode', 
                    p.PAYMENT_FORM_FIELDS.zipCode()
                );
    
                v.VALIDATE.name(
                    'Country', 
                    'customer-country', 
                    p.PAYMENT_FORM_FIELDS.country()
                );
    
                p.PAYMENT_FORM_FIELDS.isShipByBillingAddress();
                p.PAYMENT_FORM_FIELDS.doSendGift();
                
            });
    
        }
    });

}());