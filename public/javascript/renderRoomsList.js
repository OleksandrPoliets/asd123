import {createElement} from './helpers/domHelper.js';

export const renderRoomsList = (rooms) => {
    const roomPage = document.getElementById('rooms-page');
    let cardWrap = document.getElementById('cards-wrap');

    if (cardWrap) {
        cardWrap.innerHTML = '';
    } else {
        cardWrap = createElement({
            tagName: 'div',
            className: 'cars-wrap',
            attributes: {id: 'cards-wrap'}
        });
    }

    rooms.map(el => {
        if (!el.onGame && !el.isMaxPlayer) {
            const roomWraper = createElement({
                tagName: 'div',
                className: 'rooms-wrap'
            });
            const usersCount = createElement({
                tagName: 'p',
                className: 'rooms-card-user-count'
            });
            const cadrHeader = createElement({
                tagName: 'h2'
            });
            const cardBtn = createElement({
                tagName: 'button',
                className: 'join-btn',
                attributes: {id: el.roomName}
            });
            usersCount.innerText = `${el.conectedUsers.length} user conected`;
            cadrHeader.innerText = el.roomName;
            cardBtn.innerText = 'Join';

            cardWrap.appendChild(roomWraper);
            roomWraper.appendChild(usersCount);
            roomWraper.appendChild(cadrHeader);
            roomWraper.appendChild(cardBtn);
        }

    });

    roomPage.appendChild(cardWrap);

    return cardWrap;
};

export const renderTimer = () => {
    const timer  = createElement({
        tagName: 'h1',
        className: 'timer'
    });

    return timer;
}
