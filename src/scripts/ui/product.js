import { featureContent, finishes } from '../data/catalog.js';

export function initProductExperience({ closeMenu = () => {} } = {}) {
  const featureDialog = document.querySelector('#feature-dialog');
  const configDialog = document.querySelector('#config-dialog');
  const toast = document.querySelector('#toast');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let selectedFinish = 'silver';
  let toastTimer;
  let previousFocus;

  const setFinish = finish => {
    if (!finishes[finish]) return;
    selectedFinish = finish;
    const item = finishes[finish];
    const image = document.querySelector('#color-product');
    const configImage = document.querySelector('#config-product');
    image.src = item.image; image.alt = `Morrow One ${item.name}配色`;
    configImage.src = item.image; configImage.alt = `Morrow One ${item.name}配色`;
    document.querySelector('#color-name').textContent = item.name;
    document.querySelector('#color-description').textContent = item.description;
    document.querySelector('#config-summary').textContent = `Morrow One · ${item.name}`;
    document.querySelectorAll('[data-finish]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.finish === finish)));
  };
  document.querySelectorAll('[data-finish]').forEach(button => button.addEventListener('click', () => setFinish(button.dataset.finish)));

  const openDialog = dialog => { closeMenu(); previousFocus = document.activeElement; dialog.showModal(); document.body.classList.add('dialog-open'); };
  document.querySelectorAll('[data-open-configurator]').forEach(button => button.addEventListener('click', () => openDialog(configDialog)));
  document.querySelectorAll('[data-feature]').forEach(button => button.addEventListener('click', () => {
    const data = featureContent[button.dataset.feature];
    document.querySelector('#feature-eyebrow').textContent = data.eyebrow;
    document.querySelector('#feature-title').textContent = data.title;
    document.querySelector('#feature-description').textContent = data.description;
    const points = document.querySelector('#feature-points'); points.replaceChildren();
    data.points.forEach(([heading, copy]) => { const item = document.createElement('div'); const title = document.createElement('strong'); const text = document.createElement('span'); title.textContent = heading; text.textContent = copy; item.append(title, text); points.append(item); });
    openDialog(featureDialog);
  }));

  [featureDialog, configDialog].forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => { if (event.target !== dialog) return; const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); });
  });
  document.querySelector('#confirm-selection').addEventListener('click', () => { configDialog.close(); document.querySelector('#colors').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' }); toast.textContent = `已选择 Morrow One · ${finishes[selectedFinish].name}`; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3500); });
}
