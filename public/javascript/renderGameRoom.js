import { createElement } from './helpers/domHelper.js';

export const renderusersColumn = roomName => {
    const gamePage = document.getElementById('game-page');
    const gameWrap = createElement({
        tagName: 'div',
        className: 'game-window'
    });

    const infoWrap = createElement({
        tagName: 'div',
        className: 'info-wrap',
        attributes: {id: 'info-wrap'}
    });

    const gameHeader = createElement({
        tagName: 'h2'
    });

    const leaveBtn = createElement({
        tagName: 'button',
        className: 'back-btn',
        attributes: {id: 'back-to-rooms'}
    });
    gameHeader.innerText = roomName;
    leaveBtn.innerText = 'Back to rooms';
    gameWrap.appendChild(infoWrap);
    infoWrap.appendChild(gameHeader);
    infoWrap.appendChild(leaveBtn);
    gamePage.appendChild(gameWrap);

    return infoWrap;
};

export const renderUserInfo = (user, you) => {
    const userId = user.userName.split(' ').join('');
    const userWrap = createElement({
        tagName: 'div',
        className: 'user',
        attributes: {id: `${userId}-info`}
    });

    const infoWrap = createElement({
        tagName: 'div',
        className: 'users-info-wrap'
    });

    const userStatus = createElement({
        tagName: 'div',
        className: `ready ${user.userIsReady ? 'green' : 'red'}`,
        attributes: {id: `${userId}-status`}
    });

    const userName = createElement({
        tagName: 'span'
    });
    const userProgresWrap = createElement({
        tagName: 'div',
        className: 'user-progres-wrap'
    });

    const progres = createElement({
        tagName: 'div',
        attributes: {id: `${userId}-progres`}
    });

    userName.innerText = `${user.userName} ${you ? '-you' : ''}`;
    infoWrap.appendChild(userStatus);
    infoWrap.appendChild(userName);
    userProgresWrap.appendChild(progres);
    userWrap.appendChild(infoWrap);
    userWrap.appendChild(userProgresWrap);

    return userWrap;
};

export const renderGameText = () => {
    const gameWindow = document.querySelector('.game-window');
    const textWrap = createElement({
        tagName: 'div',
        className: 'text-wrap'
    });

    const gameInfo = createElement({
        tagName: 'div',
        className: 'game-info'
    });

    const errors = createElement({
        tagName: 'span',
        attributes: {id: 'wrong-leters'}
    });
    const speed = createElement({
        tagName: 'span',
        attributes: {id: 'type-speed'}
    });
    const timer = createElement({
        tagName: 'span',
        attributes: {id: 'game-timer'}
    });

    const text = createElement({
        tagName: 'div',
        className: 'game-text'
    });

    const redyBtn = createElement({
        tagName: 'button',
        className: 'ready-btn',
        attributes: {id: 'ready-btn'}
    });
    redyBtn.innerText = 'Ready';
    errors.innerText = 'Wrong leter - 0';
    speed.innerText = 'Type Speed - 0';
    timer.innerText = '60 seconds left';

    gameInfo.appendChild(errors);
    gameInfo.appendChild(speed);
    gameInfo.appendChild(timer);
    textWrap.appendChild(gameInfo);
    text.appendChild(redyBtn);
    textWrap.appendChild(text);
    gameWindow.appendChild(textWrap);
};
