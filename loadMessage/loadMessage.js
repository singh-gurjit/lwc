import { LightningElement, api } from 'lwc';

export default class LoadMessage extends LightningElement {

    @api message
    @api isCustomBackdrop
    @api messageStyle
}