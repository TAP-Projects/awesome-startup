// HELPER FUNCTIONS

// FUNCTION createElement ================================================
// createElement takes an element type (as a string), optional text content (as a string), and optional attributes and their values (as an array of objects wherein each object is an attribute/value pair), creates the element, sets the text, sets the attributes, and returns the element
export function createElement(element, text, attributes) {
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

// FUNCTION fetchData =====================================================
// fetchData takes a url string and returns a promise containing the parsed data fetched from the given URL
export function fetchData(url) {
	return fetch(url)
		.then(checkStatus)
		.then(res => res.json())
		.catch(error => console.log("Looks like there was a problem!", error));
}

// FUNCTION checkStatus ====================================================
// checkStatus takes a promise of fetched data, if the response is 'OK'. Otherwise it reject's the promise, returning a new error with the response status text.
function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}


// indexData takes the resolved parsed json and an empty holder. It stores its results property in the holder. It iterates over the holder, adding an index to each object in the results array
export function indexData(json) {
	// Set data to parsed results
	json.results.forEach((item, index) => (item.index = index));
	return json.results;
}
