import data from "./data.js"
import fillNavMenu from "./fillNavMenu.js";
import createAutoScroll from "./createAutoScroll.js"
import handleItemClick from "./handleItemClick.js";
import handleTouchStart from "./handleTouchStart.js";
import handleTouchMove from "./handleTouchMove.js";

const itemsContainer = document.querySelector(".nav-wrapper"); //контейнер для пунктов меню
const itemHeight = parseInt(getComputedStyle(itemsContainer).getPropertyValue('--slider-item-height')); //высота пункта меню

let secondItem = null; //текущий второй(сверху) элемент в навигационном меню
let lastItem = null; //текущий последний(нижний) элемент в навигационном меню

let xDown = null; //для определения направления свайпа по оси x
let yDown = null; ////для определения направления свайпа по оси y

const items = fillNavMenu(data, itemsContainer); //инициализация, наполнение меню данными
const {startAutoScroll, restartScrollTimeout} = createAutoScroll(items);

items.forEach(item => {
    item.addEventListener("click", (event)=>{
        const result = handleItemClick({event, items, itemHeight});
        if(result){
            secondItem = result.secondItem;
            lastItem = result.lastItem;
        }
    },false)
})

itemsContainer.addEventListener('touchstart', (event)=>{
    restartScrollTimeout();
    const result = handleTouchStart(event);
    if(result){
        xDown = result.xDown;
        yDown = result.yDown;
    }
}, false);

itemsContainer.addEventListener('touchmove', (event)=>{
    const result = handleTouchMove({event, xDown, yDown, secondItem, lastItem});
    if(result){
        xDown = result.xDown;
        yDown = result.yDown;
    }
}, false);

items[1].dispatchEvent(new Event("click")); //Вызываем клик, чтоб не писать начальные позиции и не присваивать secondItem и lastItem
startAutoScroll(5000, 5000); //Запускаем автоскролл







