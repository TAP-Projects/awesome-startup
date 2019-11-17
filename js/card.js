// Gallery markup and functionality

import { createElement } from './helpers.js';

// <div class="card">
//     <div class="card-img-container">
//         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture" />
//     </div>
//     <div class="card-info-container">
//         <h3 id="name" class="card-name cap">first last</h3>
//         <p class="card-text">email</p>
//         <p class="card-text cap">city, state</p>
//     </div>
// </div> 

export function generateCard() {
    // Create the elements
    const cardDiv = createElement('div', null, [
        { attribute: 'class', value: 'card' }
    ]);
    const cardImgDiv = createElement('div', null, [
        { attribute: "class", value: "card-image-container" }
    ]);
    const cardInfoDiv = createElement('div', null, [
        { attribute: "class", value: "card-info-container" }
    ]);
    const image =  createElement('img', null, [
        { attribute: "class", value: "card-img" },
        { attribute: "src", value: "https://placeholder.it/90x90" },
        { attribute: "alt", value: "profile picture" }
    ]);
    const heading =  createElement('h3',`first last`, [
        { attribute: "id", value: "name" },
        { attribute: "class", value: "card-name cap" }
    ]);
    const cardEmailP =  createElement('p', `email`, [
        { attribute: "class", value: "card-text" }
    ]);
    const cardAddressP =  createElement('p', `city, state`, [
        { attribute: "class", value: "card-text cap" }
    ]);

    // Append image and text areas to card
    cardDiv.append(cardImgDiv, cardInfoDiv);
    // Append image to image container
    cardImgDiv.append(image);
    // Append header, email, and address to text container
    cardInfoDiv.append(heading, cardEmailP, cardAddressP);

    // Add listener and handler
    cardDiv.addEventListener('click', () => console.log('The card click handler fired.') );

    // Append card to DOM
    document.getElementById('gallery').append(cardDiv);

}