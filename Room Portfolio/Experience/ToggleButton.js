import { EventEmitter } from "events";

export default class ToggleButton extends EventEmitter {
    constructor() {
        super();
        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".circle");
        this.setEventListeners();
    }

    setEventListeners() {
        let sum = 1

        this.toggleButton.addEventListener("click", () => {
            if (sum%2 === 0){
                this.toggleCircle.style.left = '6px'
                sum++
            }else{
                this.toggleCircle.style.left = '30px'
                sum++
            }
        });
    }
}