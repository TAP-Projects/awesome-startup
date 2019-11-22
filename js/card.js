// Gallery markup and functionality

import { createElement } from './helpers.js';

export function generateCard(result, index) {
    // Deconstruct some variables
    const { name, location, email, dob, phone, picture } = result;

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
        { attribute: "src", value: picture.large },
        { attribute: "alt", value: "profile picture" }
    ]);
    const heading =  createElement('h3',`${name.first} ${name.last}`, [
        { attribute: "id", value: "name" },
        { attribute: "class", value: "card-name cap" }
    ]);
    const cardEmailP =  createElement('p', email, [
        { attribute: "class", value: "card-text" }
    ]);
    const cardAddressP =  createElement('p', `${location.city}, ${location.state}`, [
        { attribute: "class", value: "card-text cap" }
    ]);

    // Append image and text areas to card
    cardDiv.append(cardImgDiv, cardInfoDiv);
    // Append image to image container
    cardImgDiv.append(image);
    // Append header, email, and address to text container
    cardInfoDiv.append(heading, cardEmailP, cardAddressP);

    // Append card to DOM
    document.getElementById('gallery').append(cardDiv);

    return cardDiv;

}