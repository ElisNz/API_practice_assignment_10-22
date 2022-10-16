const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php/';

Object.prototype.getByIndex = function(index) {
    return this[Object.keys(this)[index]];
}

async function getDrink() {
    

    //fetch and parse json from API

    const get = await fetch(url);
    const ourDrink = await get.json();
    const parsedDrink = ourDrink.drinks[0];
    console.log(parsedDrink);

    var image = parsedDrink.strDrinkThumb;

    //set img, name and description from object keys

    document.getElementById('drinkImg').setAttribute("src", image);
    document.getElementById('drinkName').textContent = parsedDrink.strDrink;
    document.querySelector('.description').textContent = parsedDrink.strInstructions;

    //allocate list nodes for all object keys that contain "ingredient" and != null

    let ingredientStartIndex = (Object.keys(parsedDrink)).indexOf('strIngredient1');
    let ingredientEndIndex = (Object.keys(parsedDrink)).indexOf('strIngredient15');
    for (i = 0; ingredientStartIndex <= ingredientEndIndex; i++) {
        if(parsedDrink.getByIndex(ingredientStartIndex) != null) {
            let newNode = document.createElement('li');
            newNode.append(parsedDrink.getByIndex(ingredientStartIndex++));
            document.getElementById('ingredients').appendChild(newNode);
        } else {++ingredientStartIndex;}
    }
    
    //set attributes for our drink from object keys

    const HTMLDrinkAttributes = document.querySelectorAll('.descriptionBox > h3');
    var startIndex = (Object.keys(parsedDrink)).indexOf('strAlcoholic');
    for (i = 0; i < HTMLDrinkAttributes.length; i++) {
        HTMLDrinkAttributes[i].innerHTML = parsedDrink.getByIndex(startIndex++);
    }
}

//remove any dynamically created nodes then call getDrink

function disallocateAndGetNew() { 
    let node = document.getElementById('ingredients');
    console.log('log ingredients: ' + node);
    for (child of node.children) {
        node.removeChild(child);
    } 
    console.log('log removed ingredients: ' + node);
    getDrink();
} 