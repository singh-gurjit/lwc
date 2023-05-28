/**
 * @description For the demo of typeahead selection
 * @author Gurjit Singh
 **/
public without sharing class TypeaheadSelectionDemoAppController {

	@AuraEnabled(cacheable = true)
	public static contact[] getContactsArray(string searchedValue) {

		if(null != searchedValue) {
			searchedValue ='%'+searchedValue+'%';
			return [SELECT id, Name FROM Contact WHERE Name like : searchedValue LIMIT 10];
		}
		return [SELECT id, Name FROM Contact LIMIT 10];
	}
}