
/**
 * 
 * Query Selectors
 */


/**
 * Select single element  
 * @param {*} selectorName 
 */
export const select = (selectorName) => document.querySelector(selectorName);

/**
 * Select multiple element
 * @param {*} selectorName 
 */
export const selectAll = (selectorName) => document.querySelectorAll(selectorName);
 
/**
 * 
 * @param {*} attributeName 
 */
export const attrib = (elementField, attributeName) => elementField.getAttribute(attributeName);

/**
 * 
 */

 export const isEmpty = (value) => {

    if (Array.isArray(value)) {
        
        return value.length ? 0 : 1;
    }

    if (typeof value == 'object') {

        return value.length ? 0 : 1;
    }

    return value ? 0 : 1;
    
 };

 export const disableElem = (ele) => ele.disabled = true;
 export const enableElem = (ele) => ele.disabled = false;




 /**
  * * * * * * * * * 
  * 
  * CUSTOM HELPER
  * 
  * * * * * * * * */

