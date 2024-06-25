const diceImage = document.querySelector('.dice');

const imgs = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'];

const getRandomDice = (prevDice) => {
    const newDice = Math.floor(Math.random() * 6);

    if (newDice === prevDice) {
        return getRandomDice(prevDice);
    };

    return newDice;
    
};

const diceAnimation = () => {
    let imgIndex = 4;

    const diceInterval = setInterval(() => {
        imgIndex = getRandomDice(imgIndex);
        diceImage.src = `./images/${imgs[imgIndex]}`;
    }, 500);

    return () => {clearInterval(diceInterval)};
};

export default diceAnimation;