/**
 * @author Gurjit Singh
 * @description Renders Custom look up.
 */

import { LightningElement, api, track } from 'lwc'

export default class TypeaheadSelection extends LightningElement {

    @track optionsToDisplay
    @track selectedOption
    @track _tooltipDetail
    @track tooltipData = {}
    searchBarValue = ''
    disableInput = false
    valueSelected
    _value = ''
    _option = []
    showConfirmModal

    //Public properties
    //Pass option as an array of objects with lable and value same as lightning-combobox options
    @api
    get options() {
        return this._option
    }
    set options(value) {
        this._option = value
        this.optionsToDisplay = [...value]
    }

    @api
    get value() {
        return this._value
    } set value(inputValue) {
        this._value = inputValue || ''
        this.valueSelectedHandler(inputValue)
    }

    @api
    get tooltipDetail() {
        return this._tooltipDetail
    }
    set tooltipDetail(details) {
        this._tooltipDetail = details
        this.populateTooltipData()
    }

    @api tooltipPosition
    @api placeHolder
    @api label = ''
    @api iconName
    @api showSpinner
    @api showExpandSearch
    @api searchId
    @api readOnly
    @api isDisabled
    @api isRequired
    @api actionIconLabel
    @api actionIconName
    @api actionHelpText
    @api confirmRemoveMessage

    // End of public properties

    get tooltipSelector() {
        return this.tooltipPosition == 'bottom' ? 'tool-tip tool-tip-bottom' : 'tool-tip tool-tip-top'
    }

    get sldsFormElementSelector() {
        return this.iconName ? 'slds-form-element__control slds-input-has-icon slds-input-has-icon_left-right' :
            'slds-form-element__control slds-input-has-icon slds-input-has-icon_right'
    }

    get anchorSelector() {
        return this.readOnly ? 'tool-tip-input-box read-only' : this.isDisabled ? 'tool-tip-input-box disabled' : 'tool-tip-input-box'
    }

    get showRemoveIcon() {
        return !this.readOnly && !this.isDisabled && this.disableInput && this.value
    }

    get inputSelector() {
        return this.isDisabled ? 'slds-input' : 'slds-input remove-disable-style'
    }

    get isDisableInput() {
        return Boolean(this.isDisabled) || this.disableInput
    }

    get showTooltipDetail() {
        return Boolean(this.valueSelected && this.tooltipDetail)
    }

    populateTooltipData() {

        if (!this.tooltipDetail) { return }

        this.tooltipData = {}
        let index = 1
        for (const key in this.tooltipDetail) {
            if (key == 'urlTonavigate') { continue }
            this.tooltipData['label' + index] = key
            this.tooltipData['value' + index] = this.tooltipDetail[key]
            ++index
        }
    }

    valueSelectedHandler(inputValue) {
        if (inputValue) {
            this.disableInput = true
            this.valueSelected = true
            this.searchBarValue = inputValue
        } else {
            this.disableInput = false
            this.valueSelected = false
            this.searchBarValue = ''
            const inputBox = this.template.querySelector('input')
            if (inputBox) { inputBox.value = '' }
        }
    }

    handleInputChange(event) {
        let value = event.target.value || '';
        this.searchBarValue = value

        const detail = {
            id: this.searchId,
            inputValue: value
        }

        const options = this.getSelectedOptions(value)
        this.optionsToDisplay = [...options]
        this.dispatchEvent(new CustomEvent('inputchange', {
            detail
        }))
    }

    handleSearchBarFocus() {

        this.optionsToDisplay = this.searchBarValue ? [...this.getSelectedOptions(this.searchBarValue)] : [...this.options]
    }

    handleNavigateToUrl() {

        const url = this.tooltipDetail.urlTonavigate
        if (!url) { return }
        window.open(`/${url}`)
    }

    handleRemoveValue() {

        if (this.confirmRemoveMessage) {
            this.showConfirmModal = true
        } else {
            this.removeValue()
        }
    }

    handleCloseRemoveConfirmModal(event) {

        this.showConfirmModal = false

        const isRemoveValue = event.detail

        if (isRemoveValue) {
            this.removeValue()
        }
    }

    removeValue() {
        this.value = ''
        this.searchBarValue = ''
        this.disableInput = false
        this.valueSelected = false
        this.optionsToDisplay = [...this.options]
        this.dispatchEvent(new CustomEvent('remove', {
            detail: this.searchId
        }))

        setTimeout(() => this.template.querySelector('input').focus())
    }

    handleDropdownMouseDown() {
        if (this.searchBarValue) { return }
        setTimeout(() => {
            this.template.querySelector('input').focus()
        })
    }

    handleSelectOption(event) {
        const selectedValue = event.currentTarget.dataset.id

        this.selectedOption = { ...this.getSelectedOption(selectedValue) }
        const detail = this.selectedOption
        detail.id = this.searchId

        this.valueSelected = true
        this.disableInput = true
        this.value = detail.label
        this.searchBarValue = detail.label
        this.searchBarValue = detail.label
        this.dispatchEvent(new CustomEvent('select', {
            detail
        }))
    }

    getSelectedOption(selectedValue) {
        return this.options.find(({ value }) => value == selectedValue)
    }

    getSelectedOptions(value) {
        return this.options.filter(data => data.label.toLowerCase().includes(value.toLowerCase()))
    }

    handleActionClick() {

        const detail = {}
        detail.id = this.searchId
        this.dispatchEvent(new CustomEvent('actionclick', {
            detail
        }))
    }
}