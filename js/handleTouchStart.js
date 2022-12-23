const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    const xDown = firstTouch.clientX;
    const yDown = firstTouch.clientY;
    return {xDown, yDown};
};

export default handleTouchStart;