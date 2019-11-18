// The modal markup and functionality

import { createElement } from './helpers.js';

export function generateModal() {
    // Deconstruct some variables
    // Create the elements
    // NOTE: The indentation is deliberate. It's tracking what is inserted into what
    const modalDiv = createElement('div', null, [
        { attribute: 'class', value: 'modal' }
    ]);
        const button = createElement('button', `X`, [
            { attribute: "id", value: "modal-close-button" },
            { attribute: "class", value: "modal-close-button" },
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

    // Append image and text areas to card
    modalDiv.append(button, modalInfoDiv);
    // Append header, email, and address to text container
    modalInfoDiv.append(image, heading, modalEmailP, modalCityP, rule, modalTelP, modalFullAddressP, modalBirthdayP);
    // Append previous and next buttons to button container
    modalPrevNextDiv.append(prev, next)

    // Add listener and handler
    // This handler will handle the close, previous, and next events
    modalDiv.addEventListener('click', () => console.log('The modal click handler fired.') );

    // Append card to DOM
    document.getElementById('modal-container').append(modalDiv, modalPrevNextDiv);

}