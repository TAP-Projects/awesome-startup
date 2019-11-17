// The search markup and functionality
import { createElement } from './helpers.js';


// <form action="#" method="get">
// <input type="search" id="search-input" class="search-input" placeholder="Search...">
// <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>

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
        { attribute: "value", value: "&#x1F50D" }

    ]);

    // Append inputs to form
    form.append(input1, input2);

    // Add listener and handler
    form.addEventListener('submit', someFunction);

    // Append form to DOM
    document.getElementById('search-container').append(form);

}