const successModal = document.getElementById('success-modal');

export const hideLoader = function () {
    loader.classList.add('hidden');
}

export const showSuccessMessage = function() {
    successModal.classList.remove('hidden');
    successModal.hidden = false;
}
