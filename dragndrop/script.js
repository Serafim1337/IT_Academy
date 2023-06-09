const imagesPack = document.querySelectorAll('img');

let __zIndexGlobal = 0, __targetGlobal;

window.addEventListener('load', function (e) {
    for (let img of imagesPack) {
        img.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });

        img.addEventListener('mouseenter', function (e) {
            img.style.cursor = 'grab'
        })
        resetElementPos(img);
    }
    for (let img of imagesPack) {
        img.style.position = 'absolute';
    }
})



document.addEventListener('mousedown', function (e) {
    if (Array.from(imagesPack).includes(e.target)) {
        __targetGlobal = e.target;
        const img = __targetGlobal;

        img.style.cursor = 'grabbing'
        img.dataset.__xCord = e.pageX;
        img.dataset.__yCord = e.pageY;
        document.addEventListener('mousemove', moveHandler);
    }
})

document.addEventListener('mouseup', function (e) {
    if (Array.from(imagesPack).includes(e.target)) {
        const img = e.target;
        img.style.cursor = 'grab';
        document.removeEventListener('mousemove', moveHandler);
    }
})



function resetElementPos(element) {
    const cords = getElementCords(element);

    element.style.left = cords.left + 'px';
    element.style.top = cords.top + 'px';
}

function getElementCords(element) {
    const cords = element.getBoundingClientRect();

    const pageOffset = {
        left: window.scrollX,
        top: window.scrollY
    }

    return {
        left: cords.left + pageOffset.left,
        top: cords.top + pageOffset.top
    }
}

function moveHandler(e) {

    const currentImage = __targetGlobal;

    const cords = getElementCords(currentImage)

    const currentX = e.pageX;
    const currentY = e.pageY;

    const xDelta = currentX - currentImage.dataset.__xCord;
    const yDelta = currentY - currentImage.dataset.__yCord;

    currentImage.dataset.__xCord = currentX;
    currentImage.dataset.__yCord = currentY;

    currentImage.style.zIndex = __zIndexGlobal++;

    currentImage.style.left = cords.left + xDelta + 'px';
    currentImage.style.top = cords.top + yDelta + 'px';

}
