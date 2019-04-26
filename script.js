class ScanMe {
    constructor(item) {
        this.section = item;

        this.scanner = item.querySelector(".scanner-wrapper");
        this.bgItem = item.querySelector(".scanner-bg");

        this.mousePressed = false;

        this.clickX = 0;
        this.clickY = 0;

        this.parent = {
            width: this.section.offsetWidth,
            height: this.section.offsetHeight,
        };

        this.child = {
            width: this.scanner.offsetWidth,
            height: this.scanner.offsetHeight,
        };
    };

    //Расчитывает размеры секции и пересчитывает
    calcResize() {
        let newParentWidth = this.section.offsetWidth;
        let newParentHeight = this.section.offsetHeight;

        let changed = newParentWidth !== this.parent.width || newParentHeight !== this.parent.height;

        //Вычисляет новые значения при изменении размера экрана
        if (changed) {
            if (newParentWidth !== this.parent.width) {
                this.parent.width = newParentWidth;
            }

            if (newParentHeight !== this.parent.height) {
                this.parent.height = newParentHeight;
            }

            this.parent.width = newParentWidth;
            this.parent.height = newParentHeight;

            this.moveScanner();
            this.setBgPosition();

            // if(this.scannerIntersects().horizontal){
            //     console.log("пересекает по горизонтали");
            // }
            //
            // if(this.scannerIntersects().vertical){
            //     console.log("пересекает по вертикали");
            // }
        }
    }

    scannerIntersects() {
        return {
            horizontal: this.scanner.offsetLeft <= 0 || this.parent.width - (this.child.width + this.scanner.offsetLeft) <= 0,
            vertical: this.scanner.offsetTop <= 0 || this.parent.height - (this.child.height + this.scanner.offsetTop) <= 0
        }
    }

    calcClick(event) {
        this.clickX = event.x;
        this.clickY = event.y;
    };


    //Устанавливает позицию бэкграунда
    setBgPosition() {
        let bg = this.bgItem.style;

        bg.top = -(this.scanner.offsetTop) + 'px';
        bg.left = -(this.scanner.offsetLeft) + 'px';
        bg.right = -(this.parent.width - (this.scanner.offsetLeft + this.scanner.offsetWidth)) + 'px';
        bg.bottom = -(this.parent.height - (this.scanner.offsetTop + this.scanner.offsetHeight)) + 'px';
    };

    moveScanner(event) {
        if (this.mousePressed) {
            let oldX = this.clickX;
            let oldY = this.clickY;
            let newX = event.x;
            let newY = event.y;

            let distX = newX - oldX;
            let distY = newY - oldY;

            let intersects = this.scannerIntersects();

            if (!intersects.horizontal) {
                this.scanner.style.left = `${distX}px`;
                console.log("могу двигаться по горизонтали");
            } else {

                console.log("пересек край секции по горизонтали");
            }

            if (!intersects.vetrical) {
                this.scanner.style.top = `${distY}px`;
                console.log("могу двигаться по вертикали");
            } else {

                console.log("пересек край секции по вертикали");
            }
        }

        this.setBgPosition();
    };

    //Добавляет обработчики событий при загрузке страницы
    addListeners() {
        //Отслеживает размер окна
        window.addEventListener("resize", () => {
            this.calcResize();
        });

        this.section.addEventListener("mousedown", (event) => {

            if (event.target === this.scanner) {
                this.mousePressed = true;
                this.calcClick(event);

                console.log("нажал на сканнер");
                console.log(`Мышь нажата на ${this.clickX} и ${this.clickY}`, this.mousePressed);
            }

        });

        this.section.addEventListener("mouseup", () => {
            this.mousePressed = false;

            console.log(this.mousePressed, "мышь отпущена");
        });

        this.section.addEventListener("mouseout", () => {
            this.mousePressed = false;

            console.log(this.mousePressed, "мышь вышла за пределы секции");
        });

        this.section.addEventListener("mousemove", (event) => {
            this.moveScanner(event);
        });

        this.scanner.addEventListener("mouseout", (e) => {
            e.stopPropagation();
        });

        this.scanner.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
        });
    };

    init() {
        this.addListeners();
        this.setBgPosition();
    }
}

let some = new ScanMe(document.querySelector(".scanner"));

some.init();