// src/utils/storageTimer.js
const THREE_HOURS = 3 * 60 * 60 * 1000;
const EXPIRY_KEY = 'localStorageExpiry';

export function initLocalStorageTimer() {
    const now = Date.now();
    const expiry = localStorage.getItem(EXPIRY_KEY);

    if (!expiry) {
        localStorage.setItem(EXPIRY_KEY, now + THREE_HOURS);
        return;
    }

    if (now > Number(expiry)) {
        localStorage.clear();
    }
}

export function startExactClearTimer() {
    const expiry = Number(localStorage.getItem(EXPIRY_KEY));
    if (!expiry) return;

    const remaining = expiry - Date.now();
    if (remaining > 0) {
        setTimeout(() => {
            localStorage.clear();
        }, remaining);
    }
}
