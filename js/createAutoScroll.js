const createAutoScroll = (items) => {
    let timeout; //ссылка на таймаут начала автоскролла
    let interval; //ссылка на интервал с автоскроллом

    const startAutoScroll = (timeoutDelay = 5000, intervalDelay = 5000)=>{
        if(timeout) return;
        timeout = setTimeout(()=>{
            let firstIndex = 0;
            let lastIndex = items.length-1;
            let currentIndex = firstIndex;
            interval = setInterval(()=>{
                items[currentIndex].dispatchEvent(new Event("click"));
                if(currentIndex === lastIndex)
                    currentIndex=firstIndex-1;

                currentIndex++;
            }, intervalDelay);
        }, timeoutDelay);
    }
    const stopAutoScroll = ()=>{
        clearInterval(interval);
        clearTimeout(timeout);
    }
    const restartScrollTimeout = ()=>{
        stopAutoScroll();
        startAutoScroll();
    }

    return {
        startAutoScroll,
        stopAutoScroll,
        restartScrollTimeout
    }
};

export default createAutoScroll;