import { setupClearInput, setupInputMasks } from '../ui/input/input.js'
import { modal } from '../ui/modal/modal.js'
import { select } from '../ui/select/select.js'
import { uiMenu } from '../ui/ui-menu/ui-menu.js'
import {  topMenu } from "./top-menu.js";
import Lenis from '@studio-freight/lenis'

window.addEventListener('load', () => {
// Инициализация Lenis для плавного скроллинга
    const lenis = new Lenis({
        duration: .8,
        easing: (t) => t * (2 - t),
        smoothWheel: true,
        smoothTouch: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    uiMenu();
    topMenu();
    select();
    setupClearInput();
    setupInputMasks();
    modal();
})