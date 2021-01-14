const successModal = document.getElementById('success-message'),
    form = document.getElementById('register-form');

export const hideSuccessMessage = function () {
    form.classList.remove('hidden');
    form.hidden = false;
    successModal.classList.add('hidden');
    successModal.hidden = true;
}

export const showSuccessMessage = function() {
    form.classList.add('hidden');
    form.hidden = true;
    successModal.classList.remove('hidden');
    successModal.hidden = false;
}
