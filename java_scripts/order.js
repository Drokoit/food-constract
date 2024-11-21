let order = {
    soup: null,
    salad: null,
    main_dish: null,
    drink: null
};

let totalPrice = 0;

function updateOrder(type, dish) {
    order[type] = dish;
    updateOrderDisplay();
    updateTotalPrice();
    updateHiddenInputs();
}

function updateOrderDisplay() {
    const orderSection = document.getElementById('order');
    orderSection.innerHTML = '';

    let hasDishes = false;
    
    for (let type in order) {
        if (order[type]) {
            hasDishes = true;
            const dishElement = document.createElement('p');
            dishElement.textContent = `${order[type].name} - ${order[type].price} руб.`;
            orderSection.appendChild(dishElement);
        }
        else {
            const message = document.createElement('p');
            message.textContent = type === 'drink' ? "Напиток не выбран" : "Блюдо не выбрано";
            orderSection.appendChild(message);
        }
    }
    if (!hasDishes) {
        orderSection.innerHTML = '<p>Ничего не выбрано</p>';
    }
}

function updateTotalPrice() {
    totalPrice = 0;
    for (let type in order) {
        if (order[type]) {
            totalPrice += order[type].price;
        }
    }
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    totalPriceElement.textContent = totalPrice > 0 ? `Итого: ${totalPrice} руб.` : '';
}

function updateHiddenInputs() {
    for (let type in order) {
        const input = document.getElementById(`${type}Order`);
        input.value = order[type] ? order[type].name : '';
    }
}

function resetOrder() {
    order = {
        soup: null,
        salad: null,
        main_dish: null,
        drink: null
    };
    totalPrice = 0;
    updateOrderDisplay();
    updateTotalPrice();
    updateHiddenInputs();
    document.getElementById('orderForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {

    updateOrderDisplay();

    document.querySelectorAll('.dish-block').forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const dishElement = e.target.closest('.dish-item');
                const dishKeyword = dishElement.getAttribute('data-dish');
                const dish = dishes.find(d => d.keyword === dishKeyword);
                const type = dish.category;
                updateOrder(type, dish);
            }
        });
    });

    document.getElementById('resetBtn').addEventListener('click', resetOrder);
});