// Объект для хранения заказа
let order = {
    soup: null,
    salad: null,
    "main-course": null,
    dessert: null,
    drink: null
};

// Словарь с названиями категорий блюд на русском языке
let categoryName = {
    soup: "Суп",
    salad: "Салат",
    "": "Главное блюдо",
    dessert: "Десерт",
    drink: "Напиток"
} 

// Переменная для хранения общей суммы заказа
let totalPrice = 0;

// Функция обновления заказа
function updateOrder(type, dish) {
    // Обновляем объект заказа
    order[type] = dish;
    updateOrderDisplay();
    updateTotalPrice();
    updateHiddenInputs();
}

// Функция обновления отображения заказа
function updateOrderDisplay() {
    // Получаем элемент секции заказа
    const orderSection = document.getElementById('order');
    orderSection.innerHTML = '';

    let hasDishes = false;
    
    // Итерируемся по всем типам блюд в объекте заказа
    for (let type in order) {
        if (order[type]) {
            hasDishes = true;
            // Создаем заголовок категории
            const catName = document.createElement('b')
            catName.textContent = categoryName[type];
            orderSection.appendChild(catName)
            // Создаем элемент с названием и ценой блюда
            const dishElement = document.createElement('p');
            dishElement.textContent = `${order[type].name} - ${order[type].price} руб.`;
            orderSection.appendChild(dishElement);
        } else {
            // Если блюдо не выбрано, показываем сообщение
            const catName = document.createElement('b')
            catName.textContent = categoryName[type];
            orderSection.appendChild(catName)
            const message = document.createElement('p');
            message.textContent = type === 'drink' ? "Напиток не выбран" : "Блюдо не выбрано";
            orderSection.appendChild(message);
        }
    }
    // Если нет блюд в заказе, отображаем сообщение об этом
    if (!hasDishes) {
        orderSection.innerHTML = '<p>Ничего не выбрано</p>';
    }
}

// Функция обновления общей суммы заказа
function updateTotalPrice() {
    totalPrice = 0;
    // Суммируем цены всех выбранных блюд
    for (let type in order) {
        if (order[type]) {
            totalPrice += order[type].price;
        }
    }
    // Обновляем отображение общей суммы
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    totalPriceElement.innerHTML = totalPrice > 0 ? `<b>Итого: ${totalPrice} руб.</b>` : '';
}

// Функция обновления скрытых полей ввода
function updateHiddenInputs() {
    // Итерируемся по всем типам блюд
    for (let type in order) {
        // Находим соответствующий скрытый элемент ввода
        const input = document.getElementById(`${type}Order`);
        // Устанавливаем значение поля из объекта заказа
        input.value = order[type] ? order[type].name : '';
    }
}

// Функция сброса заказа
function resetOrder() {
    // Сбрасываем объект заказа
    order = {
        soup: null,
        salad: null,
        "main-course": null,
        dessert: null,
        drink: null
    };
    // Сбрасываем общую сумму заказа
    totalPrice = 0;
    // Обновляем отображение заказа
    updateOrderDisplay();
    // Обновляем общую сумму заказа
    updateTotalPrice();
    // Сбрасываем форму заказа
    document.getElementById('orderForm').reset();
}

// Добавляем обработчик событий при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {

    // Инициализируем отображение заказа
    updateOrderDisplay();

    // Находим все блоки блюд и добавляем к ним обработчики кликов
    document.querySelectorAll('.dish-block').forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const dishElement = e.target.closest('.dish-item');
                const dishKeyword = dishElement.getAttribute('data-dish');
                const dish = dishes.find(d => d.keyword === dishKeyword);
                const type = dish.category;
                // Обновляем заказ выбранным блюдом
                updateOrder(type, dish);
            }
        });
    });

    // Добавляем обработчик сброса заказа
    document.getElementById('resetBtn').addEventListener('click', resetOrder);
});
