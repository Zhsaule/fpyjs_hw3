class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available;
    }
}

class GoodsList {
    #goods = [];
    filter = /./; // По умолчанию все товары
    sortPrice = false;
    sortDir = true; // true по возрастанию, false по убыванию

    get list() {
        const filteredGoods = this.#goods.filter(good => this.filter.test(good.name));
        const sortedGoods = this.sortPrice ? filteredGoods.sort((a, b) => (this.sortDir ? a.price - b.price : b.price - a.price)) : filteredGoods;
        return sortedGoods.filter(good => good.available);
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        this.#goods = this.#goods.filter(good => good.id !== id);
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    goods = [];
    get totalAmount() {
        return this.goods.reduce((total, basketGood) => total + basketGood.amount, 0);
    }

    get totalSum() {
        return this.goods.reduce((total, basketGood) => total + basketGood.amount * basketGood.price, 0);
    }

    add(good, amount) {
        const existingGood = this.goods.find(basketGood => basketGood.id === good.id);
        if (existingGood) {
            existingGood.amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    remove(good, amount) {
        const existingGood = this.goods.find(basketGood => basketGood.id === good.id);
        if (existingGood) {
            existingGood.amount -= amount;
            if (existingGood.amount <= 0) {
                this.goods = this.goods.filter(basketGood => basketGood.id !== good.id);
            }
        }
    }

    clear() {
        this.goods = [];
    }

    removeUnavailable() {
        this.goods = this.goods.filter(basketGood => basketGood.available);
    }
}
console.log('')
console.log('Проверка результатов:')
//Создание экземпляров класса товара Good
const good1 = new Good(1, 'Рубашка', 'Рубашка мужская', 'XXL', 100, true);
const good2 = new Good(2, 'Кроссовки', 'Кроссовки для бега', '43', 200, true);
const good3 = new Good(3, 'Туфли', 'Туфли женские', '38', 300, true);
const good4 = new Good(4, 'Туфли', 'Зимние, женские', '38', 400, true);
const good5 = new Good(5, 'Пальто', 'Мужское', 'XXL', 500, true);
const good6 = new Good(6, 'Шапка', 'Мужская', '62', 600, true);

//Создание экземпляра класса каталога GoodsList и корзины Basket
const goodsList = new GoodsList();
const basket = new Basket();

//Добавление товаров в каталог
goodsList.add(good1);
goodsList.add(good2);
goodsList.add(good3);
goodsList.add(good4);
goodsList.add(good5);
goodsList.add(good6);

//Проверка добавления товара
console.log('Проверка add');
console.log(goodsList.list.length);

//Удаление товара из каталога
goodsList.remove(6);

//Проверка удаления товара
console.log('Проверка remove')
console.log(goodsList.list.length);

// Установка фильтра и сортировки
goodsList.filter = /Туфли/;
goodsList.sortPrice = true;
goodsList.sortDir = false;

//Проверка фильтрации и сортировки
console.log('1.Вывод отфильтрованного и отсортированного каталога товаров:');
console.log(goodsList.list.length);
console.log(goodsList.list);

// Установка фильтра и сортировки
goodsList.filter = /Туфли/;
goodsList.sortPrice = false;
goodsList.sortDir = false;

//Проверка фильтрации и сортировки
console.log('2.Вывод отфильтрованного и без сортировки каталога товаров:');
console.log(goodsList.list.length);
console.log(goodsList.list);

//изменение признака доступности для продажи
good4.setAvailable(false)
//Проверка изменения available
console.log('Проверка изменение available')
console.log(good4);
console.log(goodsList.list.length);

// Добавление товара в корзину
console.log('Добавление товара в корзины')
basket.add(good2, 2);
basket.add(good3, 3);
basket.add(good4, 4);
basket.add(good5, 5);
console.log(basket.goods.length)

//Удаление товара из корзины
console.log('Проверка удаление товара из корзины')
basket.remove(good5, 5)
console.log(basket.goods.length)

console.log('Проверка удаление removeUnavailable из Корзины')
basket.removeUnavailable()
console.log(basket.goods.length)

//Проверка расчета Корзины 
console.log('Проверка расчета сумм Корзины:')
console.log(basket.goods)
console.log('Общее количество товара в корзине:', basket.totalAmount);
console.log('Общая сумма товара в корзине:', basket.totalSum);

//Очистка корзины
basket.clear()
console.log(basket.goods.length)
console.log('Общее количество товара в корзине:', basket.totalAmount);
console.log('Общая сумма товара в корзине:', basket.totalSum);
