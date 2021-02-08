import {fsm} from "./fsm";
import {getText} from "./locale";
import {hideLoader, showLoader} from "./loader";
import {showSuccessMessage} from "./message";
import {isJson} from "./is-json";

const apiUrl = 'https://api.appercode.com/v1/kia';
const eventSchema = 'Events';
const eventId = "e7a14063-82e4-4ca5-a6fb-6afbaef2f037";

export const apiUserRegistration = function (body) {
    showLoader();
    var xhr = new XMLHttpRequest(),
        url = apiUrl + "/objects/offline";

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            showSuccessMessage();
        } else if (xhr.status === 404)  {
            alert('')
        } else if (xhr.status === 403)  {
            var alertText = '';
            if (xhr.responseText && isJson(xhr.responseText)) {
                var responseText = JSON.parse(xhr.responseText);
                alertText = responseText.message;
            }
            alert(alertText || 'Не авторизованный запрос');
        } else {
            alert('Не удалось зарегистрировать пользователя');
        }
        hideLoader();

    };
    xhr.send(JSON.stringify(body));
}

export const apiReceiveDictionaryData = function(dictionaryName, language = 'ru') {
    var xhr = new XMLHttpRequest(),
        url = apiUrl + "/objects/" + dictionaryName + "/query",
        body = {
            include: ["id", "title"],
            take: -1,
            skip: 0,
            order: {
                orderIndex: "asc",
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
        alert('Не удалось получить значения справочника "' + dictionaryName + '"');
    }

    return [];
}
