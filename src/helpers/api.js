import {fsm} from "./fsm";
import {getText} from "./locale";
import {hideLoader, showLoader} from "./loader";
import {showSuccessMessage} from "./message";

const apiUrl = 'https://api.appercode.com/v1/kia';
const eventSchema = 'Events';
const eventId = "8c7840cb-c069-4221-975f-0bc232b90231";

export const apiUserRegistration = function (body) {
    showLoader();
    var xhr = new XMLHttpRequest(),
        mainFields = ['phoneNumber', 'firstName', 'lastName', 'middleName'],
        url = apiUrl + "/konferenza/register/byEmail",
        bodyForApi = {};

    bodyForApi = {
        profile: body,
        event: {
            schemaId: eventSchema,
            objectId: eventId
        }
    }

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            fsm.dispatch('success', response);
        } else if (xhr.status === 404)  {
            fsm.dispatch('notFound');
        } else if (xhr.status === 403)  {
            var response = JSON.parse(xhr.responseText);
            if (response.code === 'userPostRegistration.multipleUsers') {
                fsm.dispatch('notFound');
            } else {
                fsm.dispatch('error', getText('ru', 'registeringUserError'));
            }
        } else {
            fsm.dispatch('error', getText('ru', 'registeringUserError'));
        }
        hideLoader();
        showSuccessMessage();
    };
    xhr.send(JSON.stringify(bodyForApi));
}


export const apiReceiveDictionaryData = function(dictionaryName, language = 'ru') {
    var xhr = new XMLHttpRequest(),
        url = apiUrl + "/objects/" + dictionaryName + "/query",
        body = {
            include: ["id", "title"],
            take: -1,
            skip: 0,
            order: {
                title: "asc"
            }
        };

    xhr.open('POST', url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Appercode-Language', language);
    xhr.send(JSON.stringify(body));
    if (xhr.readyState != 4) return;

    if (xhr.status == 200) {
        return JSON.parse(xhr.responseText);
    } else {
        fsm.dispatch('error', getText('ru', 'companiesReceiveError'));
    }

    return [];
}