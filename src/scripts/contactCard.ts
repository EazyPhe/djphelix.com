const contactCards = document.querySelectorAll<HTMLElement>('[data-contact-card]');

contactCards.forEach((component) => {
  const download = component.querySelector<HTMLAnchorElement>('[data-contact-download]');
  const label = component.querySelector<HTMLElement>('[data-contact-download-label]');
  const platformNote = component.querySelector<HTMLElement>('[data-contact-platform-note]');
  if (!download || !label || !platformNote) return;

  const userAgent = navigator.userAgent || '';
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    component.dataset.platform = 'ios';
    download.removeAttribute('download');
    label.textContent = 'Save to iPhone Contacts';
    platformNote.textContent = 'Opens the shared vCard so iPhone can offer to create the contact.';
  } else if (isAndroid) {
    component.dataset.platform = 'android';
    download.removeAttribute('download');
    label.textContent = 'Save to Android Contacts';
    platformNote.textContent = 'Opens the shared vCard so Android can import it with Contacts.';
  } else {
    component.dataset.platform = 'desktop';
    label.textContent = 'Download Contact Card';
    platformNote.textContent = 'Works with iPhone, Android, and most contact apps.';
  }

  const relevantHelp = component.querySelector<HTMLDetailsElement>(
    `[data-platform-help="${component.dataset.platform}"]`
  );
  if (relevantHelp) relevantHelp.open = true;
});
