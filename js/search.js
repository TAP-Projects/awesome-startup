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

        //!NOTE: this is not working right now. I was trying to hide all of the results and then display the matching profiles if there was a query. If there was a submit with no query, the hidden cards would be shown again. The problem is that you have to remove the search results for that to work. Instead, we need to remove all of the cards, and then we just have to save the result of creating all of hte cards originally and then re-append that.

        //!NOTE: Also, I should add a keyup listener with debounce to the search function

        // Remove all cards
        const cards = document.getElementById('gallery').children.remove();
        
        // Get the query string
        const query = e.target.firstElementChild.value.toLowerCase();
        console.log("The query is: ", query);
        // Get ready for results
        let matches;
        // If there's a query string
        if(query.length > 0){
            // Map the array of profile objects for just those profiles that contain the query string
            matches = data.map( profile => {
                // Get the profile object's values
                const valuesArr = Object.values(profile);
                // Loop over the values and if one contains the query, return its profile
                for(let i=0; i< valuesArr.length; i++){
                    if(String(valuesArr[i]).includes(query)){
                        return profile;
                    }
                    continue;
                }
            }).filter(profile=>profile)
            console.log("matches is: ", matches);
            // Cheaper to just recreate the cards than to try to hide the non-matches
            displayProfiles(matches);
        } else {
            for(let i=0; i<cards.length; i++){
                cards[i].setAttribute('style', 'display:flex');
            }
        }
    });

    // Append form to DOM
    document.getElementById('search-container').append(form);

}