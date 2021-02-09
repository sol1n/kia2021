import Choices from "choices.js";

const initRegionSelect = (data) => {
    var select = document.querySelector('[name="rehion"]');
    if (select) {
        new Choices(select, {
            placeholder: true,
            placeholderValue: "Выберите регион",
            choices: data.map(item => {
                return {
                    value: item.title,
                    label: item.title
                }
            }),
            searchEnabled: false,
            itemSelectText: ''
        })
    }
}

export {
    initRegionSelect
}
