(() => {
  const openButton = document.querySelector('[data-modal-open]');
  const backdrop = document.querySelector('[data-modal]');
  const closeButton = document.querySelector('[data-modal-close]');

  if (!openButton || !backdrop || !closeButton) return;

  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      backdrop.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  };

  const closeModal = () => {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (!backdrop.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
})();
