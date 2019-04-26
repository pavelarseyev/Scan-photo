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
            top: 0,
            left: 0
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
            left: this.scanner.offsetLeft <= 0,
            right: this.parent.width - (this.child.width + this.scanner.offsetLeft) <= 0,
            top: this.scanner.offsetTop <= 0,
            bottom: this.parent.height - (this.child.height + this.scanner.offsetTop) <= 0
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
            let top = this.child.top;
            let left = this.child.left;

            let oldX = this.clickX;
            let oldY = this.clickY;
            let newX = event.x;
            let newY = event.y;

            let distX = left + newX - oldX;
            let distY = top + newY - oldY;


            if (!this.scannerIntersects().left && event.movementX < 0) {

                this.scanner.style.left = `${distX}px`;

            }

            if(!this.scannerIntersects().right && event.movementX > 0){

                this.scanner.style.left = `${distX}px`;

            }

            if(!this.scannerIntersects().top && event.movementY < 0){

                this.scanner.style.top = `${distY}px`;

            }

            if(!this.scannerIntersects().bottom && event.movementY > 0){

                this.scanner.style.top = `${distY}px`;
            }
        }

        this.setBgPosition();
    };

    //Записывает позицию сканнера на экране
    storePosition(){
        this.child.left = +this.scanner.style.left.replace("px", "");
        this.child.top = +this.scanner.style.top.replace("px", "");
    }

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

                // console.log("нажал на сканнер");
                // console.log(`Мышь нажата на ${this.clickX} и ${this.clickY}`, this.mousePressed);
            }

        });

        this.section.addEventListener("mouseup", () => {

            this.mousePressed = false;
            this.storePosition();
            // console.log(this.mousePressed, "мышь отпущена");
        });

        this.section.addEventListener("mouseout", () => {
            this.mousePressed = false;

            this.storePosition();
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
        this.storePosition();
        this.setBgPosition();
    }
}

let some = new ScanMe(document.querySelector(".scanner"));

some.init();