/**
 * @description Reusable SLDS modal with css animation.
 * @author Gurjit Singh
 * @date Tuesday-August-08-2023
 **/

import { LightningElement, api } from 'lwc'
import closeCustomModal from 'c/closeCustomModal'

export default class LightningModal extends LightningElement {

    @api showFooter
    @api headerLabel
    @api mainSelector

    handleCancel() {
        closeCustomModal(this)
    }
}