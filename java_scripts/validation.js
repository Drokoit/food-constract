document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

     const { soup, salad, 'main-course': mainDish, drink } = order;

    // Функция для отображения уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `
            <p>${message}</p>
            <button class="close-btn">Окей &#128076;</button>
        `;
        document.body.appendChild(notification);

        // Обработчик закрытия уведомления
        notification.querySelector('.close-btn').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Проверка выбранных блюд
    if (!soup && !salad && !mainDish && !drink) {
        showNotification('Ничего не выбрано. Выберите блюда для заказа');
    } else if (!drink) {
        showNotification('Выберите напиток');
    } else if (soup && !salad && !mainDish) {
        showNotification('Выберите главное блюдо/салат/стартер');
    } else if (salad && !soup && !mainDish) {
        showNotification('Выберите суп или главное блюдо');
    } else if (drink && !mainDish) {
        showNotification('Выберите главное блюдо');
    } else {
        // Если все блюда выбраны корректно, можно отправить форму
        this.submit();
    }
});
