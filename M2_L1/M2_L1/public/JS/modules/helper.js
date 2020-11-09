
/**
 * 
 * Query Selectors
 */


/**
 * Select single element  
 * @param {*} selectorName 
 */
export let select = (selectorName) => document.querySelector(selectorName);

/**
 * Select multiple element
 * @param {*} selectorName 
 */
export let selectAll = (selectorName) => document.querySelectorAll(selectorName);
 
/**
 * 
 * @param {*} attributeName 
 */
export let attrib = (elementField, attributeName) => elementField.getAttribute(attributeName);

/**
 * 
 */

 export let isEmpty = (value) => {

    if (Array.isArray(value)) {
        
        return value.length ? 0 : 1;
    }

    if (typeof value == 'object') {

        return value.length ? 0 : 1;
    }

    return value ? 0 : 1;
    
 };

 export let disableElem = (ele) => {

     if (Array.isArray(ele)) {
         
        ele.forEach(elem => elem.disabled = true);
     }

     return ele.disabled = true;
 };

 export let enableElem = (ele) => ele.disabled = false;

 export const radioBtnValue = (radioElem) => {

    let radioVal = '';
    radioElem.forEach( elem => {

        if (elem.checked) {
            radioVal = elem.value;
        }
    });

    return radioVal;
 };

 export const checkBoxValues = (checkBoxElem) => {

    let checkBoxVal = [];
    checkBoxElem.forEach( elem => checkBoxVal.push(elem.value));
    return checkBoxVal;
 };



 /**
  * * * * * * * * * 
  * 
  * CUSTOM HELPER
  * 
  * * * * * * * * */
