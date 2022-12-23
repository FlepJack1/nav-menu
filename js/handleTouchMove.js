const handleTouchMove = ({event, xDown, yDown, secondItem, lastItem}) => {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;

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
    return {xDown, yDown};
};

export default handleTouchMove;
