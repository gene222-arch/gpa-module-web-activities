import * as _$ from './modules/helper.js';
import * as v from './modules/validation.js';
import * as p from "./components/payment_form.js";
import * as l from "./components/login_form.js";
import * as r from "./components/register_form.js";

(function(){

    /**
     * Remove div.error-feedback element once loaded
     */
    v.initValidation();

    window.addEventListener('DOMContentLoaded', (e) => 
    {   
        setLocalStorage();
        document.querySelectorAll('select[name="product_quantity"]').forEach(selElem => selElem.disabled = true);

        /*
         * REGISTER FORM FIELDS
         * * * * * * * * * * * * */

        if (r.REGISTER_FORM_FIELDS.btnCreateAccount) {

            // Disable create account button
            _$.disableElem(_$.select('.create-account'));

            _$.selectAll('input').forEach( elem => 
            {
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
         * Remove Products
         */

        p.PAYMENT_FORM_FIELDS.btnRemovePurchase.forEach(btn => 
        {
            btn.addEventListener('click', () => 
            {
                /**
                 * Remove checked on checkbox when deleted and get current Product Name On Delete
                 */
                _$.select('.product-checkbox-' +  _$.attrib(btn, 'id')).checked = false;
                const currentProductName = _$.attrib(_$.select('.product-checkbox-' +  _$.attrib(btn, 'id')), 'class').split(' ')[1].replace(/-/gi, ' ');

                const DO_REMOVEPRODUCT = confirm(`Remove ${ currentProductName } in the product lists?`) ? 1 : 0;
                const PURCHASE_ITEM = '.purchase-product' + _$.attrib(btn, 'id');
                const TOTAL_PRICE_FIELD = _$.select('.total-added-to-cart');

                let purchaseCount = parseInt(TOTAL_PRICE_FIELD.innerText.trim());

                if (DO_REMOVEPRODUCT) {

                    _$.select(PURCHASE_ITEM).style.display = "none";
                    -- purchaseCount;
                    TOTAL_PRICE_FIELD.innerText = purchaseCount < 0 ? 0 : purchaseCount;

                    if (
                        (p.PAYMENT_FORM_FIELDS.getTotalPriceOfCart() < 0) ||
                        (localStorage.getItem('totalPriceOfCart') < 0)) 
                    {

                        p.PAYMENT_FORM_FIELDS.totalPriceOfCart(0);
                        localStorage.setItem('totalPriceOfCart', 0);

                    } else {

                        /**
                         * Update total quantity checkedBoxes in Storage
                         */
                        let totalItemInStore = localStorage.getItem('setTotalOfCart') > 0 ? (localStorage.getItem('setTotalOfCart') - 1) : 0;
                        localStorage.setItem('setTotalOfCart', totalItemInStore);

                        /**
                         * Update payment_form object
                         */
                        p.PAYMENT_FORM_FIELDS.setTotalOfCart(localStorage.getItem('setTotalOfCart'));
                        p.PAYMENT_FORM_FIELDS.totalPriceOfCart((localStorage.getItem('totalPriceOfCart') - Number(btn.value)).toFixed(2));

                        /**
                         * Update Storage
                         */
                        let currentStoragePrice = localStorage.getItem('totalPriceOfCart');
                        localStorage.setItem('totalPriceOfCart', currentStoragePrice - Number(btn.value));

                    }                    
                    
                    if (!purchaseCount) {
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

            _$.selectAll('input').forEach( elem => 
            {
                elem.addEventListener('change', () => 
                {   
                    /**
                     * If a field is empty and a checkbox is not checked disable button
                     */
                    if ( 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.firstName()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.lastName()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.email()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.phoneNumber()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.city()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.province()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.zipCode()) || 
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.country()) ||
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.isShipByBillingAddress()) ||
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.doSendGift()) ||
                        _$.isEmpty( p.PAYMENT_FORM_FIELDS.payment()) ||
                        ! elem.checked
                    ) {

                        _$.disableElem(_$.select('.submit-customer-order'));

                     }  else  {

                        _$.enableElem(_$.select('.submit-customer-order'));
                     }
                });
            });

            /**
             * Quantity 
             */

            updateTotalPriceWithQuantity(
                'product-checkbox-1',  
                'bento-price', 
                'bento-total-price'
            );

            updateTotalPriceWithQuantity(
                'product-checkbox-2', 
                'sushi-price', 
                'sushi-total-price'
            );

            updateTotalPriceWithQuantity(
                'product-checkbox-3', 
                'grilled-pork-with-salad-price', 
                'grilled-pork-with-salad-total-price'
            );

            updateTotalPriceWithQuantity(
                'product-checkbox-4', 
                'pork-grilled-salad-price', 
                'pork-grilled-salad-total-price'
            );

            updateTotalPriceWithQuantity(
                'product-checkbox-5', 
                'wrapped-karaage-price', 
                'wrapped-karaage-total-price'
            );

            updateTotalPriceWithQuantity(
                'product-checkbox-6', 
                'grilled-pork-price', 
                'grilled-pork-total-price'
            );
            
            /**
             * Checkboxes
             */

            _$.selectAll('input[type="checkbox"]').forEach( (checkbox) => 
            {
                checkbox.addEventListener('click', (e) => 
                {
                    let totalQty = 0;
                    let getStorageCartPrice = parseFloat(localStorage.getItem('totalPriceOfCart'));
                    let checkedBoxes = _$.selectAll('input[name="product-checkbox"]:checked');

                    /**
                     * Set total qty
                     */
                    localStorage.setItem('setTotalOfCart', checkedBoxes.length < 0 ? 0 : checkedBoxes.length);
                    p.PAYMENT_FORM_FIELDS.setTotalOfCart(localStorage.getItem('setTotalOfCart'));

                    if (e.target.checked) {

                        _$.select('.total-cart-quantity').innerText = localStorage.getItem('setTotalOfCart');
                        /**
                         * Remove disable if box is unchecked on selectQTY
                         */
                        _$.select(`select.product-checkbox-${ e.target.id }`).disabled = false;
                        _$.select(`.remove-purchase-${ e.target.id }`).disabled = true;
                 

                        checkedBoxes.forEach( (checkProduct) => 
                        {
                            let currentProductVal = parseFloat(checkProduct.value);
                            let productVal = (getStorageCartPrice > 0) ? (getStorageCartPrice + currentProductVal) : currentProductVal;
                           
                            /**
                             * Set or Update totalPriceOfCart in storage
                             */
                            localStorage.setItem('totalPriceOfCart', productVal.toFixed(2));
                            p.PAYMENT_FORM_FIELDS.totalPriceOfCart(parseFloat(localStorage.getItem('totalPriceOfCart')).toFixed(2));
                        });

                    }

                    if (! e.target.checked) {
                        _$.select('.total-cart-quantity').innerText = localStorage.getItem('setTotalOfCart');
                        /**
                         * Add disable if box is unchecked on selectQTY
                         */
                        _$.select(`select.product-checkbox-${ e.target.id }`).disabled = true;
                        _$.select(`.remove-purchase-${ e.target.id }`).disabled = false;

                        /**
                         * Get checkedProduct Current Quantity
                         */
                        let getCheckedQty = parseInt(localStorage.getItem(`${ _$.attrib(checkbox, 'class').split(' ')[0] }`));
                   
                        let getCurrentCheckboxTotalPrice = (getCheckedQty * parseFloat(e.target.value));
                
                        /**
                         * Set Storage qty of the current product to 1 
                         * Set Select value of the current product to 1
                         */
                        localStorage.setItem(`${ _$.attrib(checkbox, 'class').split(' ')[0] }`, 1);
                        _$.select(`select.${ _$.attrib(checkbox, 'class').split(' ')[0] }`).value = 1;

                        /**
                         * Get Updated Price
                         */
                        getStorageCartPrice = parseFloat(localStorage.getItem('totalPriceOfCart'));
                      
                        /**
                         * Update totalPriceOfCart in Storage
                         */
                        let updatedCartTotalPrice = (getStorageCartPrice - getCurrentCheckboxTotalPrice).toFixed(2);
                        localStorage.setItem('totalPriceOfCart', updatedCartTotalPrice);

                        p.PAYMENT_FORM_FIELDS.totalPriceOfCart(parseFloat(localStorage.getItem('totalPriceOfCart')).toFixed(2));

                        
                        // Update totalPriceOfProduct
            
                        switch (parseInt(e.target.id)) {
                            case 1:
                                localStorage.setItem('bento-total-price', 0);
                                break;
                            case 2:
                                localStorage.setItem('sushi-total-price', 0);
                                break;
                            case 3:
                                localStorage.setItem('grilled-pork-with-salad-total-price', 0);
                                break;
                            case 4:
                                localStorage.setItem('pork-grilled-salad-total-price', 0);
                                break;
                            case 5:
                                localStorage.setItem('grilled-pork-total-price', 0);
                                break;
                            case 6:
                                localStorage.setItem('wrapped-karaage-total-price', 0);
                                break;
                        }
                    }

                });
            });

            p.PAYMENT_FORM_FIELDS.btnSubmitPurchase.addEventListener('click', (e) => 
            {   
                e.preventDefault();
                v.startValidation();
  
                let firstName = v.VALIDATE.name(
                    'Firstname', 
                    'customer-firstname', 
                    p.PAYMENT_FORM_FIELDS.firstName()
                );

                let lastName = v.VALIDATE.name(
                    'Lastname', 
                    'customer-lastname', 
                    p.PAYMENT_FORM_FIELDS.lastName()
                );
    
                let email = v.VALIDATE.email(
                    'Email', 
                    'customer-email', 
                    p.PAYMENT_FORM_FIELDS.email()
                );
    
                let phoneNumber = v.VALIDATE.phoneNumber(
                    'Phonenumber', 
                    'customer-phonenumber', 
                    p.PAYMENT_FORM_FIELDS.phoneNumber()
                );
    
                let city = v.VALIDATE.place(
                    'City', 
                    'customer-city', 
                    p.PAYMENT_FORM_FIELDS.city()
                );
    
                let province = v.VALIDATE.place(
                    'Province', 
                    'customer-province', 
                    p.PAYMENT_FORM_FIELDS.province()
                );
    
                let zipCode = v.VALIDATE.place(
                    'ZipCode', 
                    'customer-zipcode', 
                    p.PAYMENT_FORM_FIELDS.zipCode()
                );
    
                let country = v.VALIDATE.place(
                    'Country', 
                    'customer-country', 
                    p.PAYMENT_FORM_FIELDS.country()
                );

                let isShipByBilAddr = v.VALIDATE.checkBox(
                    'Question-1',
                    p.PAYMENT_FORM_FIELDS.isShipByBillingAddress()
                );

                let doSendGift = v.VALIDATE.checkBox(
                    'Question-2',
                    p.PAYMENT_FORM_FIELDS.doSendGift()
                );

                let payment = v.VALIDATE.checkBox(
                    'Payment-Method',
                    p.PAYMENT_FORM_FIELDS.payment()
                );
                
                console.log(p.PAYMENT_FORM_FIELDS.orders());

            });
    
        }
    });



    function setLocalStorage()
    {
        localStorage.setItem('totalPriceOfCart', 0);
        localStorage.setItem('setTotalOfCart', 0);

        /**
         * Quantity
         */
        localStorage.setItem('product-checkbox-1', 1);
        localStorage.setItem('product-checkbox-2', 1);
        localStorage.setItem('product-checkbox-3', 1);
        localStorage.setItem('product-checkbox-4', 1);
        localStorage.setItem('product-checkbox-5', 1);
        localStorage.setItem('product-checkbox-6', 1);
        
        /**
         * Each product Price
         */
        localStorage.setItem('bento-price', 200);
        localStorage.setItem('sushi-price', 300);
        localStorage.setItem('grilled-pork-with-salad-price', 400);
        localStorage.setItem('pork-grilled-salad-price', 500);
        localStorage.setItem('grilled-pork-price', 600);
        localStorage.setItem('wrapped-karaage-price', 550);

        /**
         * Each product total price
         */
        localStorage.setItem('bento-total-price', 0);
        localStorage.setItem('sushi-total-price', 0);
        localStorage.setItem('grilled-pork-with-salad-total-price', 0);
        localStorage.setItem('pork-grilled-salad-total-price', 0);
        localStorage.setItem('grilled-pork-total-price', 0);
        localStorage.setItem('wrapped-karaage-total-price', 0);
    }

 /**
   * 
   * Payment 
   * 
   * @param {*} elementClassName 
   * @param {*} localStorageName 
   */
    function updateTotalPriceWithQuantity (elementClassName, elementDefaultPrice, elementTotalPriceInStore)
    {
        _$.select(`select.${ elementClassName }`).addEventListener('change', (e) => 
        {

        let getTotalOfCartQty = parseInt(localStorage.getItem('setTotalOfCart'));
        let getPrevProductQty = parseInt(localStorage.getItem(elementClassName)); // default qty === 1
        let getProductPrice = parseFloat(localStorage.getItem(elementDefaultPrice)); // default price
        let getProductTotalPrice = parseFloat(localStorage.getItem(elementTotalPriceInStore)); // This prod total price
        let getCurrentTotalPriceOfCart = parseFloat(localStorage.getItem('totalPriceOfCart')); // current price of CART

        /**
         * 
         */
        localStorage.setItem(elementTotalPriceInStore, (getPrevProductQty * getProductPrice).toFixed(2));

        /**
         * Update the qty of the product only if the prev quantity is not the same as the new qty value
         */
        localStorage.setItem(elementClassName, (parseInt(e.target.value)));
        /**
          * Cart Qty
          */
         _$.select('.total-cart-quantity').innerText = totalQtyOfProd();

        /**
         * Update totalPriceCart in Storage
         */
        let diffOfProdPriceCartPrice = 0;

        

        if (getProductTotalPrice) {
            /**
             * Remove totalPrice of product from cart if exists
             */
            diffOfProdPriceCartPrice = (getCurrentTotalPriceOfCart - getProductTotalPrice).toFixed(2);
            
        } else {
            /**
             * Remove basic Price of product from cart
             */
            diffOfProdPriceCartPrice = (getCurrentTotalPriceOfCart - getProductPrice).toFixed(2);
        }

        let updatedCartPrice = diffOfProdPriceCartPrice < 0 ? 0 : diffOfProdPriceCartPrice;

        localStorage.setItem('totalPriceOfCart', updatedCartPrice);

        /**
         * Get totalPriceCart in Storage
         */
        let getUpdatedCartPrice = parseFloat(localStorage.getItem('totalPriceOfCart'));

        /**
         * Get Product of the Product Price and Quantity
         */
        let getTotalPriceOfProduct = (
            parseFloat(localStorage.getItem(elementDefaultPrice)) * parseInt(e.target.value)
        );


        /**
         * Store total price of product 
         */
        localStorage.setItem(elementTotalPriceInStore, getTotalPriceOfProduct);
        /**
         * Set totalPriceOfCart
         */
        localStorage.setItem('totalPriceOfCart', (
            getTotalPriceOfProduct + getUpdatedCartPrice).toFixed(2)
        );

        p.PAYMENT_FORM_FIELDS.totalPriceOfCart(
            parseFloat(localStorage.getItem('totalPriceOfCart')).toFixed(2)
        );

        });
    }

    let totalQtyOfProd = () => {

        let qty = 0; 

        for (let index = 1; index <= 6; index++) {
            
            qty += parseInt(localStorage.getItem(`product-checkbox-${ index }`)) - 1;
        }
        
        return qty + parseInt(localStorage.getItem('setTotalOfCart'));
    };

}());