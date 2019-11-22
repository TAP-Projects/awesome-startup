// The search markup and functionality
import { createElement } from './helpers.js';
import { data, displayProfiles } from './app.js';

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
        // Prevent form submission
        e.preventDefault();
        // Get the query string
        const query = e.target.firstElementChild.value
        // Get ready for results
        let matches = {results: null};
        // If there's a query string
        if(query.length > 0){
            // Search the data object for the query and return all of the matches
            // The .results property is to accommodate displayProfiles()
            matches.results = data.filter( item => Object.values(item).filter( prop => query === prop));
            // Cheaper to just recreate the cards than to try to hide the non-matches
        } 
        displayProfiles(matches);
    });

    // Append form to DOM
    document.getElementById('search-container').append(form);

}