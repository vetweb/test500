import { setupClearInput, setupInputMasks } from '../ui/input/input.js'
import { modal } from '../ui/modal/modal.js'
import { select } from '../ui/select/select.js'
import { uiMenu } from '../ui/ui-menu/ui-menu.js'
import {  topMenu } from "./components/top-menu.js";
import {  stickyHeader } from "./components/stickyHeader.js";
import Lenis from '@studio-freight/lenis';

window.addEventListener('load', () => {
    const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => t * (2 - t),
        smoothWheel: true,
        smoothTouch: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    topMenu(lenis);
    stickyHeader();
    uiMenu();
    select();
    setupClearInput();
    setupInputMasks();
    modal();
})