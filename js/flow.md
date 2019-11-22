Here's the flow:

- When the page loads
    -- app.js generates the HTML for the search form and the detail modal
        --- generateForm()
        --- generateModal()
    -- app.js hides the modal container
    -- app.js fetches the data, and then() generates and displays the profile cards
        --- fetchData() fetches the profile data from randomuser.me
        --- displayProfiles() calls generateCard() on each profile object
        --- displayProfiles() adds an event listener to each card, which when clicked calls populateModal()

- When the user clicks a profile card
    -- populateModal() receives, along with the event object, either an object or a string containing an email address. 
        --- If populateModal receives an object, it populates the modal with the data contained in the object and then displays the modal
        --- If populateModal receives a string, it uses the string to filter on the 'data' object that contains the profile data, returning only the profile object that has the matching email. It then uses that object to populate the modal and display it.
