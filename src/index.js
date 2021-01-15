import './styles/style.scss';
import {formatInputMobile, setupDefaultNumber} from './helpers/phone-formatter.js';
import {inputHandler, setInputHandler} from './helpers/fsm.js';
import {initAutocomplete} from "./helpers/autocomplete";
import {getFormValues} from "./helpers/form-values";
import {apiUserRegistration, apiReceiveDictionaryData} from './helpers/api';
import {hideLoader} from "./helpers/loader";
import { hideSuccessMessage } from "./helpers/message";
import {fetchAutocompleteData} from "./helpers/autocomplete-data";
import {cleanInputs} from "./helpers/clean-inputs";

var formSelector = '#register-form',
    form = null,
    agreementModal = null;

document.querySelector('#phoneNumber').addEventListener('input', formatInputMobile);
document.querySelector('#phoneNumber').addEventListener('focus', setupDefaultNumber);

function initCloseModal() {
    var closeButtons = document.querySelectorAll('.modal__close');
    Array.prototype.forEach.call(closeButtons, function(closeButton) {
        closeButton.addEventListener('click', function() {
            var parent = this.parentNode.parentNode;
            parent.hidden = true;
            parent.classList.add('hidden');
        })
    });
}

function ready() {
    form = document.getElementById('register-form');
    agreementModal = document.getElementById('agremnet-modal');

    setInputHandler(formSelector, inputHandler);
    initCloseModal();

    var autocompleteData = fetchAutocompleteData();

    initAutocomplete(autocompleteData);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submit();
    })

    document.getElementById('agrement-btn').addEventListener('click', function (event) {
        event.preventDefault();
        agreementModal.classList.remove('hidden');
        agreementModal.hidden = false;
    });

    document.getElementById('another-request-btn').addEventListener('click', function (event) {
        event.preventDefault();
        cleanInputs(formSelector)
        hideSuccessMessage();
    });

    hideLoader();
}

function submit() {
    var values = getFormValues(formSelector)
    apiUserRegistration(values);
}


document.addEventListener("DOMContentLoaded", ready);
