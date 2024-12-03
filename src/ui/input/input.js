// Импортируем библиотеку IMask
import IMask from 'imask';

/**
 * Настройка масок для инпутов на странице
 */
export function setupInputMasks() {
    // Маска для всех инпутов с типом tel
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {
        // Устанавливаем маску и начальное значение
        const phoneMask = IMask(input, {
            mask: '+{7} (000) 000-00-00'
        });
        if (!input.value) {
            input.value = '+7'; // Устанавливаем начальное значение, если поле пустое
        }
    });

    // Маска для всех инпутов с типом email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach((input) => {
        // Устанавливаем маску для email
        IMask(input, {
            mask: /^\S*@?\S*$/
        });
    });
}

/**
 * Показывает/скрывает кнопку очистки на основе состояния фокуса и значения инпута и очищает содержимое инпута при клике
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
