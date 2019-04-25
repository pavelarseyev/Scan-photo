class ScanMe {
    constructor(item) {
        this.section = item;

        this.scanner = item.querySelector(".scanner-wrapper");
        this.bgItem = item.querySelector(".scanner-bg");

        this.mousePressed = false;

        this.window = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.parent = {
            moveX: 0,
            moveY: 0,
            clickX: 0,
            clickY: 0,
            width: this.section.offsetWidth,
            height: this.section.offsetHeight
        };

        this.child = {
            clickX: 0,
            clickY: 0,
            width: this.scanner.offsetWidth,
            height: this.scanner.offsetHeight
        };

        this.bg = {
            posX: 0 || this.setBgPosition(),
            posY: 0 || this.setBgPosition()
        };
    }

    calcScannerClick() {

    }

    calcParentClick() {

    }

    calcCursorMove() {

    }

    setBgPosition() {

    }

    moveScanner() {

    }

    //Добавляет обработчики событий при загрузке страницы
    addListeners() {
        //Отслеживает размер окна
        window.addEventListener("resize", () => {
            let newWindowWidth = window.innerWidth;
            let newWindowHeigt = window.innerHeight;

            //Вычисляет новые значения при изменении размера экрана
            if (newWindowWidth !== this.window.width || newWindowHeigt !== this.window.height) {
                if (newWindowWidth !== this.window.width) {
                    this.window.width = newWindowWidth;
                    // console.log("Поменялась ширина");
                }

                if (newWindowHeigt !== this.window.height) {
                    this.window.height = newWindowHeigt;
                    // console.log("Поменялась высота");
                }

                this.parent.width = this.section.offsetWidth;
                this.parent.height = this.section.offsetHeight;
                this.child.width = this.scanner.offsetWidth;
                this.child.height = this.scanner.offsetHeight;

                this.moveScanner();
                this.setBgPosition();
            }
        });

        //Считает координаты движения мыши по секции

        //TODO: выяснить как снимать координаты именно с ролителя;
        this.section.addEventListener('mousemove', (event) => {
            if (this.mousePressed) {
                this.parent.moveX = event.offsetX;
                this.parent.moveY = event.offsetY;

                console.log("курсор на родителе по X: " + this.parent.moveX, "курсор на родителе по Y: " + this.parent.moveY);
            }
        });

        //Смотрит где я кликнул внутри секции
        //TODO: выяснить как снимать координаты именно с ролителя;
        this.section.addEventListener('mousedown', (event) => {
            this.mousePressed = true;

            this.parent.clickX = event.offsetX;
            this.parent.clickY = event.offsetY;

            // console.log("ролитель Х: " + this.parent.clickX, "родитель Y: " + this.parent.clickY);
            console.log(event);
        });

        //Выключает просчет движения мыши по секции
        this.section.addEventListener('mouseup', () => {
            this.mousePressed = false;
        });

        this.section.addEventListener('mouseout', () => {
            this.mousePressed = false;
        });


    }

    init() {
        this.addListeners();

        console.log(this);
    }
}

let some = new ScanMe(document.querySelector(".scanner"));

some.init();

/*






//Вычисляет
movingItem.addEventListener('mousedown', (event) => {
  let width = event.target.offsetWidth;
  let height = event.target.offsetHeight;

  innerX = event.offsetX;
  innerY = event.offsetY;

  console.log("ребенок Х: " + innerX, "ребенок Y: " + innerY);
}); */