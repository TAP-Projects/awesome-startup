// Generate the search form
generateForm();

// Generate the modal window
generateModal();

// Get references to modal elements in the DOM
const modalDOM = {
	modalContainer: document.getElementById("modal-container"),
	modalDiv: document.getElementById("modal-div"),
	modalImg: document.getElementById("modal-img"),
	modalName: document.getElementById("modal-name"),
	modalEmail: document.getElementById("modal-email"),
	modalCity: document.getElementById("modal-city"),
	modalTel: document.getElementById("modal-tel"),
	modalAddress: document.getElementById("modal-address"),
	modalDOB: document.getElementById("modal-dob")
};

// Hide the modal container
modalDOM.modalContainer.setAttribute("style", "display:none");

// data will hold the profile data - an array of profile objects
let data;
// cardNodes will holds the card nodes created on the first call to displayProfile
const cardNodes = [];

// Fetch the profiles and display them when the data arrives
fetchData(
	"https://randomuser.me/api/1.3/?format=json&results=12&nat=us&exc=login,registered"
)
	// The data argument to indexData is the holder defined on line 29
	.then(indexData)
	.then(res=>data = res)
	.then(displayProfiles);

// Display profiles
// displayProfile takes an array of profile objects and loops over it to generate profile cards, attaching a click listener to each. On click, we call populateModal, passing in the card, which we'll use to populate the modal.
function displayProfiles(data) {
	data.forEach(card => {
		const cardNode = generateCard(card);
		cardNode.addEventListener("click", e => populateModal(e, card));
		// We populate the cardNodes array just once on the initial call to displayProfiles
		if (cardNodes.length < 12) cardNodes.push(cardNode);
	});
	console.log("The data is: ", data);
}

// HELPER FUNCTIONS

// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
function createElement(element, text, attributes) {
	const theElem = document.createElement(element);
	if (text && typeof text === "string" && text.length > 0) {
		theElem.textContent = text;
	}
	if (attributes && Array.isArray(attributes) && attributes.length > 0) {
		attributes.forEach(attr => {
			theElem.setAttribute(attr.attribute, attr.value);
		});
	}
	return theElem;
}

// fetchData takes a url string and returns a promise containing the parsed data fetched from the given URL
function fetchData(url) {
	return fetch(url)
		.then(checkStatus)
		.then(res => res.json())
		.catch(error => console.log("Looks like there was a problem!", error));
}

// checkStatus takes a promise of fetched data, if the response is 'OK'. Otherwise it reject's the promise, returning a new error with the response status text.
function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}


// indexData takes the resolved parsed json and an empty holder. It stores its results property in the holder. It iterates over the holder, adding an index to each object in the results array
function indexData(json) {
	// Set data to parsed results
	json.results.forEach((item, index) => (item.index = index));
	return json.results;
}

// GALLERY MARKUP AND FUNCTIONALITY

function generateCard(result, index) {
    console.log(result);
    // Deconstruct some variables
    const { name, location, email, dob, phone, picture } = result;
    
    //-------------------
    // CREATE ELEMENTS --
    //-------------------
    
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

    //-------------------
	// APPEND ELEMENTS --
	//-------------------

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

// MODAL MARKUP AND FUNCTIONALITY

function generateModal() {
	//-------------------
	// CREATE ELEMENTS --
	//-------------------

	// NOTE: The indentation is deliberate.
	const modalDiv = createElement("div", null, [
		{ attribute: "id", value: "modal-div" },
		{ attribute: "class", value: "modal" },
		{ attribute: "data-index", value: "" }
	]);
	const button = createElement("button", `X`, [
		{ attribute: "id", value: "modal-close-button" },
		{ attribute: "class", value: "modal-close-btn" },
		{ attribute: "type", value: "button" }
	]);
	const modalInfoDiv = createElement("div", null, [
		{ attribute: "class", value: "modal-info-container" }
	]);
	const image = createElement("img", null, [
		{ attribute: "id", value: "modal-img" },
		{ attribute: "class", value: "modal-img" },
		{ attribute: "src", value: "" },
		{ attribute: "alt", value: "profile picture" }
	]);
	const heading = createElement("h3", `first last`, [
		{ attribute: "id", value: "modal-name" },
		{ attribute: "class", value: "modal-name cap" }
	]);
	const modalEmailP = createElement("p", `email`, [
		{ attribute: "id", value: "modal-email" },
		{ attribute: "class", value: "modal-text" }
	]);
	const modalCityP = createElement("p", `city`, [
		{ attribute: "id", value: "modal-city" },
		{ attribute: "class", value: "modal-text cap" }
	]);
	const rule = createElement("hr");
	const modalTelP = createElement("p", `tel`, [
		{ attribute: "id", value: "modal-tel" },
		{ attribute: "class", value: "modal-text" }
	]);
	const modalFullAddressP = createElement("p", `address`, [
		{ attribute: "id", value: "modal-address" },
		{ attribute: "class", value: "modal-text" }
	]);
	const modalBirthdayP = createElement("p", `birthdate`, [
		{ attribute: "id", value: "modal-dob" },
		{ attribute: "class", value: "modal-text" }
	]);
	const modalPrevNextDiv = createElement("div", null, [
		{ attribute: "class", value: "modal-btn-container" }
	]);
	const prev = createElement("button", `Prev`, [
		{ attribute: "id", value: "modal-prev" },
		{ attribute: "class", value: "modal-prev btn" },
		{ attribute: "type", value: "button" }
	]);
	const next = createElement("button", `Next`, [
		{ attribute: "id", value: "modal-next" },
		{ attribute: "class", value: "modal-next btn" },
		{ attribute: "type", value: "button" }
	]);

	//-------------------
	// APPEND ELEMENTS --
	//-------------------

	// Append image and text areas to card
	modalDiv.append(button, modalInfoDiv, modalPrevNextDiv);
	// Append previous and next buttons to button container
	modalPrevNextDiv.append(prev, next);
	// Append header, email, and address to text container
	modalInfoDiv.append(
		image,
		heading,
		modalEmailP,
		modalCityP,
		rule,
		modalTelP,
		modalFullAddressP,
		modalBirthdayP
	);

	//------------------
	// DEFINE HANDLER --
	//------------------

	function handleModalClick(e) {
		// If the click was on the close button...
		if (e.target.id === "modal-close-button") {
			// 'close' the modal
			this.style.display = "none";
			// and exit the function
			return;
		}

		// Get the current profile's index
		const profileIndex = parseInt(
			document.getElementById("modal-div").dataset.index,
			10
		);
		// Declare a new profile variable
		let newProfile;
		// If the prev or next buttons was clicked, use the position of the current profile object to find the one before or after it. The ternary operators prevents errors when attempting to access non-existent indices, and in effect wraps the list. The previous profile from the 1st profile is the last profile. The next profile from the last profile is the first profile.
		if (e.target.id === "modal-prev") {
			newProfile = data[profileIndex - 1]
				? data[profileIndex - 1]
				: data[data.length - 1];
		} else if (e.target.id === "modal-next") {
			newProfile = data[profileIndex + 1]
				? data[profileIndex + 1]
				: data[0];
        }
        // Don't call populateModal unless the user clicks on prev or next. (The call to populateModal is outside of the e.target.id check above. That means clicking anywhere in the modal div could call populateModal if we didn't provide this check.)
		if(newProfile) populateModal(e, newProfile);
	}

	//----------------
	// ADD LISTENER --
	//----------------

	// This handler will handle the close, previous, and next events
	document
		.getElementById("modal-container")
		.addEventListener("click", handleModalClick);

	// Append card to DOM
	document
		.getElementById("modal-container")
		.append(modalDiv);
}

// On card click, populate the modal and show it
function populateModal(e, profile) {

    // Deconstruct some variables
    const { modalDiv, modalImg, modalName, modalEmail, modalCity, modalTel, modalAddress, modalDOB} = modalDOM;
	const { index, name, location, email, dob, phone, picture } = profile;
	const { street, city, state, postcode } = location;

	// Insert new profile details, after ensuring the detail is present
	function addModalData() {
		modalDiv.dataset.index = index;
		modalImg.src = picture.large
			? picture.large
			: "../images/no-image-available.png";
		modalName.textContent =
			name.first && name.last
				? name.first + " " + name.last
				: name.first || name.last;
		modalEmail.textContent = email;
		modalCity.textContent = city ? city : "";
		modalTel.textContent = phone ? phone : "";
		// Build the full address string
		let Address = "";
		if (street.number && street.name)
			Address += street.number + " " + street.name;
		if (city) Address += ", " + city;
		if (state) Address += ", " + state;
		if (postcode) Address += " " + postcode;
		modalAddress.textContent = Address;
		const DOB = new Date(dob.date);
		modalDOB.textContent = `Birthday: ${DOB.getMonth()} / ${DOB.getDate()} / ${DOB.getFullYear()}`;
	}

	addModalData();

	// Show modal
	document
		.getElementById("modal-container")
		.setAttribute("style", "display: block");
}

// SEARCH MARKUP AND FUNCTIONALITY

function generateForm() {
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

