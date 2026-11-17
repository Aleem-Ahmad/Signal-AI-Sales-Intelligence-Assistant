import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Shery from 'sheryjs';
import 'sheryjs/dist/Shery.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initShery = () => {
  if (typeof window === 'undefined') return;

  // 1. Mouse Follower
  try {
    Shery.mouseFollower({
      skew: true,
      ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
      duration: 0.6,
    });
  } catch (err) {
    console.debug('Shery mouseFollower note:', err?.message);
  }

  // 2. Magnetic Elements
  initMagnets();

  // 3. Entrance stagger animations on cards
  initCardAnimations();
};

export const initMagnets = () => {
  if (typeof window === 'undefined') return;

  try {
    Shery.makeMagnet('.magnet-target, .brand-icon, .nav-link, .primary-button, .type-option, .icon-button, .delete-button, .back-link, .header-tag, .history-count', {
      ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
      duration: 0.8,
    });
  } catch (err) {
    console.debug('Shery makeMagnet note:', err?.message);
  }
};

export const initTextAnimations = (selector = '.shery-title') => {
  if (typeof window === 'undefined') return;

  try {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    Shery.textAnimate(selector, {
      style: 1,
      y: 10,
      delay: 0.05,
      duration: 1.2,
      ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
      multiplier: 0.1,
    });
  } catch (err) {
    console.debug('Shery textAnimate note:', err?.message);
  }
};

export const initCardAnimations = () => {
  if (typeof window === 'undefined') return;

  try {
    gsap.fromTo(
      '.input-panel, .result-panel, .summary-block, .insight-card, .history-item',
      {
        opacity: 0,
        y: 18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
      }
    );
  } catch (err) {
    console.debug('GSAP card animation note:', err?.message);
  }
};

export const initImageEffect = (selector = '.shery-image-banner') => {
  if (typeof window === 'undefined') return;

  try {
    const el = document.querySelector(selector);
    if (!el) return;

    Shery.imageEffect(selector, {
      style: 2,
      debug: false,
      config: {
        resolutionXY: { value: 100 },
        distortion: { value: true },
        mode: { value: -3 },
        mousemove: { value: 0 },
        modeA: { value: 1 },
      },
    });
  } catch (err) {
    console.debug('Shery imageEffect note:', err?.message);
  }
};

export default {
  initShery,
  initMagnets,
  initTextAnimations,
  initCardAnimations,
  initImageEffect,
};

