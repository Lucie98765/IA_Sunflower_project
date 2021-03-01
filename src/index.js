import './styles/main.scss';

import Webgl from './webgl/Webgl';

const webgl = new Webgl();

document.querySelector('#popup').addEventListener('click', () => {
    document.querySelector('#popup').style.display = 'none'
    document.querySelector('#blue').style.display = 'none'
    webgl.start();
})

