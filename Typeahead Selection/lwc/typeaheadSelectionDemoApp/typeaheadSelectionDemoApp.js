import { LightningElement, track, wire } from 'lwc'
import getContactsArray from '@salesforce/apex/TypeaheadSelectionDemoAppController.getContactsArray'

export default class TypeaheadSelectionDemoApp extends LightningElement {

    optionsArray1 = [{ label: 'Ford', value: 'ford' },
    { label: 'Suzuki', value: 'suzuki' },
    { label: 'Toyota', value: 'toyota' },
    { label: 'BMW', value: 'bmw' },
    { label: 'Honda', value: 'honda' },
    { label: 'Volvo', value: 'voldvo' }]

    optionsArray2 = [{ label: 'Ford', subLabel: 'USA', value: 'ford' },
    { label: 'Suzuki', subLabel: 'Japan', value: 'suzuki' },
    { label: 'Toyota', subLabel: 'Japan', value: 'toyota' },
    { label: 'BMW', subLabel: 'Germany', value: 'bmw' },
    { label: 'Honda', subLabel: 'Japan', value: 'honda' },
    { label: 'Volvo', subLabel: 'Germany', value: 'voldvo' }]

    optionsArray3 = [{ label: 'Ford', subLabel: 'USA', subLabel2: '(123)', value: 'ford' },
    { label: 'Suzuki', subLabel: 'Japan', subLabel2: '(234)', value: 'suzuki' },
    { label: 'Toyota', subLabel: 'Japan', subLabel2: '(345)', value: 'toyota' },
    { label: 'BMW', subLabel: 'Germany', subLabel2: '(456)', value: 'bmw' },
    { label: 'Honda', subLabel: 'Japan', subLabel2: '(567)', value: 'honda' },
    { label: 'Volvo', subLabel: 'Germany', subLabel2: '(789)', value: 'voldvo' }]

    @track tooltipDetail = {
        'Company Name': 'Ford',
        Modal: 'Figo',
        Year: 2017,
        Address: 'A-156 Patiala house'
    }

    @track searchedValue = ''
    @track contactOptions = []
    showSpinner = true

    @wire(getContactsArray, { searchedValue: '$searchedValue' })
    getContactsArrayHandler(result) {
        const { data, error } = result
        if (data) {
            this.contactOptions = this.getContactsOptions(data)
            this.showSpinner = false
        } else if (error) {
            console.log('There is an error', JSON.stringify(error))
            console.error('There is an error', error)
        }
    }

    getContactsOptions(contactsArray) {
        return contactsArray.map(({ Name, Id }) => {
            return {
                label: Name,
                value: Id
            }
        })
    }

    handleContactChange(event) {
        this.showSpinner = true
        this.searchedValue = event.detail.inputValue
    }

    handleValueSelect(event) {
        this.tooltipDetail['Company Name'] = event.detail.label

        this.tooltipDetail = { ... this.tooltipDetail }
    }

    handleActionClick() {
        alert('Action Icon Click')
    }
}