export function uiMenu() {
    const menu = document.querySelector('.js-ui-menu-list'); // Родительский элемент меню
    const menuItems = document.querySelectorAll('.js-ui-menu-item'); // Пункты меню
    const header = document.querySelector('.ui__header'); // Элемент header

    if (!menu || menuItems.length === 0 || !header) return;

    // Получаем высоту header
    const headerHeight = header.offsetHeight;

    // Функция для сброса активных классов
    const clearActiveClasses = () => {
        menuItems.forEach((item) => item.classList.remove('active'));
    };

    // Обработчик кликов по пунктам меню
    menu.addEventListener('click', (event) => {
        const menuItem = event.target.closest('.js-ui-menu-item');

        if (menuItem) {
            const targetId = menuItem.dataset.target; // ID секции
            const targetElement = document.getElementById(targetId); // Целевая секция

            if (targetElement) {
                // Плавный скролл до секции с учётом header
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });

                // Устанавливаем active для выбранного пункта меню
                clearActiveClasses();
                menuItem.classList.add('active');
            }
        }
    });

    // Обновление active при скролле
    const updateActiveOnScroll = () => {
        const scrollPosition = window.scrollY + headerHeight; // Добавляем высоту header, чтобы учесть его при скролле

        let activeFound = false; // Флаг для проверки, нашли ли активную секцию

        menuItems.forEach((item) => {
            const targetId = item.dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const sectionTop = targetElement.offsetTop; // Позиция секции от верха
                const sectionHeight = targetElement.offsetHeight; // Высота секции

                // Проверяем, находится ли текущая позиция скролла внутри секции
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && !activeFound) {
                    clearActiveClasses(); // Сбрасываем все active
                    item.classList.add('active'); // Добавляем активный класс текущему пункту
                    activeFound = true; // Устанавливаем флаг, чтобы не добавлять активный класс нескольким пунктам
                }
            }
        });
    };

    // Добавляем обработчик скролла
    window.addEventListener('scroll', updateActiveOnScroll);

    // Вызываем обновление активного пункта сразу при загрузке, чтобы не было активных классов в начале
    updateActiveOnScroll();
}
