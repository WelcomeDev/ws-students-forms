const requiredFields = ['phone', 'last-name', 'first-name', 'email'];
const PHONE_PATTERN = /\+7\(\d{3}\)\d{3}-\d{2}\d{2}/;
const NAME_PATTERN = /[А-Яа-я]{2,}/;
const patternsFields = {
    'last-name': NAME_PATTERN,
    'first-name': NAME_PATTERN,
    'phone': PHONE_PATTERN
};

window.addEventListener('load', () => {
    const inputs = Array.from(document.querySelectorAll('#applicant-form input'));

    function setValidation(inputs) {
        inputs.filter(input => requiredFields.includes(input.name))
            .forEach(input => input.required = true);

        // не очень очевидная проверка, но если взять поле, которого в объекте нет, то вернется undefined, что даст false
        inputs.filter(input => patternsFields[input.name])
            // устаналиваем в паттерн свойство source объекта "типа" RegExp, чтобы валидация была адекватная
            .forEach(input => input.pattern = patternsFields[input.name].source);
    }

    const errors = {

    };

    function validate(inputEvent) {
        const input = inputEvent.target;

        if (input.required && !input.value && !errors[input.name]) {
            const errorElement = document.createElement('p');
            errorElement.innerText = "This field is required";
            errorElement.classList.add('input-error');

            input.parentNode.addChildren(p);
            errors[input.name] = p;
        }
        else {
            errors[input.name].remove();
        }
        // if (!!input.validity.valid) input.setCustomValidity("")
        // else if (input.required && !input.value) input.setCustomValidity('REQUIRED FIELD')
        // else if (input['pattern'] && !input.value.match(input['pattern'])) input.setCustomValidity("INVALID PATTERN")
    }

    setValidation(inputs);
    inputs.forEach(input => input.addEventListener('blur', validate));
});