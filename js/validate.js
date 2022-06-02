const requiredFields = ['phone', 'last-name', 'first-name', 'email']

window.addEventListener('load', () => {
    const inputs = Array.from(document.querySelectorAll('#applicant-form input'));

    inputs.filter(input => requiredFields.includes(input.name))
        .forEach(input => input.required = true)

    const phoneInput = inputs.find(input => input.name === 'phone');
    phoneInput.pattern = /\d{4}/

    function validate(inputEvent) {
        console.log(inputEvent);
        const input = inputEvent.target;
        input.setCustomValidity("");

        // if(!!input.validity.valid) todo: remove element
        if(input.required && !input.value){
                const textElement = document.createElement('p');
                textElement.innerText = "This field is required";
                myimg.parentNode.insertBefore(text, myimg.nextSibling)
        }
        // if (!!input.validity.valid) input.setCustomValidity("")
        // else if (input.required && !input.value) input.setCustomValidity('REQUIRED FIELD')
        // else if (input['pattern'] && !input.value.match(input['pattern'])) input.setCustomValidity("INVALID PATTERN")
    }

    inputs.forEach(input => input.addEventListener('blur', validate));
});