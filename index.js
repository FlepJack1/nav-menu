/****************************Инициализация****************************/
import data from "./data.js"
const itemContainer = document.querySelector(".list");
data.forEach(el=> {
    const element = `
        <div class="item">
            <img class="item__img" src="${el.img}" alt="${el.text}">
            <div class="item__text">${el.text}</div>
        </div>
    `
    itemContainer.insertAdjacentHTML('beforeend', element);
})
/******************************//////////////***********************************/

/****************************Событие клика****************************/
const items = document.querySelectorAll(".item");
const itemHeight = items[0].clientHeight;

let firstItem;
let secondItem;
let lastItem;

items.forEach((item, index) => {
    item.dataset.index = index.toString();
})

items.forEach(currentItem => {
    currentItem.addEventListener("click", ()=>{
        const currentItemIndex = parseInt(currentItem.dataset.index);
        if(currentItemIndex === 0) return;

        const itemsLength = items.length;

        items.forEach((item) => {
            let itemIndex = parseInt(item.dataset.index);

            if(itemIndex === currentItemIndex){
                item.dataset.index = "0";
                firstItem = item;
            }else if (itemIndex > currentItemIndex) {
                item.dataset.index = (itemIndex-currentItemIndex).toString();
            }else if (itemIndex < currentItemIndex) {
                item.dataset.index = (itemIndex - currentItemIndex + itemsLength).toString();
            }

            if(parseInt(item.dataset.index) === 1 ) secondItem = item;
            else if(parseInt(item.dataset.index) === itemsLength-1 ) lastItem = item;

            item.style.transform = `
                translateY(${parseInt(item.dataset.index) * itemHeight - item.offsetTop}px)
                translateX(${(itemsLength - 1 - parseInt(item.dataset.index)) * 20}px)
                scale(${1 - parseInt(item.dataset.index)/10})
            `
        })
    })
})
//Вызываем клик, чтоб не писать начальные позиции
items[1].dispatchEvent(new Event("click"));
/************************/////////////*************************/

/********************Автоскролл********************/
let timeout;
let interval;

const startAutoScroll = ()=>{
    timeout = setTimeout(()=>{
        let firstIndex = 0;
        let lastIndex = items.length-1;
        let currentIndex = firstIndex;
        interval = setInterval(()=>{
            items[currentIndex].dispatchEvent(new Event("click"));
            if(currentIndex === lastIndex)
                currentIndex=firstIndex-1;

            currentIndex++;
        }, 5000);
    }, 5000);
}
const stopAutoScroll = ()=>{
    clearInterval(interval);
    clearTimeout(timeout);
}
const restartScrollTimeout = ()=>{
    stopAutoScroll();
    startAutoScroll();
}

startAutoScroll();
/************************///////////////****************************/
/***********************Имитация скролла****************************/
const list = document.querySelector('.list');


let xDown = null;
let yDown = null;

const getTouches = (evt) => {
    return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
}

const handleTouchStart = (evt) => {
    restartScrollTimeout();
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

const handleTouchMove = (evt) => {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */
        } else {
            /* left swipe */
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            secondItem.dispatchEvent(new Event("click"));
        } else {
            /* down swipe */
            lastItem.dispatchEvent(new Event("click"));
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};

list.addEventListener('touchstart', handleTouchStart, false);
list.addEventListener('touchmove', handleTouchMove, false);
/**************************////////////**************************/
