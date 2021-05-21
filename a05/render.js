/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    //const firstSeen = hero.firstSeen;
    return `
    <div class = "column is-one-fifth" id="card-${hero.id}">
        <div class = "card">
            <div id="hero-${hero.id}">
                <div class="card-image" style = "color: ${hero.color}">
                    <figure class = "image is-100x100">
                        <img src="${hero.img}">
                    </figure>
                </div>
                <div class = "card-content">
                    <div class = "content">
                        <p class = "title is-3">${hero.name}</p>                    
                        <span class = "is-italic" style = "color: ${hero.backgroundColor}">${hero.subtitle}</span>
                        <p class = "subtitle is-5">${hero.first + ' ' + hero.last}</p>
                        <p style="max-height: 100px; overflow-y: scroll">${hero.description}</p>
                        <p>First Seen: ${months[hero.firstSeen.getMonth()] + ', 19' + hero.firstSeen.getYear()}</p> 
                    </div>
                    <button id ="${hero.id}" class= "button edit" style = "background-color: ${hero.backgroundColor}; color: white">Edit</button>
                </div>
            </div>
        </div>
    </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    return `<form class="hero" id = "hero-form-${hero.id}">
        <div class = "hero-body">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input id="first" class="input" type="text" value="${hero.first}">
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input id="last" class="input" type="text" value="${hero.last}">
                </div>
            </div>
            <div class="field">
                <label class="label">Superhero Name</label>
                <div class="control">
                    <input id="name" class = "input" type = "text" value="${hero.name}">
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea id = "description" class = "textarea">${hero.description}</textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">First Introduced</label>
                <div class="control">
                    <input id="firstSeen" class = "input" type = "date" min="1940-01-01" value = "19${hero.firstSeen.getYear()}-0${hero.firstSeen.getMonth()}-15">
                </div>
            </div>                
            <button class="button" hero-id = "${hero.id}" id = "submit" type = "submit" style = "background-color: ${hero.backgroundColor}; color: white">Save</button>
            <button class="button" hero-id = "${hero.id}" id = "cancel">Cancel</button>
        </div>            
    </form>`
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    $('#hero-' + event.target.getAttribute("id")).replaceWith(renderHeroEditForm(heroicData.find(hero => hero.id == event.target.getAttribute("id"))));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault();
    let recreate = heroicData.find(hero => hero.id == event.target.getAttribute("hero-id"));
    $('#card-' + event.target.getAttribute("hero-id")).replaceWith(renderHeroCard(recreate));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    console.log('form');
    let toUpdate = heroicData.find(hero => hero.id == event.target.getAttribute("hero-id"));
    let fullDate =  $('#firstSeen').val();
    toUpdate.name = $('#name').val();
    toUpdate.first = $('#first').val();
    toUpdate.last = $('#last').val();
    toUpdate.description = $('#description').val();
    toUpdate.firstSeen = new Date(fullDate.substring(0,4), fullDate.substring(5,7))
    $('#card-' + event.target.getAttribute("hero-id")).replaceWith(renderHeroCard(toUpdate));

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let collection = $('<div class="columns is-multiline is-mobile"/>');
    for (let i = 0; i < heroes.length; i++) {
        collection.append(renderHeroCard(heroes[i]));
    }

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    $root.append(collection);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '.edit', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '#submit', handleEditFormSubmit);


    // TODO: Use jQuery to add hand leCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '#cancel', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
