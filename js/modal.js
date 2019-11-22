// The modal markup and functionality
import { data } from './app.js';
import { createElement } from './helpers.js';
import { populateModal } from './app.js';

export function generateModal() {
    
    //-------------------
    // CREATE ELEMENTS --
    //-------------------

    // NOTE: The indentation is deliberate.
    const modalDiv = createElement('div', null, [
        { attribute: 'id', value: 'modal-div' },
        { attribute: 'class', value: 'modal' },
        { attribute: 'data-index', value: '' }
    ]);
        const button = createElement('button', `X`, [
            { attribute: "id", value: "modal-close-button" },
            { attribute: "class", value: "modal-close-btn" },
            { attribute: "type", value: "button" }
        ]);
        const modalInfoDiv = createElement('div', null, [
            { attribute: "class", value: "modal-info-container" }
        ]);
            const image =  createElement('img', null, [
                { attribute: "id", value: "modal-img" },
                { attribute: "class", value: "modal-img" },
                { attribute: "src", value: "https://placeholder.it/125x125" },
                { attribute: "alt", value: "profile picture" }
            ]);
            const heading =  createElement('h3',`first last`, [
                { attribute: "id", value: "modal-name" },
                { attribute: "class", value: "modal-name cap" }
            ]);
            const modalEmailP =  createElement('p', `email`, [
                { attribute: "id", value: "modal-email" },
                { attribute: "class", value: "modal-text" }
            ]);
            const modalCityP =  createElement('p', `city`, [
                { attribute: "id", value: "modal-city" },
                { attribute: "class", value: "modal-text cap" }
            ]);
            const rule = createElement('hr')
            const modalTelP =  createElement('p', `tel`, [
                { attribute: "id", value: "modal-tel" },
                { attribute: "class", value: "modal-text" }
            ]);
            const modalFullAddressP =  createElement('p', `address`, [
                { attribute: "id", value: "modal-address" },
                { attribute: "class", value: "modal-text" }
            ]);
            const modalBirthdayP =  createElement('p', `birthdate`, [
                { attribute: "id", value: "modal-dob" },
                { attribute: "class", value: "modal-text" }
            ]);
    const modalPrevNextDiv = createElement('div', null, [
        { attribute: 'class', value: 'modal-btn-container' }
    ]);
        const prev = createElement('button', `Prev`, [
            { attribute: "id", value: "modal-prev" },
            { attribute: "class", value: "modal-prev btn" },
            { attribute: "type", value: "button" }
        ]);
        const next = createElement('button', `Next`, [
            { attribute: "id", value: "modal-next" },
            { attribute: "class", value: "modal-next btn" },
            { attribute: "type", value: "button" }
        ]);

    //-------------------
    // APPEND ELEMENTS --
    //-------------------

    // Append image and text areas to card
    modalDiv.append(button, modalInfoDiv);
    // Append header, email, and address to text container
    modalInfoDiv.append(image, heading, modalEmailP, modalCityP, rule, modalTelP, modalFullAddressP, modalBirthdayP);
    // Append previous and next buttons to button container
    modalPrevNextDiv.append(prev, next)

    //------------------
    // DEFINE HANDLER --
    //------------------

    function handleModalClick(e){
        
        // If the click was on the close button...
        if(e.target.id === 'modal-close-button'){
            // 'close' the modal
            this.style.display = 'none';
            // and exit the function
            return;
        }

        //!GOAL: pass an actual profile object to populate modal
        // I can access 'data' because it's in the global scope

        // Get the current profile's index
        const profileIndex = parseInt(document.getElementById("modal-div").dataset.index, 10)
        let newProfile;
        // If the previous button was clicked
        if(e.target.id === 'modal-prev'){
            // Use the position of the current profile object to find the one before it. 
            newProfile = data[profileIndex - 1];
            console.log("The new profile is: ", newProfile)
        } else if(e.target.id === 'modal-next'){
            newProfile = data[profileIndex + 1];
        }
        populateModal(e, newProfile)
        
    } 

    //----------------
    // ADD LISTENER --
    //----------------

    // This handler will handle the close, previous, and next events
    document.getElementById('modal-container').addEventListener('click', handleModalClick);

    // Append card to DOM
    document.getElementById('modal-container').append(modalDiv, modalPrevNextDiv);

}