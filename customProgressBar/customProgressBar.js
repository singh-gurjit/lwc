/**
 * @author Gurjit Singh
 * @date 30/May/2021
 * @group lightning-spinner
 * @description Renders slds spinner with a custom progress bar.
 */

import { LightningElement, api, track } from 'lwc';

const TIMEOUT_DELAY = 1500;
var intervalDelay = 100;

export default class CustomProgressBar extends LightningElement {

    interval;
    hideSpinner;

    _showProgress;
    @api
    get showProgress() {
        return this._showProgress;
    };
    set showProgress(value) {
        if (value == true || value == false || value == "true") {
            clearInterval(this.interval);
            this.handleshowProgress(value);
        }
    }

    @api progress = 90

    @track percentage = 0;
    @track style;
    @track barSelector = 'bar';

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    handleshowProgress(value) {
        this.hideSpinner = !value;
        if (this.hideSpinner) {
            clearInterval(this.interval);
            intervalDelay = 15;
        } else {
            intervalDelay = 100;
            this._showProgress = true;
        }
        this.invokeBar();
    }

    invokeBar() {
        this.interval = setInterval(() => {
            if (this.percentage >= 100) {
                this.unRenderSpinner();
            } else if (this.percentage <= this.progress || this.hideSpinner) {
                this.increaseProgress();
            }
        }, intervalDelay);
    }

    increaseProgress() {
        this.style = `width: ${this.percentage}%`
        this.percentage++;

        if (this.percentage >= 35 && this.percentage < 65) {
            this.barSelector = 'bar bar-extended-med'
        } else if (this.percentage >= 65) {
            this.barSelector = 'bar bar-extended-final'
        }
    }

    unRenderSpinner() {
        clearInterval(this.interval);

        setTimeout(() => {
            this._showProgress = false;
            this.percentage = 0;
            this.style = `width: ${this.percentage}%`
        }, TIMEOUT_DELAY);
    }
}