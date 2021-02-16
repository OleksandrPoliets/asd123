const roomPage = document.getElementById('rooms-page');
const game = document.getElementById('game-page');
export const setVisibilityRooms = () => {
    roomPage.classList.toggle('display-none');
};
export const setVisibilityFame = () => {
    game.classList.toggle('display-none');
};
