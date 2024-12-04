export function stickyHeader() {
    const header = document.querySelector('.js-header'); // Элемент header

    if (!header) return;

    // Задаем начальные стили для header
    const setInitialStyles = () => {
        header.style.position = 'sticky';
        header.style.top = '0'; // Хедер будет фиксирован при достижении верхней части экрана
        header.style.transition = 'top 0.3s ease'; // Плавный переход для top
    };

    // Обработчик скролла
    const handleScroll = () => {
        const headerHeight = header.offsetHeight; // Высота хедера
        const scrollTop = window.scrollY || document.documentElement.scrollTop; // Позиция скролла

        // Проверяем, если скроллим вниз и достигли верхней границы хедера
        if (scrollTop > headerHeight) {
            // Плавно "закрепляем" хедер
            header.style.top = '0';
        } else {
            // При скролле вверх возвращаем хедер
            header.style.top = `${-headerHeight}px`;
        }
    };

    // Инициализация стилей и обработчиков
    setInitialStyles();
    window.addEventListener('scroll', handleScroll);
}
