const imagesPack = document.querySelectorAll('img');

let __zIndexGlobal = 0;

for (let img of imagesPack) {
    img.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });

    img.addEventListener('mouseenter', function (e) {
        img.style.cursor = 'grab'
    })

    img.addEventListener('mousedown', function (e) {
        img.dataset.__xCord = e.pageX;
        img.dataset.__yCord = e.pageY;
        img.addEventListener('mousemove', moveHandler);
    })

    img.addEventListener('mouseup', function (e) {
        img.style.cursor = 'grab';
        img.removeEventListener('mousemove', moveHandler);
    })

    resetElementPos(img);
}

for (let img of imagesPack) {
    img.style.position = 'absolute';
}

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
    const currentImage = e.target;

    const cords = getElementCords(currentImage)

    const currentX = e.pageX;
    const currentY = e.pageY;

    const xDelta = currentX - currentImage.dataset.__xCord;
    const yDelta = currentY - currentImage.dataset.__yCord;

    currentImage.dataset.__xCord = currentX;
    currentImage.dataset.__yCord = currentY;

    currentImage.style.zIndex = __zIndexGlobal++;

    currentImage.style.cursor = 'grabbing'

    currentImage.style.left = cords.left + xDelta + 'px';
    currentImage.style.top = cords.top + yDelta + 'px';
}
