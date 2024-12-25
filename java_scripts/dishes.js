// const dishes = [
//     { keyword: "borsh", name: "Борщ", price: 350, category: "soup", count: "250 гр", image: "images/борщ.jpg", kind: "meat"},
//     { keyword: "Bouillabaisse", name: "Буйабес", price: 340, category: "soup", count: "250 гр", image: "images/Bouillabaisse.jpg", kind: "fish"},
//     { keyword: "chicken_soup", name: "Куриный суп", price: 240, category: "soup", count: "250 гр", image: "images/chicken_soup.jpg" , kind: "meat"},
//     { keyword: "tomato_soup", name: "Томатный суп", price: 320, category: "soup", count: "300 гр", image: "images/Tomato_soup.jpg", kind: "veg" },
//     { keyword: "lentil_soup", name: "Суп из чечевицы", price: 300, category: "soup", count: "300 гр", image: "images/Lentil_soup.jpg" , kind: "veg"},
//     { keyword: "yha", name: "Уха", price: 280, category: "soup", count: "300 гр", image: "images/yha.jpg", kind: "fish" },
//     { keyword: "salad_with_shrimp", name: "Салат с креветками и ананасом", price: 400, category: "salad", count: "250 гр", image: "images/salad_with_shrimp.jpg", kind: "fish" },
//     { keyword: "salad_with_squid", name: "Салат с кальмаром и пекинской капустой", price: 420, category: "salad", count: "250 гр", image: "images/Salad_with_squid.jpg", kind: "fish"},
//     { keyword: "Caesar", name: "Цезарь", price: 300, category: "salad", count: "250 гр", image: "images/Caesar.jpg", kind: "veg"},
//     { keyword: "korean_salad", name: "Салат по-корейски", price: 360, category: "salad", count: "250 гр", image: "images/Korean_salad.jpg", kind: "veg" },
//     { keyword: "prince_salad", name: "Салат Принц ", price: 330, category: "salad", count: "250 гр", image: "images/PrinceSalad.jpg", kind: "meat"},
//     { keyword: "bride_salad", name: "Салат Невеста", price: 280, category: "salad", count: "250 гр", image: "images/BrideSalad.jpg", kind: "meat"},
//     { keyword: "homemade_stew", name: "Жаркое по-домашнему", price: 370, category: "main-course", count: "300 гр", image: "images/homemade_stew.jpg", kind: "meat"},
//     { keyword: "mackerel_rolls", name: "Рулетики из скумбрии", price: 220, category: "main-course", count: "200 гр", image: "images/MackerelRolls.jpg", kind: "fish"},
//     { keyword: "vegetable_stew", name: "Овощное рагу", price: 350, category: "main-course", count: "300 гр", image: "images/vegetable_stew.jpg", kind: "veg"},
//     { keyword: "fish_steak", name: "Рыбный стейк", price: 480, category: "main-course", count: "250 гр", image: "images/Fish_steak.jpg", kind: "fish"},
//     { keyword: "risotto_cutlets", name: "Котлеты с ризотто", price: 460, category: "main-course", count: "350 гр", image: "images/risotto_cutlets.jpg", kind: "meat"},
//     { keyword: "lohanorizo", name: "Лоханоризо", price: 420, category: "main-course", count: "400 гр", image: "images/lohanorizo.jpg", kind: "veg"},
//     { keyword: "lemonade", name: "Лимонад", price: 220, category: "drink", count: "340 мл", image: "images/lemonade.jpg", kind: "cold"},
//     { keyword: "orange_juice", name: "Апельсиновый сок", price: 280, category: "drink", count: "340 мл", image: "images/orange_juice.jpg", kind: "cold"},
//     { keyword: "strawberry_milkshake", name: "Клубничный коктейль", price: 230, category: "drink", count: "300 мл", image: "images/коктейль.jpg", kind: "cold"},
//     { keyword: "milkshake", name: "Молочный коктейль", price: 250, category: "drink", count: "300 мл", image: "images/milkshake.jpg", kind: "cold"},
//     { keyword: "black_tea", name: "Чёрный чай", price: 200, category: "drink", count: "350 мл", image: "images/black_tea.jpg", kind: "hot"},
//     { keyword: "coffee", name: "Кофе", price: 200, category: "drink", count: "350 мл", image: "images/coffee.jpg", kind: "hot"},
//     { keyword: "baklava", name: "Пахлава", price: 220, category: "dessert", count: "300 гр", image: "images/bahlava.jpeg", kind: "medium"},
//     { keyword: "cheesecake", name: "Чизкейк", price: 240, category: "dessert", count: "125 гр", image: "images/cheesecake.jpg", kind: "small"},
//     { keyword: "chocolate_chessecake", name: "Шоколадный Чизкейк", price: 260, category: "dessert", count: "125 гр", image: "images/chocolate_cheesecake.jpg", kind: "small"},
//     { keyword: "chocolate_cake", name: "Шоколадный торт", price: 270, category: "dessert", count: "140 гр", image: "images/chocolate_cake.jpg", kind: "small"},
//     { keyword: "donuts1", name: "Пончики (3 штуки)", price: 410, category: "dessert", count: "350 гр", image: "images/donuts.jpg", kind: "medium"},
//     { keyword: "donuts2", name: "Пончики (6 штук)", price: 650, category: "dessert", count: "700 гр", image: "images/donuts1.jpg", kind: "big"}
// ];
// Массив для хранения данных о блюдах
let dishes = [];

// Функция загрузки данных о блюдах из API
function loadDishes() {
    // URL API для получения данных о блюдах
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    // Выполнение GET-запроса к API
    fetch(apiUrl)
        .then(response => {
            // Проверка, что ответ успешен (status >= 200 && < 300)
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные с сервера');
            }
            // Преобразование ответа в JSON
            return response.json();
        })
        .then(dishesData => {
            // Сохранение полученных данных о блюдах
            dishes = dishesData;  
            // Отображение загруженных данных
            displayDishes();
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });        
}

// Событие загрузки страницы
window.addEventListener('load', () => {
    // Вызов функции загрузки данных при загрузке страницы
    loadDishes();  
});
