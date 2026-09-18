export function initSoundModes() {
  document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => { const aware = button.dataset.mode === 'aware'; document.querySelector('#sound').classList.toggle('aware', aware); document.querySelectorAll('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); document.querySelector('#sound-mode-description').textContent = aware ? '让身边的声音，自然融入此刻。' : '让纷扰退场。只留下你与音乐。'; }));
}
