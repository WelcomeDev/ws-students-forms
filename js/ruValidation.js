const RUSSIAN_REGEX = /^[А-Яа-я]{2,}$/;

window.addEventListener('load', () => {
    const firstNameInput = document.querySelector('input[name=firstName]');
    firstNameInput.required = true;
    firstNameInput.pattern = RUSSIAN_REGEX;

    let errorParagraph = null;

    firstNameInput.addEventListener('input', () => {
        const isFilled = firstNameInput.value.length > 0;
        const russian = !!firstNameInput.value.match(RUSSIAN_REGEX);
        const notRussian = !russian;

        // БУДЬТЕ ВНИМАТЕЛЬНЫ ЗДЕСЬ С ЛЯМБДОЙ!
        // errorParagraph нельзя размещать внутри лямбды, потому что вызывается каждый раз новая функция и создается новый объект
        if (isFilled && notRussian && !errorParagraph) {
            console.log(errorParagraph)
            errorParagraph = document.createElement('p');
            errorParagraph.style.color = "#FF0000";
            errorParagraph.innerText = "Ты че Пендосина?!"

            // добавление, которое я вам обещал
            firstNameInput.parentNode.appendChild(errorParagraph);
        }
        else if (russian && errorParagraph) {
            errorParagraph.remove();
        }

    });


});