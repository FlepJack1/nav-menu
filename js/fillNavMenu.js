/*******************************
const data = [
    {id: 0, img: "./assets/parking.svg", text: "Парковая зона" },...
]
*******************************/
const fillNavMenu = (data, container) => {
    //index - необходим для перемещения элементов, на его основе рассчитывается анимация
    data.forEach((el, index)=> {
        const element = `
            <div class="item" data-index="${index}">
            
                ${el.img && `<img class="item__img" src="${el.img}" alt="${el.text || "картинка"}">`}
                
                ${el.text && `<div class="item__text">${el.text}</div>`}
                
            </div>
        `
        container.insertAdjacentHTML('beforeend', element);
    })
    return [...container.children];
}

export default fillNavMenu;

