// The search markup and functionality
import { createElement } from './helpers.js';

export function generateForm() {
    // Create the elements
    const form = createElement('form', null, [
        { attribute: 'action', value: '#' },
        { attribute: "method", value: "get" }
    ]);
    const input1 = createElement('input', null, [
        { attribute: "type", value: "search" },
        { attribute: "id", value: "search-input" },
        { attribute: "class", value: "search-input" },
        { attribute: "placeholder", value: "Search..." }
    ]);
    const input2 = createElement('input', null, [
        { attribute: "type", value: "submit" },
        { attribute: "id", value: "search-submit" },
        { attribute: "class", value: "search-submit" },
        { attribute: "value", value: "🔍" }

    ]);

    // Append inputs to form
    form.append(input1, input2);

    // Add listener and handler
    form.addEventListener('submit', function(e){
        e.preventDefault();
        if(e.target.children[0].value.length > 0){
            // recursively join all of the fields in each record to create a string
        } 
    });

    // Append form to DOM
    document.getElementById('search-container').append(form);

}