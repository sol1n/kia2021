import {apiReceiveDictionaryData} from "./api";

const aucotocmpleteData = {
    'Cities': [],
    'Positions': [],
    'Regions': []
}

const fetchAutocompleteData = function () {
    aucotocmpleteData['Cities'] = apiReceiveDictionaryData('Cities');
    aucotocmpleteData['Positions'] = apiReceiveDictionaryData('Positions');
    aucotocmpleteData['Regions'] = apiReceiveDictionaryData('Regions');
    return aucotocmpleteData;
}

export {
    aucotocmpleteData, fetchAutocompleteData
}
