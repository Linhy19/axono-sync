(function () {
  'use strict';

  const paths = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.34 5.66"/><path d="M20 4v7h-7"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    skip: '<path d="m5 5 9 7-9 7V5Z"/><path d="M19 5v14"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15"/><path d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15"/>',
    live: '<circle cx="12" cy="12" r="3"/><path d="M5.64 5.64a9 9 0 0 0 0 12.72M18.36 5.64a9 9 0 0 1 0 12.72"/>',
    goal: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5M4 12h5M15 12h5"/>',
    penalty: '<path d="M12 3 4 7v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V7Z"/><path d="m9 9 6 6M15 9l-6 6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    team: '<path d="M7 3h10v4a5 5 0 0 1-10 0Z"/><path d="M5 5H3v2a4 4 0 0 0 4 4M19 5h2v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/>',
    list: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    share: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.2.37.32.76.6 1 .3.27.7.4 1.1.4h.1v4h-.1c-.4 0-.8.13-1.1.4-.28.24-.4.63-.6 1Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    goalie: '<path d="M4 6h16l-2 14H6Z"/><path d="M8 10h8M7 14h10M9 6l3 14M15 6l-3 14"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    previous: '<path d="m15 18-6-6 6-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    undo: '<path d="M9 7 4 12l5 5"/><path d="M4 12h9a7 7 0 0 1 7 7"/>'
  };

  const tokenMap = new Map([
    ['➕', 'plus'], ['✕', 'close'], ['▶', 'play'], ['⏸', 'pause'], ['↺', 'refresh'],
    ['✎', 'edit'], ['⏭', 'skip'], ['🔗', 'link'], ['●', 'live'], ['⚽', 'goal'],
    ['🚫', 'penalty'], ['👥', 'users'], ['🏒', 'team'], ['📋', 'list'], ['📊', 'chart'],
    ['📤', 'share'], ['🔒', 'lock'], ['📍', 'pin'], ['👤', 'user'], ['📅', 'calendar'],
    ['⚙', 'settings'], ['✅', 'check'], ['🗑', 'trash'], ['🥅', 'goalie'], ['⚡', 'bolt'],
    ['☰', 'menu'], ['◀', 'previous'], ['ℹ️', 'info'], ['↶', 'undo']
  ]);

  function icon(name) {
    const path = paths[name];
    if (!path) return '';
    return `<svg class="ax-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function enhanceElement(element) {
    if (!(element instanceof HTMLElement) || element.children.length || element.querySelector(':scope > .ax-icon')) return;
    const text = element.textContent.trim();
    const token = Array.from(tokenMap.keys()).find((item) => text.startsWith(item));
    if (!token) return;
    const label = text.slice(token.length).trim();
    element.innerHTML = `${icon(tokenMap.get(token))}${label ? `<span class="ax-icon-label"></span>` : ''}`;
    if (label) element.querySelector('.ax-icon-label').textContent = label;
    if (!label && !element.getAttribute('aria-label') && element.title) element.setAttribute('aria-label', element.title);
  }

  function enhance(root) {
    if (root instanceof HTMLElement) enhanceElement(root);
    root.querySelectorAll?.('button, a, .entry-icon, .d-event-icon, .d-section-title, .location-line, .inline-icon-text, .pen-badge, .d-pen-badge, .toast, .a-toast, .d-toast, .d-clock-status, .a-info').forEach(enhanceElement);
  }

  function init() {
    enhance(document);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) enhanceElement(node.parentElement);
          else if (node.nodeType === Node.ELEMENT_NODE) enhance(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.AxonoIcons = { icon, enhance };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
