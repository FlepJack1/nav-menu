const handleItemClick = ({event, items, itemHeight})=>{
    let secondItem;
    let lastItem;
    const currentItem = event.currentTarget;
    const currentItemIndex = parseInt(currentItem.dataset.index);
    if(currentItemIndex === 0) return;

    const itemsLength = items.length;

    items.forEach((item) => {
        let itemIndex = parseInt(item.dataset.index);

        //Логика обновления index-ов, имитирующая передвижение по кругу
        if (itemIndex > currentItemIndex) {
            itemIndex = itemIndex-currentItemIndex;
        }else if (itemIndex < currentItemIndex) {
            itemIndex = itemIndex - currentItemIndex + itemsLength;
        }else if(itemIndex === currentItemIndex) {
            itemIndex = 0;
        }

        //Установка новых последнего и предпоследнего элементов
        if(itemIndex === 1 ) secondItem = item;
        else if(itemIndex === itemsLength-1 ) lastItem = item;

        //Обновление dom
        item.dataset.index = itemIndex.toString();
        item.style.transform = `
            translateY(${itemIndex * itemHeight}px)
            translateX(${(itemsLength - 1 - itemIndex) * 20}px)
            scale(${1 - itemIndex/10})
        `
    })
    return {secondItem, lastItem};
}

export default handleItemClick;