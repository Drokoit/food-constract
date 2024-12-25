// Функция отображения блюд
function displayDishes() {    
    // Объект контейнеров для разных категорий блюд
    const containers = {
        soup: document.getElementById('soup'),
        salad: document.getElementById('salad'),
        "main-course": document.getElementById('main-course'),
        dessert: document.getElementById('dessert'),
        drink: document.getElementById('drink'),
    };

    // Внутренняя функция для рендеринга блюд
    function renderDishes(filteredDishes) {
        // Очищаем все контейнеры перед рендерингом
        Object.values(containers).forEach(container => container.innerHTML = ''); 
        // Рендерим каждый фильтрованный рецепт
        filteredDishes.forEach(dish => {
            const container = containers[dish.category.toLowerCase()];
            if (container) {
                container.appendChild(createDishElement(dish));
            }
        });
    }

    // Вызываем функцию рендеринга с исходным списком блюд
    renderDishes(dishes);
}

// Внутренняя функция создания элемента блюда
function createDishElement(dish) {
    // Создаем новый div для блюда
    const dishElement = document.createElement('div');
    // Присваиваем класс для стилизации
    dishElement.className = 'dish-item';
    // Добавляем атрибуты для идентификации блюда
    dishElement.setAttribute('data-kind', dish.kind.toLowerCase()); 
    dishElement.setAttribute('data-dish', dish.keyword);  
    // Создаем HTML-структуру элемента блюда
    dishElement.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p>${dish.name}</p>
        <p>${dish.price} руб</p>
        <p>${dish.count}</p>
        <button>Добавить</button>
    `;
    return dishElement;
}


document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Добавляем обработчик клика для каждой кнопки фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const section = button.closest('section');
            const dishes  = section.querySelectorAll('.dish-item');  
            
            // Логика для переключения активности кнопки фильтра
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                dishes.forEach(dish => dish.style.display = 'flex'); 
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Фильтруем и отображаем только нужные блюда
                dishes.forEach(dish => {
                    if (dish.getAttribute('data-kind') === kind) {
                        dish.style.display = 'flex';
                    } else {
                        dish.style.display = 'none';
                    }
                });
            }
        });
    });
});

// Добавляем обработчик события загрузки окна
window.addEventListener('load', displayDishes);
