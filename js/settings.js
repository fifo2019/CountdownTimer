class Figure {

    constructor(serial) {
        this.serial = serial;
        this._createFigure();
    }

    getFigureWrp() {
        return document.querySelector(`#js-figure-${this.serial}`);
    }

    _createFigure() {
        let figure = `<ul class="figure-wrp" id="js-figure-${this.serial}">
                          <li class="item-1" data-num="1"></li>
                          <li class="item-2" data-num="2"></li>
                          <li class="item-3" data-num="3"></li>
                          <li class="item-4 not-active" data-num="4"></li>
                          <li class="item-5" data-num="5"></li>
                          <li class="item-6" data-num="6"></li>
                          <li class="item-7" data-num="7"></li>
                      </ul>`;
        let display = document.querySelector('#js-display-wrp');
        display.insertAdjacentHTML('beforeend', figure);
    }

    enumerationItems(setNumber) {
        let setItems = this.getFigureWrp().children;

        for (let item of setItems) {
            let num = +item.dataset.num;
            if (setNumber.indexOf(num) !== -1) {
                this.setNotActive(item);
            } else {
                this.removeNotActive(item);
            }
        }
    }

    setNotActive(item) {
        item.classList.add('not-active');
    }

    removeNotActive(item) {
        item.classList.remove('not-active');
    }
}


class Points {
    constructor() {
        this._createPosition();
    }

    _createPosition() {
        let Points = `<ul class="points-wrp" id="js-points-wrp">
                          <li></li>
                          <li></li>
                      </ul>`;
        let display = document.querySelector('#js-display-wrp');
        display.insertAdjacentHTML('beforeend', Points);
    }
}


class Display {

    constructor() {
        this.firstMinutes = 0;
        this.twoMinutes = 0;
        this.firstSecond = 0;
        this.twoSecond = 0;
        this._createDisplay();
    }

    _createDisplay() {
        let displayContent = `<div class="display__menu">
                                  <div class="section__choice-wrp">
                                      <input class="section__choice-btn" type="button" id="js-minute-minus" value="-">
                                      <span class="section-text">min</span>
                                      <input class="section__choice-btn" type="button" id="js-minute-plus" value="+">
                                  </div>
                                  <div class="section__choice-wrp">
                                      <input class="section__choice-btn" type="button" id="js-second-minus" value="-">
                                      <span class="section-text">sec</span>
                                      <input class="section__choice-btn" type="button" id="js-second-plus" value="+">
                                  </div>
                                  <div class="section__manager-wrp">
                                      <input class="section__manager-btn" type="button" id="js-start-stop" data-command="start">
                                      <span class="section-text">start/stop</span>
                                  </div>
                                  <div class="section__manager-wrp">
                                      <input class="section__manager-btn" type="button" id="js-reset">
                                      <span class="section-text">reset</span>
                                  </div>
                              </div>`;
        let display = document.querySelector('#js-menu-wrp');
        display.insertAdjacentHTML('afterbegin', displayContent);
    }

    minuteMinus() {
        if (this.firstMinutes <= 0 && this.twoMinutes <= 0) {
            this.firstMinutes = 0;
            this.twoMinutes = 0;
            return false;
        }

        if (this.firstMinutes <= 5 && this.twoMinutes === 0) {
            this.firstMinutes--;
            this.twoMinutes = 9;
            return false;
        }

        this.twoMinutes--;
    }

    minutePlus() {
        if (this.firstMinutes >= 5 && this.twoMinutes >= 9){
            this.firstMinutes = 5;
            this.twoMinutes = 9;
            return false;
        }

        if (this.twoMinutes === 9) {
            this.firstMinutes++;
            this.twoMinutes = 0;
            return false;
        }

        this.twoMinutes++;
    }

    secondsMinus() {
        if (this.firstMinutes <= 0 && this.twoMinutes <= 0 && this.firstSecond <= 0 && this.twoSecond <= 0) {
            this.reset();
            return false;
        }

        if ((this.firstMinutes >= 0 || this.twoMinutes >= 0) && this.firstSecond > 0 && this.twoSecond === 0) {
            this.firstSecond--;
            this.twoSecond = 9;
            return false;
        }

        if ((this.firstMinutes > 0 || this.twoMinutes > 0) && this.firstSecond === 0 && this.twoSecond === 0) {
            this.minuteMinus();
            this.firstSecond = 5;
            this.twoSecond = 9;
            return false;
        }

        this.twoSecond--;
    }

    secondsPlus() {
        if (this.firstMinutes >= 5 && this.twoMinutes >= 9 && this.firstSecond >= 5 && this.twoSecond >= 9) {
            this.minutePlus();
            this.firstSecond = 5;
            this.twoSecond = 9;
            return false;
        }

        if ((this.firstMinutes >= 0 || this.twoMinutes >= 0) && this.firstSecond === 5 && this.twoSecond === 9) {
            this.minutePlus();
            this.firstSecond = 0;
            this.twoSecond = 0;
            return false;
        }

        if ((this.firstMinutes >= 0 || this.twoMinutes >= 0) && this.firstSecond >= 0 && this.twoSecond === 9) {
            this.firstSecond++;
            this.twoSecond = 0;
            return false;
        }

        this.twoSecond++;
    }

    commandStart(command) {
        command.setAttribute('data-command', 'stop');
    }

    commandStop(command) {
        command.setAttribute('data-command', 'start');
    }

    hideDisplay() {
        document.querySelector('#js-display-wrp').style.display = 'none';
    }

    reset() {
        this.firstMinutes = 0;
        this.twoMinutes = 0;
        this.firstSecond = 0;
        this.twoSecond = 0;

    }
}