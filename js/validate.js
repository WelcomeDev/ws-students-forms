const requiredFields = ['phone', 'last-name', 'first-name', 'email'];
const PHONE_PATTERN = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
const NAME_PATTERN = /^[А-Яа-я]{2,}$/;
const patternsFields = {
    'last-name': {
        pattern: NAME_PATTERN,
        errorMessage: 'Second name must include characters only'
    },
    'first-name': {
        pattern: NAME_PATTERN,
        errorMessage: 'Name must include characters only'
    },
    'phone': {
        pattern: PHONE_PATTERN,
        errorMessage: 'Invalid phone number'
    }
};

window.addEventListener('load', () => {
    const inputs = Array.from(document.querySelectorAll('#applicant-form input'));
    const VALIDATION_MESSAGE_ATTRIBUTE = 'data-pattern-error';

    function setValidation(inputs) {
        inputs.filter(input => requiredFields.includes(input.name))
            .forEach(input => input.required = true);

        // не очень очевидная проверка, но если взять поле, которого в объекте нет, то вернется undefined, что даст false
        inputs.filter(input => patternsFields[input.name])
            .forEach(input => {
                const inputValidation = patternsFields[input.name];
                // устаналиваем в паттерн свойство source объекта "типа" RegExp, чтобы валидация была адекватная
                input.pattern = inputValidation.pattern.source;
                // а вот тут мы нагло устанавливаем атрибут с сообщением об ошибке, потом мы его будем выводить в сообщение
                input.setAttribute(VALIDATION_MESSAGE_ATTRIBUTE, inputValidation.errorMessage);
            });
    }

    const errors = {

    };

    function validate(inputEvent) {
        const input = inputEvent.target;
        const inputValue = input.value;
        const inputErorr = errors[input.name];

        const isEmpty = input.required && !inputValue;
        const invalidData = input.pattern && !RegExp(input.pattern).test(inputValue);
        // "хитрая" проверка валидации - сработает тот case который удовлетворяет условие первым
        switch (true) {
            case isEmpty:
                createError('This field is required');
                break;
            case invalidData:
                createError(input.getAttribute(VALIDATION_MESSAGE_ATTRIBUTE));
                break;
            default:
                inputErorr?.remove();
                errors[input.name] = null;
                break;
        }

        function createError(text) {
            // создаем новый элемент, если нету ошибки
            const errorElement = errors[input.name] ?? document.createElement('p');
            // обновляем сообщение
            errorElement.innerText = text;

            // если элемент уже есть, нам больше ничего не нужно делать, выходим
            if (errors[input.name]) return;

            errorElement.classList.add('input-error');
            input.parentNode.appendChild(errorElement);
            errors[input.name] = errorElement;
        }
    }

    setValidation(inputs);
    inputs.forEach(input => input.addEventListener('blur', validate));
});