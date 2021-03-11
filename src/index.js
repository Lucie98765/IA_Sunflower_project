import './styles/main.scss';

import Webgl from './webgl/Webgl';



document.querySelector('#popup').addEventListener('click', () => {
    document.querySelector('#popup').style.display = 'none'
    document.querySelector('#blue').style.display = 'none'
    const webgl = new Webgl();
    webgl.start();
})

