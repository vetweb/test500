import Choices from 'choices.js';

export function select() {
    const selectElements = document.querySelectorAll('.js-choice');

    selectElements.forEach((selectElement) => {
        const choices = new Choices(selectElement, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            position: 'auto', // Автоматическое открытие вверх или вниз
            callbackOnCreateTemplates: (template) => ({
                // Шаблон для выбранного элемента (в верхнем блоке)
                item: (classNames, data) => {
                    const itemClass = classNames.item || 'choices__item';
                    const highlightedClass = data.highlighted ? classNames.highlightedState || 'is-highlighted' : '';
                    const selectableClass = classNames.itemSelectable || '';

                    // Иконка для выбранного элемента
                    const iconHtml = `
                        <svg class="icon _custom-icon">
                            <use xlink:href="assets/img/symbol/svgsprite.svg#arrow-ic"></use>
                        </svg>
                    `;

                    return template(`
                        <div class="${itemClass} ${highlightedClass} ${selectableClass}" 
                             data-value="${data.value}" 
                             aria-selected="true">
                            ${data.label}
                            ${iconHtml}
                        </div>
                    `);
                },
                // Шаблон для элементов в выпадающем списке
                choice: (classNames, data) => {
                    const choiceClass = classNames.item || 'choices__item';
                    const choiceChoiceClass = classNames.itemChoice || 'choices__item--choice';
                    const disabledClass = data.disabled
                        ? classNames.itemDisabled || 'is-disabled'
                        : classNames.itemSelectable || 'is-selectable';

                    const iconHtml = `
                        <svg class="icon _custom-icon">
                            <use xlink:href="assets/img/symbol/svgsprite.svg#check-ic"></use>
                        </svg>
                    `;

                    return template(`
                        <div class="${choiceClass} ${choiceChoiceClass} ${disabledClass}" 
                             data-value="${data.value}" 
                             data-choice 
                             ${data.disabled ? 'aria-disabled="true"' : 'data-choice-selectable'} 
                             data-id="${data.id}">
                            ${data.label}
                            ${iconHtml}
                        </div>
                    `);
                },
            }),
        });

        // Добавляем класс для выбранного элемента
        selectElement.addEventListener('change', () => {
            const choiceItems = selectElement.closest('.choices').querySelectorAll('.choices__item--choice');

            // Убираем класс "is-chosen" со всех элементов
            choiceItems.forEach((item) => item.classList.remove('is-chosen'));

            // Находим выбранный элемент и добавляем класс
            const selectedValue = selectElement.value;
            const selectedItem = Array.from(choiceItems).find(
                (item) => item.dataset.value === selectedValue
            );

            if (selectedItem) {
                selectedItem.classList.add('is-chosen');
            }
        });

        // Устанавливаем класс на изначально выбранный элемент
        const initialSelectedValue = selectElement.value;
        const initialSelectedItem = selectElement.closest('.choices').querySelector(
            `.choices__item--choice[data-value="${initialSelectedValue}"]`
        );

        if (initialSelectedItem) {
            initialSelectedItem.classList.add('is-chosen');
        }
    });
}
