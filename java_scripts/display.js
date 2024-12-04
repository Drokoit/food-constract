function displayDishes() {
    
    const containers = {
        soup: document.getElementById('soup'),
        salad: document.getElementById('salad'),
        main_dish: document.getElementById('main_dish'),
        dessert: document.getElementById('dessert'),
        drink: document.getElementById('drink'),
    };

    // Сортируем блюда по имени
    dishes.sort((a, b) => a.name.localeCompare(b.name));

    // Функция для отображения всех блюд
    function renderDishes(filteredDishes) {
        Object.values(containers).forEach(container => container.innerHTML = ''); // Очистить контейнеры
        filteredDishes.forEach(dish => {
            const container = containers[dish.category.toLowerCase()];
            if (container) {
                container.appendChild(createDishElement(dish));
            }
        });
    }

    // Изначально показываем все блюда
    renderDishes(dishes);

    // Фильтры по категориям
    const filterButtons = document.querySelectorAll('.filter-btns button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Если кнопка уже активна, удаляем активный класс и показываем все блюда
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                renderDishes(dishes); // Отображаем все блюда
            } else {
                // Если кнопка не активна, добавляем класс "active" и фильтруем по kind
                filterButtons.forEach(b => b.classList.remove('active')); // Убираем класс с других кнопок
                button.classList.add('active'); // Добавляем класс текущей кнопке
                const filterKind = button.getAttribute('data-kind');
                const filteredDishes = dishes.filter(dish => dish.kind === filterKind);
                renderDishes(filteredDishes); // Отображаем отфильтрованные блюда
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
