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

        isShipByBillingAddress: function () 
        {
            return _$.radioBtnValue(this.isShipByBillingAddressField());
        },

        doSendGift: function () 
        {
            return _$.radioBtnValue(this.doSendGiftField());
        },

        payment: function () 
        {
            return _$.radioBtnValue(this.paymentField());
        },

        orders: function ()
        {   
            return _$.checkBoxValues(this.ordersField());
        },

        totalPriceOfCart: function (totalPriceOfCart) 
        {
            _$.select('.purchase-total-price').innerText = totalPriceOfCart < 0 ? 0 : totalPriceOfCart;
            return totalPriceOfCart;
        },

        getTotalPriceOfCart: function () 
        {
            return parseFloat(_$.select('.purchase-total-price').innerText);
        },

        setTotalOfCart: function (checkedProducts)
        {
            _$.select('.total-added-to-cart').innerText = checkedProducts < 0 ? 0 : checkedProducts;
        },

        getTotalCartQuantities: function () 
        {
            return parseInt(_$.select('.total-added-to-cart').innerText);
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
     * Queries Fields/Radio Fields
     */

        isShipByBillingAddressField: () => _$.selectAll('.is-ship-by-billing-address'),
        doSendGiftField: () => _$.selectAll('.do-send-gift'),
        paymentField: () => _$.selectAll('.payment-method'),
        ordersField: () => _$.selectAll('input[name="product-checkbox"]:checked'),

    };


