/**
 * Показывает/скрывает кнопку очистки на основе состояния фокуса и значения инпута и очищает содержимое инпута приклике
 */
export function setupClearInput() {
    // Находим все родительские блоки
    const inputContainers = document.querySelectorAll('.js-input-common');

    inputContainers.forEach((container) => {
        // Находим инпут и кнопку очистки внутри контейнера
        const input = container.querySelector('.input-common__input');
        const clearButton = container.querySelector('.js-input-common-clear-btn');

        if (input && clearButton) {
            // Показываем кнопку при фокусе на инпуте
            input.addEventListener('focus', () => {
                clearButton.classList.add('is-visible');
            });

            // Скрываем кнопку при потере фокуса, если инпут пуст
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    clearButton.classList.remove('is-visible');
                }
            });

            // Очистка инпута и скрытие кнопки при клике на кнопку очистки
            clearButton.addEventListener('click', () => {
                input.value = ''; // Очищаем содержимое инпута
                clearButton.classList.remove('is-visible'); // Скрываем кнопку очистки
                input.focus(); // Возвращаем фокус в инпут
            });
        }
    });
}

/**
 * Пример другой функции:
 */
