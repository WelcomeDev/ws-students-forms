window.addEventListener('load', () => {
    const commentField = document.querySelector('#applicant-form textarea[name=comment]');
    const wordsCounter = document.getElementById('comment-words-counter');

    commentField.addEventListener('input', (event) => {
        const targetValue = event.target.value;
        const wordsAmount = targetValue.split(' ').filter(x => !!x).length;

        wordsCounter.innerText = wordsAmount
            ? `Amount of words ${wordsAmount}`
            : 'No words printed';
    })
});
