import {isInputsValid} from "./form-validation";

export const getFormValues = function (form) {
    var formValues = {},
        inputs = document.querySelectorAll(form + ' input,' + form + ' select');

    if (isInputsValid(form)) {
        for (var n = inputs.length; n--; ) {
            if (!inputs[n].parentNode.hidden) {
                if (inputs[n].getAttribute('inputmode') === 'tel') {
                    formValues[inputs[n].getAttribute('name')] = inputs[n].value.replace(/[^\d]/g, '');
                } else {
                    if (inputs[n].getAttribute('type') !== 'checkbox') {
                        if (inputs[n].classList.contains('with_selector')) {
                            if (inputs[n].getAttribute('data-selected-id')) {
                                formValues[inputs[n].getAttribute('name')] = inputs[n].getAttribute('data-selected-id');
                            }
                        } else {
                            if (inputs[n].value) {
                                formValues[inputs[n].getAttribute('name')] = inputs[n].value;
                            }
                        }
                    };
                };
            }
        }
    }
    return formValues;
}