// HELPER FUNCTIONS

// FUNCTION createElement ================================================
// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
export function createElement(element, text, attributes) {
    const theElem = document.createElement(element);
    if (text && typeof text === 'string' && text.length > 0) {
        theElem.textContent = text;
    }
    if (attributes && Array.isArray(attributes) && attributes.length > 0) {
        attributes.forEach((attr) => {
            theElem.setAttribute(attr.attribute, attr.value);
        });
    }
    return theElem;
}