const handleItemClick = (event, items, itemHeight)=>{
    let secondItem;
    let lastItem;
    const currentItem = event.currentTarget;
    const currentItemIndex = parseInt(currentItem.dataset.index);
    if(currentItemIndex === 0) return;

    const itemsLength = items.length;

    items.forEach((item) => {
        let itemIndex = parseInt(item.dataset.index);

        if(itemIndex === currentItemIndex){
            item.dataset.index = "0";
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
    return {secondItem, lastItem};
}

export default handleItemClick;