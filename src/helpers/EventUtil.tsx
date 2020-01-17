import 'custom-event-polyfill';

export function sendTokenEvent(token: string) {
  const event = new CustomEvent('elk_auth', { detail: token });

  window.dispatchEvent(event);
}
