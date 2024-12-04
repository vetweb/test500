export function topMenu(lenis) {
    const menuTrigger = document.querySelector('.js-menu-top-trigger');
    const menuContent = document.querySelector('.js-menu-top-content');
    const html = document.documentElement;

    if (!menuTrigger || !menuContent) {
        console.warn('Required elements for topMenu not found.');
        return;
    }

    const toggleMenu = (isOpen) => {
        menuTrigger.classList.toggle('open', isOpen);
        menuContent.classList.toggle('open', isOpen);

        if (isOpen) {
            lenis.stop(); // Останавливаем Lenis для всей страницы
            html.style.overflow = 'hidden'; // Блокируем скролл страницы
        } else {
            lenis.start(); // Восстанавливаем Lenis для страницы
            html.style.overflow = ''; // Разблокируем скролл страницы
        }
    };

    // Открытие/закрытие по клику на триггер
    menuTrigger.addEventListener('click', () => {
        const isOpen = menuTrigger.classList.contains('open');
        toggleMenu(!isOpen);
    });

    // Закрытие меню по нажатию на Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuTrigger.classList.contains('open')) {
            toggleMenu(false);
        }
    });
}
