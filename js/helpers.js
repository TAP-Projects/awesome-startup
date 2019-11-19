// HELPER FUNCTIONS

// FUNCTION createElement ================================================
// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
function createElement(element, text, attributes) {
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

// reduceKeys takes an object and prefix and returns a new array containing the keys of the passed in object, plus any nested object's keys
function reduceKeys(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, currentKey) => {
        if (Array.isArray(obj[currentKey])) {
            return acc;
        } else if (typeof obj[currentKey] === 'object' && obj[currentKey] !== null) {
            return [...acc, ...reduceKeys(obj[currentKey], prefix + '["' + currentKey + '"]')];
        } else {
            const newKey = prefix + '["' + currentKey + '"]';
            return [...acc, newKey ];
        }
    }, [])
        //.forEach( key => );
}

// Partly inspired by Olian04's response to https://stackoverflow.com/questions/47062922/how-to-get-all-keys-with-values-from-nested-objects/47063174
// FUNCTION buildSearchableString ==========================================
// buildSearchableString takes an array of objects with nested arrays and/or objects, finds the keys and values in any objects, and returns a string formed by those keys and values, formatted so as to be easily searched
function buildSearchableString(data) {
    // Iterate over the member objects of the data array, returning a new array of...
    return data.map(item => reduceKeys(item, ''));


}

const somePeople = [
    {
        'name': 'john',
        'group1': {
            subject1: { 'age': 36, 'gender': {nb: 1, male: 2, female: 3} },
            subject2: { 'age': 27, 'gender': 'male' },
        },
        'group2': [
            { 'age': 46, 'gender': 'nb' },
            { 'age': 33, 'gender': 'male' },
        ]
    },
    {
        'name': 'alex',
        'group1': [
            { 'age': 17, 'gender': 'nb' },
            { 'age': 54, 'gender': 'male' },
        ],
        'group2': [
            { 'age': 62, 'gender': 'nb' },
            { 'age': 38, 'gender': 'male' },
        ]
    }
];

console.log(reduceKeys(somePeople[0]))
let result = reduceKeys({ 'name': 'john', 'age': 36, 'gender': 'male' });
console.log(result);
console.log(reduceKeys({ 'name': 'bob' }))