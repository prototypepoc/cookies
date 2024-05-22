document.addEventListener('DOMContentLoaded', function () {
    const consentModal = document.getElementById('cookie-consent-modal');
    const floatingButton = document.getElementById('floating-button');
    const acceptAllButton = document.getElementById('accept-all');
    const manageSettingsButton = document.getElementById('manage-settings');

    const functionalCookiesCheckbox = document.getElementById('functional-cookies');
    const analyticsCookiesCheckbox = document.getElementById('analytics-cookies');
    const advertisingCookiesCheckbox = document.getElementById('advertising-cookies');

    const logAction = (action) => {
        const logs = JSON.parse(localStorage.getItem('userActions')) || [];
        logs.push({ action, timestamp: new Date().toISOString() });
        localStorage.setItem('userActions', JSON.stringify(logs));
    };

    const updateFloatingButtonVisibility = () => {
        const originalSettings = JSON.parse(localStorage.getItem('cookieSettings'));
        const currentSettings = {
            functional: functionalCookiesCheckbox.checked,
            analytics: analyticsCookiesCheckbox.checked,
            advertising: advertisingCookiesCheckbox.checked,
        };
        floatingButton.style.display = JSON.stringify(originalSettings) === JSON.stringify(currentSettings) ? 'none' : 'block';
    };

    const saveCookieSettings = () => {
        const settings = {
            functional: functionalCookiesCheckbox.checked,
            analytics: analyticsCookiesCheckbox.checked,
            advertising: advertisingCookiesCheckbox.checked,
        };
        localStorage.setItem('cookieSettings', JSON.stringify(settings));
        logAction('Settings Saved');
        updateFloatingButtonVisibility();
        alert('Settings have been saved.');
    };

    acceptAllButton.addEventListener('click', () => {
        functionalCookiesCheckbox.checked = true;
        analyticsCookiesCheckbox.checked = true;
        advertisingCookiesCheckbox.checked = true;
        saveCookieSettings();
        consentModal.style.display = 'none';
        logAction('Accepted All Cookies');
    });

    manageSettingsButton.addEventListener('click', () => {
        saveCookieSettings();
        consentModal.style.display = 'none';
        logAction('Managed Cookie Settings');
    });

    floatingButton.addEventListener('click', () => {
        saveCookieSettings();
    });

    [functionalCookiesCheckbox, analyticsCookiesCheckbox, advertisingCookiesCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', updateFloatingButtonVisibility);
    });

    const savedSettings = JSON.parse(localStorage.getItem('cookieSettings'));
    if (savedSettings) {
        functionalCookiesCheckbox.checked = savedSettings.functional;
        analyticsCookiesCheckbox.checked = savedSettings.analytics;
        advertisingCookiesCheckbox.checked = savedSettings.advertising;
        consentModal.style.display = 'none';
    } else {
        consentModal.style.display = 'flex';
    }
});
