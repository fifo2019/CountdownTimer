window.addEventListener('DOMContentLoaded', function () {

    const figure1 = new Figure(1);
    const figure2 = new Figure(2);
    const points = new Points();
    const figure3 = new Figure(3);
    const figure4 = new Figure(4);
    const allDigits = [figure1, figure2, figure3, figure4];
    const display = new Display();
    let timerId;
    let timerStep;
    let setEvent = ['mousedown', 'mouseup', 'mouseout', 'click'];
    const startStop = document.querySelector('#js-start-stop');
    let btnBlock = false;


    const updateFigure = function() {
        figure1.enumerationItems(setNumbers[`${display.firstMinutes}`]);
        figure2.enumerationItems(setNumbers[`${display.twoMinutes}`]);
        figure3.enumerationItems(setNumbers[`${display.firstSecond}`]);
        figure4.enumerationItems(setNumbers[`${display.twoSecond}`]);
    };


    setEvent.forEach(el => {
        const minuteMinus = document.querySelector('#js-minute-minus');
        if (el === 'mouseout') {
            minuteMinus.addEventListener('mouseout', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'mouseup') {
            minuteMinus.addEventListener('mouseup', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'click') {
            minuteMinus.addEventListener('click', () => {
                clearInterval(timerId);
                display.minuteMinus();
                updateFigure();
            });
        }
        if (el === 'mousedown') {
            minuteMinus.addEventListener('mousedown', () => {
                clearInterval(timerId);
                timerId = setInterval(() => {
                    if (display.firstMinutes === 0 && display.twoMinutes === 0) {
                        clearInterval(timerId);
                    }
                    display.minuteMinus();
                    updateFigure();
                }, 150);
            });
        }
    });


    setEvent.forEach(el => {
        const minutePlus = document.querySelector('#js-minute-plus');
        if (el === 'mouseout') {
            minutePlus.addEventListener('mouseout', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'mouseup') {
            minutePlus.addEventListener('mouseup', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'click') {
            minutePlus.addEventListener('click', () => {
                clearInterval(timerId);
                display.minutePlus();
                updateFigure();
            });
        }
        if (el === 'mousedown') {
            minutePlus.addEventListener('mousedown', () => {
                clearInterval(timerId);
                timerId = setInterval(() => {
                    if (display.firstMinutes >= 5 && display.twoMinutes >= 9) {
                        clearInterval(timerId);
                    }
                    display.minutePlus();
                    updateFigure();
                }, 150);
            });
        }
    });


    setEvent.forEach(el => {
        const secondMinus = document.querySelector('#js-second-minus');
        if (el === 'mouseout') {
            secondMinus.addEventListener('mouseout', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'mouseup') {
            secondMinus.addEventListener('mouseup', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'click') {
            secondMinus.addEventListener('click', () => {
                clearInterval(timerId);
                display.secondsMinus();
                updateFigure();
            });
        }
        if (el === 'mousedown') {
            secondMinus.addEventListener('mousedown', () => {
                clearInterval(timerId);
                timerId = setInterval(() => {
                    if (display.firstMinutes <= 0 && display.twoMinutes <= 0 && display.firstSecond <= 0 && display.twoSecond <= 0) {
                        clearInterval(timerId);
                    }
                    display.secondsMinus();
                    updateFigure();
                }, 150);
            });
        }
    });


    setEvent.forEach(el => {
        const secondPlus = document.querySelector('#js-second-plus');
        if (el === 'mouseout') {
            secondPlus.addEventListener('mouseout', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'mouseup') {
            secondPlus.addEventListener('mouseup', () => {
                clearInterval(timerId);
            });
        }
        if (el === 'click') {
            secondPlus.addEventListener('click', () => {
                clearInterval(timerId);
                display.secondsPlus();
                updateFigure();
            });
        }
        if (el === 'mousedown') {
            secondPlus.addEventListener('mousedown', () => {
                clearInterval(timerId);
                timerId = setInterval(() => {
                    if (this.firstMinutes >= 5 && this.twoMinutes >= 9 && this.firstSecond >= 5 && this.twoSecond >= 9) {
                        clearInterval(timerId);
                    }
                    display.secondsPlus();
                    updateFigure();
                }, 150);
            });
        }
    });


    startStop.addEventListener('click', () => {
        clearInterval(timerId);
        if (btnBlock || (display.firstMinutes <= 0 && display.twoMinutes <= 0 && display.firstSecond <= 0 && display.twoSecond <= 0)) {
            return false;
        }
        const command = startStop.getAttribute('data-command');
        if (command === 'start') {
            display.commandStart(startStop);
            timerStep = setInterval(() => {
                if (display.firstMinutes <= 0 && display.twoMinutes <= 0 && display.firstSecond <= 0 && display.twoSecond <= 0) {
                    let displayWrp = document.querySelector('#js-display-wrp');
                    let textEndWrp = document.querySelector('#js-text-end-wrp');
                    clearInterval(timerStep);
                    display.commandStop(startStop);
                    updateFigure();
                    displayWrp.style.display = 'none';
                    textEndWrp.style.display = 'flex';
                    btnBlock = true;
                    setTimeout(() => {
                        textEndWrp.style.display = 'none';
                        displayWrp.style.display = 'flex';
                        btnBlock = false;
                    }, 2000);
                }
                display.secondsMinus();
                updateFigure();
            }, 1000);
        } else if (command === 'stop') {
            display.commandStop(startStop);
            clearInterval(timerStep);
        }
    });



    document.querySelector('#js-reset').addEventListener('click', () => {
        clearInterval(timerId);
        clearInterval(timerStep);
        for (let figure of allDigits) {
            figure.enumerationItems(setNumbers['0']);
        }
        display.reset();
        display.commandStop(startStop);
    });
});