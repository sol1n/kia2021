import autocomplete from 'autocompleter';

const initAutocomplete = function(data) {
    var autocompletes = document.querySelectorAll('.is-autocomplete');

    Array.prototype.forEach.call(autocompletes, function(autocompleteItem) {
        var collection = autocompleteItem.getAttribute('data-collection');

        if (collection) {
            var searchData = (data[collection] || []).map(item => {
                return {
                    value: item.id,
                    label: item.title
                }
            })
            autocomplete({
                input: autocompleteItem,
                // emptyMsg: "Ничего не найдено",
                minLength: 0,
                showOnFocus: true,
                fetch: function (text, update) {
                    text = text.toLowerCase();
                    var suggestions = searchData.filter(n => n.label.toLowerCase().startsWith(text))
                    update(suggestions);
                },
                onSelect: function (item) {
                    autocompleteItem.value = item.label;
                },
                customize: (input, inputRect, container, maxHeight) => {
                    container.style.maxHeight = "150px";
                    container.style.top = (Number.parseInt(container.style.top) - 3) + 'px';
                },
                preventSubmit: true
            });
        }
    });
}

export {initAutocomplete}
