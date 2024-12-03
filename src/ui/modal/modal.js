export function modal() {
    const openButtons = document.querySelectorAll('[data-open-modal]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const modals = document.querySelectorAll('.modal');

    // Открытие модалки
    openButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalName = button.getAttribute('data-open-modal');
            const modal = document.querySelector(`.modal--${modalName}`);
            if (modal) {
                modal.classList.add('is-active');
                document.body.classList.add('modal-open'); // Блокирует прокрутку
            }
        });
    });

    // Закрытие модалки
    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('is-active');
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Закрытие модалки по клику на backdrop
    modals.forEach((modal) => {
        const backdrop = modal.querySelector('.modal__backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                modal.classList.remove('is-active');
                document.body.classList.remove('modal-open');
            });
        }
    });

    // Закрытие модалки по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach((modal) => modal.classList.remove('is-active'));
            document.body.classList.remove('modal-open');
        }
    });
}
