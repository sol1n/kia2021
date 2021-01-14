import './styles/style.scss';
import {formatInputMobile, setupDefaultNumber} from './helpers/phone-formatter.js';
import {inputHandler, setInputHandler} from './helpers/fsm.js';
import {initAutocomplete} from "./helpers/autocomplete";
import {getFormValues} from "./helpers/form-values";
import {apiUserRegistration, apiReceiveDictionaryData} from './helpers/api';
import {hideLoader} from "./helpers/loader";

var form = null,
    agreementModal = null;

document.querySelector('#phoneNumber').addEventListener('input', formatInputMobile);
document.querySelector('#phoneNumber').addEventListener('focus', setupDefaultNumber);

function initCloseModal() {
    var closeButtons = document.querySelectorAll('.modal__close');
    Array.prototype.forEach.call(closeButtons, function(closeButton) {
        closeButton.addEventListener('click', function() {
            var parent = this.parentNode.parentNode;
            parent.hidden = true;
            agreementModal.classList.add('hidden');
        })
    });
}

function ready() {
    form = document.getElementById('register-form');
    agreementModal = document.getElementById('agreemnet-modal');

    setInputHandler('#register-form', inputHandler);
    initCloseModal();

    let aucotocmpleteData = {
        'Cities': [],
        'Positions': [],
        'Regions': []
    }

    aucotocmpleteData['Cities'] = apiReceiveDictionaryData('Cities');
    aucotocmpleteData['Positions'] = apiReceiveDictionaryData('Positions');
    aucotocmpleteData['Regions'] = apiReceiveDictionaryData('Regions');

    initAutocomplete(aucotocmpleteData);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submit();
    })

    document.getElementById('agreement-btn').addEventListener('click', function (event) {
        event.preventDefault();
        agreementModal.classList.remove('hidden');
        agreementModal.hidden = false;
    });


    hideLoader();
}

function submit() {
    debugger
    var values = getFormValues('#register-form')
    apiUserRegistration(values);
}


document.addEventListener("DOMContentLoaded", ready);