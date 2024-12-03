// topMenu.js
export function topMenu() {
    const menuTrigger = document.querySelector('.js-menu-top-trigger');
    const menuContent = document.querySelector('.js-menu-top-content');
    const bodyOverlay = document.querySelector('.js-body-overlay');
    const header = document.querySelector('header'); // Предполагается, что header — родительский контейнер для меню

    if (!menuTrigger || !menuContent || !bodyOverlay || !header) {
        console.warn('Required elements for topMenu not found.');
        return;
    }

    // Функция для открытия/закрытия меню
    const toggleMenu = (isOpen) => {
        menuTrigger.classList.toggle('open', isOpen);
        menuContent.classList.toggle('open', isOpen);
        bodyOverlay.classList.toggle('open', isOpen);
    };

    // Обработчик для открытия/закрытия по клику на триггер
    const handleTriggerClick = () => {
        const isOpen = menuTrigger.classList.contains('open');
        toggleMenu(!isOpen);
    };

    // Обработчик для закрытия по клику вне меню и хедера
    const handleOutsideClick = (event) => {
        if (!header.contains(event.target) && menuTrigger.classList.contains('open')) {
            toggleMenu(false);
        }
    };
    const handleEscapePress = (event) => {
        if (event.key === 'Escape' && menuTrigger.classList.contains('open')) {
            toggleMenu(false);
        }
    };
    // Добавляем обработчики событий

    menuTrigger.addEventListener('click', handleTriggerClick);
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapePress);
}
