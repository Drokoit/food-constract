function displayDishes() {
    const soupContainer = document.getElementById('soup');
    const saladContainer = document.getElementById('salad');
    const mainDishContainer = document.getElementById('main_dish');
    const drinkContainer = document.getElementById('drink');

    if (!dishes || dishes.length === 0) {
        console.error('Массив dishes пуст или не определен');
        return;
    }
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

    sortedDishes.forEach(dish => {
        switch (dish.category.toLowerCase()) {
            case 'soup':
                soupContainer.appendChild(createDishElement(dish));
                break;
            case 'salad':
                saladContainer.appendChild(createDishElement(dish));
                break;
            case 'main_dish':
                mainDishContainer.appendChild(createDishElement(dish));
                break;
            case 'drink':
                drinkContainer.appendChild(createDishElement(dish));
                break;
        }
    });
}

function createDishElement(dish) {
    const dishElement = document.createElement('div');
    dishElement.className = 'dish-item';
    dishElement.setAttribute('data-dish', dish.keyword)
    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p>${dish.name}</p>
        <p>${dish.price} руб</p>
        <p>${dish.count}</p>
        <button>Добавить</button>
    `;
    return dishElement;
}

// Инициализация отображения блюд при загрузке страницы
window.addEventListener('load', displayDishes);
