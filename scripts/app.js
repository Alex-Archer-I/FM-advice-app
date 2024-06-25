import diceAnimation from './dice-animation';

const diceButton = document.querySelector('.advice_button');

const adviceStatusElement = document.querySelector('.advice_status');
const adviceQuoteElement = document.querySelector('.advice_quote p');
const adviceNumberElement = document.querySelector('.advice_number');

const loadingMessage = 'Ansient wisdon is loading...';
const errorMessage = 'Alas, the source of wisdom is unavaliable now!';

/* Dice animation */

let diceStop;

diceButton.addEventListener('mouseenter', () => {
    diceStop = diceAnimation();
});

diceButton.addEventListener('mouseleave', () => {
    if (diceStop) {diceStop()};
});

/* Fetching advices */

const displayError = (error) => {
    console.log(error);
    adviceStatusElement.classList.add('advice_status-error');
    adviceStatusElement.textContent = errorMessage;
};

const fetchAdvice = async () => {
    adviceNumberElement.textContent = '???';

    adviceStatusElement.style.display = 'block';
    adviceStatusElement.classList.remove('advice_status-error');
    adviceStatusElement.textContent = loadingMessage;

    adviceQuoteElement.style.display = 'none';

    let responce;

    try {
        responce = await fetch('https://api.adviceslip.com/advice');
    } catch (error) {
        displayError(error);
    };

    if (!responce.ok) {
        displayError(responce.statusText);
    };

    const advice = await responce.json();

    adviceNumberElement.textContent = advice.slip.id;

    adviceStatusElement.style.display = 'none';

    adviceQuoteElement.style.display = 'block';
    adviceQuoteElement.textContent = `"${advice.slip.advice}"`;
};

fetchAdvice();

diceButton.addEventListener('click', fetchAdvice);