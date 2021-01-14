import {fsm} from "./fsm";

export const cleanInputs = function (form) {
    var inputs = document.querySelectorAll(form + ' input,' + form + ' select');;
    Array.prototype.forEach.call(inputs, function(e) {
        if (e.type.toLowerCase() == 'checkbox') {
            e.checked = false;
        }
        e.value = '';
    });
    fsm.dispatch('input');
}
