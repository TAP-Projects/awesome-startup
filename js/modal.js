// The modal markup and functionality
import { data, modalDOM } from "./app.js";
import { createElement } from "./helpers.js";

export function generateModal() {
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
		{ attribute: "src", value: "https://placeholder.it/125x125" },
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
export function populateModal(e, result) {

    // Deconstruct some variables
    const { modalDiv, modalImg, modalName, modalEmail, modalCity, modalTel, modalAddress, modalDOB} = modalDOM;
	const { index, name, location, email, dob, phone, picture } = result;
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
