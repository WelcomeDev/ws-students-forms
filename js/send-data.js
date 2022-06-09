function getFormData(form) {
    const formData = new FormData(form);

    const res = Object.fromEntries(formData);
    // or
    // Array.from(formData.keys()).forEach(key => {
    //     res[key] = formData.getAll(key);
    // мой косяк был, что написал **get**, а не **getAll**
    // });
    console.log(res);
    return res;
}

async function useFetch(data) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(response.json());
}

function useXmlHttpRequest(data) {
    const request = new XMLHttpRequest();
    request.open('POST', ' http://localhost:3000/users');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onloadend = () => {
        console.log(request.response);
    };
}

window.addEventListener('load', () => {
    // document.forms.applicantForm OR
    const applicantForm = document.forms.applicantForm;
    applicantForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = getFormData(document.forms.applicantForm);

        document.getElementById('sended-data').innerText = JSON.stringify(data);
        useXmlHttpRequest(data);
    });
    const applicantFormSubmit = document.getElementById('applicantFormSubmit');

    // applicantFormSubmit.addEventListener('click', () => {
    //     event.preventDefault();
    //     const data = getFormData(document.forms.applicantForm);

    //     document.getElementById('sended-data').innerText = JSON.stringify(data);
    //     useXmlHttpRequest(data);
    // });

    // to DOM
    applicantForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // const data = getFormData(event.target);

        // document.getElementById('sended-data').innerText = JSON.stringify(data);
        // useXmlHttpRequest(data);
    });
});