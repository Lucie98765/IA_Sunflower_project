import './styles/main.scss';

import Game from './game/Game';

document.querySelector('#popup').addEventListener('click', () => {
    document.querySelector('#close').style.display = 'none'
    const game = new Game();
    game.start();
})