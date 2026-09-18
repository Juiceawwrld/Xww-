export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('#nav-links');
  if (!toggle || !links) return { close: () => {} };
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', '展开导航'); links.classList.remove('open'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? '收起导航' : '展开导航'); links.classList.toggle('open', open); });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) close(); });
  return { close };
}
