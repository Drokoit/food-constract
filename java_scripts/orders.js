const API_KEY = '43fc4171-9feb-433b-a328-477a7efd24c3';
const API_URL = 'http://lab8-api.std-900.ist.mospolytech.ru/labs/api/orders';
const DISHES_API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
let allDishes = []; // Добавляем глобальную переменную для хранения всех блюд

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes(); // Сначала загружаем блюда
    loadOrders();
    setupModalListeners();
});

// Добавляем функцию загрузки блюд
async function loadDishes() {
    try {
        const response = await fetch(DISHES_API_URL);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке списка блюд');
        }
        allDishes = await response.json();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке заказов');
        }
        const orders = await response.json();
        displayOrders(orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    orders.forEach((order, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatDate(order.created_at)}</td>
            <td>${formatOrderItems(order)}</td>
            <td>${calculateTotal(order)}₽</td>
            <td>${formatDeliveryTime(order)}</td>
            <td class="action-buttons">
                <button onclick="showOrderDetails(${order.id})">👁️</button>
                <button onclick="showEditOrder(${order.id})">✏️</button>
                <button onclick="showDeleteConfirmation(${order.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Дата не указана';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatOrderItems(order) {
    const items = [];
    
    // Проверяем каждый тип блюда и находим его название
    const orderItems = {
        soup_id: order.soup_id,
        main_course_id: order.main_course_id,
        salad_id: order.salad_id,
        drink_id: order.drink_id,
        dessert_id: order.dessert_id
    };

    // Для каждого существующего ID находим соответствующее блюдо и добавляем его название
    for (const [key, id] of Object.entries(orderItems)) {
        if (id) {
            const dish = allDishes.find(dish => dish.id === parseInt(id));
            if (dish) {
                items.push(dish.name);
            }
        }
    }

    return items.join(', ') || 'Нет выбранных блюд';
}

function calculateTotal(order) {
    let total = 0;
    
    // Проверяем каждый тип блюда
    const orderItems = {
        soup_id: order.soup_id,
        main_course_id: order.main_course_id,
        salad_id: order.salad_id,
        drink_id: order.drink_id,
        dessert_id: order.dessert_id
    };

    // Для каждого существующего ID находим соответствующее блюдо и добавляем его цену
    for (const [key, id] of Object.entries(orderItems)) {
        if (id) {
            const dish = allDishes.find(dish => dish.id === parseInt(id));
            if (dish) {
                total += dish.price;
            }
        }
    }

    return total;
}

function formatDeliveryTime(order) {
    return order.delivery_type === 'by_time' 
        ? order.delivery_time 
        : 'В течение дня (с 7:00 до 23:00)';
}

async function showOrderDetails(orderId) {
    try {
        const response = await fetch(`${API_URL}/${orderId}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка при загрузке данных заказа');
        const order = await response.json();

        const modal = document.getElementById('orderDetailsModal');
        const content = document.getElementById('orderDetailsContent');
        
        // Обновляем разметку содержимого модального окна
        content.innerHTML = `
            <div>
                <strong>Дата оформления</strong>
                <p>${formatDate(order.created_at)}</p>
            </div>
            
            <h3 class="order-details">Информация о доставке</h3>
            <div>
                <strong>Имя получателя</strong>
                <p>${order.full_name}</p>
            </div>
            <div>
                <strong>Адрес доставки</strong>
                <p>${order.delivery_address}</p>
            </div>
            <div>
                <strong>Время доставки</strong>
                <p>${formatDeliveryTime(order)}</p>
            </div>
            <div>
                <strong>Телефон</strong>
                <p>${order.phone}</p>
            </div>
            <div>
                <strong>Email</strong>
                <p>${order.email}</p>
            </div>
            
            <h4>Комментарий</h4>
            <p>${order.comment || 'Нет комментария'}</p>
            
            <h4>Состав заказа</h4>
            ${formatDetailedOrderItems(order)}
            
            <div>
                <strong>Стоимость: ${calculateTotal(order)}₽</strong>
            </div>
        `;
        modal.style.display = 'block';
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Обновляем функцию форматирования состава заказа
function formatDetailedOrderItems(order) {
    const items = [];
    const orderItems = {
        soup_id: { id: order.soup_id, label: 'Суп' },
        main_course_id: { id: order.main_course_id, label: 'Основное блюдо' },
        salad_id: { id: order.salad_id, label: 'Салат' },
        drink_id: { id: order.drink_id, label: 'Напиток' },
        dessert_id: { id: order.dessert_id, label: 'Десерт' }
    };

    for (const [key, value] of Object.entries(orderItems)) {
        if (value.id) {
            const dish = allDishes.find(dish => dish.id === parseInt(value.id));
            if (dish) {
                items.push(`<div>
                    <strong>${dish.name}</strong>
                    <p>${dish.price}₽</p>
                </div>`);
            }
        }
    }

    return items.join('') || '<p>Нет выбранных блюд</p>';
}

async function showEditOrder(orderId) {
    try {
        const response = await fetch(`${API_URL}/${orderId}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Ошибка при загрузке данных заказа');
        const order = await response.json();

        const form = document.getElementById('editOrderForm');
        form.innerHTML = `
            <input type="hidden" name="id" value="${order.id}">
            <div class="form-group">
                <label>ФИО:</label>
                <input type="text" name="full_name" value="${order.full_name}" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" value="${order.email}" required>
            </div>
            <div class="form-group">
                <label>Телефон:</label>
                <input type="tel" name="phone" value="${order.phone}" required>
            </div>
            <div class="form-group">
                <label>Адрес доставки:</label>
                <input type="text" name="delivery_address" value="${order.delivery_address}" required>
            </div>
            <div class="form-group">
                <label>Тип доставки:</label>
                <select name="delivery_type">
                    <option value="now" ${order.delivery_type === 'now' ? 'selected' : ''}>Как можно скорее</option>
                    <option value="by_time" ${order.delivery_type === 'by_time' ? 'selected' : ''}>К указанному времени</option>
                </select>
            </div>
            <div class="form-group" id="timeGroup" style="display: ${order.delivery_type === 'by_time' ? 'block' : 'none'}">
                <label>Время доставки:</label>
                <input type="time" name="delivery_time" value="${order.delivery_time || ''}" min="07:00" max="23:00">
            </div>
            <div class="form-group">
                <label>Комментарий:</label>
                <textarea name="comment">${order.comment || ''}</textarea>
            </div>
        `;

        const modal = document.getElementById('orderEditModal');
        modal.style.display = 'block';

        // Обработчик изменения типа доставки
        const deliveryTypeSelect = form.querySelector('[name="delivery_type"]');
        const timeGroup = form.querySelector('#timeGroup');
        deliveryTypeSelect.addEventListener('change', (e) => {
            timeGroup.style.display = e.target.value === 'by_time' ? 'block' : 'none';
        });
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function showDeleteConfirmation(orderId) {
    const modal = document.getElementById('orderDeleteModal');
    modal.dataset.orderId = orderId;
    modal.style.display = 'block';
}

function setupModalListeners() {
    // Закрытие модальных окон
    document.querySelectorAll('.modal .close, .modal .cancel-button, .modal .ok-button').forEach(element => {
        element.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        });
    });

    // Обработка редактирования
    document.querySelector('#orderEditModal .save-button').addEventListener('click', async () => {
        const form = document.getElementById('editOrderForm');
        const formData = new FormData(form);
        const orderId = formData.get('id');

        try {
            const response = await fetch(`${API_URL}/${orderId}?api_key=${API_KEY}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) throw new Error('Ошибка при сохранении изменений');

            showNotification('Заказ успешно обновлен');
            document.getElementById('orderEditModal').style.display = 'none';
            loadOrders();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    // Обработка удаления
    document.querySelector('#orderDeleteModal .delete-button').addEventListener('click', async () => {
        const modal = document.getElementById('orderDeleteModal');
        const orderId = modal.dataset.orderId;

        try {
            const response = await fetch(`${API_URL}/${orderId}?api_key=${API_KEY}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Ошибка при удалении заказа');

            showNotification('Заказ успешно удален');
            modal.style.display = 'none';
            loadOrders();
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 