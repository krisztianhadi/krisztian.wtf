async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('\u2728 Copied it to your clipboard yay!');
    } catch {
        showToast('Could not copy :( Please copy manually.');
    }
}

function showToast(message, duration = 5000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}
