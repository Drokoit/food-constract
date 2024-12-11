function displayDishes() {
    
    const containers = {
        soup: document.getElementById('soup'),
        salad: document.getElementById('salad'),
        "main-course": document.getElementById('main-course'),
        dessert: document.getElementById('dessert'),
        drink: document.getElementById('drink'),
    };

    dishes.sort((a, b) => a.name.localeCompare(b.name));

    function renderDishes(filteredDishes) {
        Object.values(containers).forEach(container => container.innerHTML = ''); 
        filteredDishes.forEach(dish => {
            const container = containers[dish.category.toLowerCase()];
            if (container) {
                container.appendChild(createDishElement(dish));
            }
        });
    }

    renderDishes(dishes);

    const filterButtons = document.querySelectorAll('.filter-btns button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                renderDishes(dishes);
            } else {
                filterButtons.forEach(b => b.classList.remove('active')); 
                button.classList.add('active'); 
                const filterKind = button.getAttribute('data-kind');
                const filteredDishes = dishes.filter(dish => dish.kind === filterKind);
                renderDishes(filteredDishes); 
            }
        });
    });
}

function createDishElement(dish) {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish-item';
    dishElement.setAttribute('data-dish', dish.keyword);
    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p>${dish.name}</p>
        <p>${dish.price} руб</p>
        <p>${dish.count}</p>
        <button>Добавить</button>
    `;
    return dishElement;
}

window.addEventListener('load', displayDishes);
