// The search markup and functionality
import { createElement } from './helpers.js';
import { data, cardNodes, displayProfiles } from './app.js';

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

    // Submit and keyup form handler
    function handleForm(e){

        // Prevent form submission
        e.preventDefault();

        //!NOTE: I need to add debounce to the keyup listener

        // Remove all cards
        //?QUESTION: Is there a less cpu intensive way to do this?
        document.querySelectorAll('div.card').forEach(card => card.remove());

        // Get the query string
        const query = document.getElementById('search-input').value.toLowerCase().trim();

        // Get ready for results
        let matches;
        // If there's a query string, then map the data, returning profiles that include the query string
        if(query.length > 0){
            matches = data.map( profile => Object.values(profile).join('').includes(query) ? profile : null );
            // Display the valid matches, filtering out nulls. NOTE: It's easier to just recreate the cards than to try to hide the non-matches and then display them again
            displayProfiles(matches.filter(match=>match));
        } else {
        // If submit is clicked when the query field is empty, re-append the saved card nodes. We're avoiding having to generate the code nodes a second time.
            document.getElementById('gallery').append(...cardNodes);
        }
    }

    // Append inputs to form
    form.append(input1, input2);

    // Add listener and handler
    form.addEventListener('submit', handleForm);
    form.addEventListener('keyup', handleForm);

    // Append form to DOM
    document.getElementById('search-container').append(form);

}