const loader = document.getElementById('loader-overlay');

export const hideLoader = function () {
    loader.classList.add('hidden');
}

export const showLoader = function() {
    loader.classList.remove('hidden');
}
