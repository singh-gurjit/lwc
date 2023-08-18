/**
 * @description Modal popup with a dynamic confimation message and two confirm button.
 * @author Gurjit Singh
 * @date Wednesday-August-09-2023
 **/

import { LightningElement, api } from 'lwc'
import closeCustomModal from 'c/closeCustomModal'

export default class ConfirmModal extends LightningElement {

    @api showFooter
    @api headerLabel
    @api mainSelector


    handleCloseModal(event) {

        const detail = event.target.dataset.id == 'Yes'

        closeCustomModal(this, detail)
    }
}