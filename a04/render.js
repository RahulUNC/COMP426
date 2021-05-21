/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Rahul Narvekar
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
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    //const firstSeen = hero.firstSeen;
    return `
    <div class = "column is-one-fifth">
        <div class = "card">
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
                <button class="button edit" style = "background-color: ${hero.backgroundColor}; color: white">Edit</button>
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
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<form class="hero">
        <div class = "hero-body">
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                    <input class="input" type="text" value="${hero.first}">
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                    <input class="input" type="text" value="${hero.last}">
                </div>
            </div>
            <div class="field">
                <label class="label">Superhero Name</label>
                <div class="control">
                    <input class = "input" type = "text" value="${hero.name}">
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class = "textarea">${hero.description}</textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Superhero Name</label>
                <div class="control">
                    <input class = "input" type = "date" min="1940-01-01" value = "19${hero.firstSeen.getYear()}-0${hero.firstSeen.getMonth()}-15"">
                </div>
            </div>                
            <button class="button" type = "submit" style = "background-color: ${hero.backgroundColor}; color: white">Save</button>
            <button class="button">Cancel</button>
        </div>            
    </form>`
    };



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    let collection = $('<div class="columns is-multiline is-mobile"/>');
    for (let i = 0; i < heroes.length; i++) {
        collection.append(renderHeroCard(heroes[i]));
    }

    // TODO: Append the hero cards to the $root element
    $root.append(collection);

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    const editedHero =  renderHeroEditForm(randomHero);

    // TODO: Append the hero edit form to the $root element
    $root.append(editedHero);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});