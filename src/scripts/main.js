import { initNavigation } from './ui/navigation.js';
import { initProductExperience } from './ui/product.js';
import { initSoundModes } from './ui/sound.js';

const navigation = initNavigation();
initProductExperience(navigation);
initSoundModes();

if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
