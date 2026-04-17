import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Chatbot } from './components/Chatbot';
import styles from './index.css?inline';

const HOST_ID = 'diamond-concierge-widget-host';
const APP_ATTR = 'data-diamond-concierge-app';
const STYLE_ATTR = 'data-diamond-concierge-styles';

type ConciergeHost = HTMLElement & {
  __diamondConciergeRoot?: Root;
};

declare global {
  interface Window {
    DiamondConciergeWidget?: {
      mount: typeof mountDiamondConcierge;
      open: typeof openDiamondConcierge;
    };
  }
}

const ensureHost = (target?: HTMLElement | null) => {
  if (target instanceof HTMLElement) {
    return target as ConciergeHost;
  }

  let host = document.getElementById(HOST_ID) as ConciergeHost | null;

  if (!host) {
    host = document.createElement('div') as ConciergeHost;
    host.id = HOST_ID;
    document.body.appendChild(host);
  }

  return host;
};

const ensureAppNode = (host: ConciergeHost) => {
  const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

  if (!shadowRoot.querySelector(`[${STYLE_ATTR}]`)) {
    const styleTag = document.createElement('style');
    styleTag.setAttribute(STYLE_ATTR, '');
    styleTag.textContent = styles;
    shadowRoot.appendChild(styleTag);
  }

  let appNode = shadowRoot.querySelector(`[${APP_ATTR}]`) as HTMLDivElement | null;

  if (!appNode) {
    appNode = document.createElement('div');
    appNode.setAttribute(APP_ATTR, '');
    shadowRoot.appendChild(appNode);
  }

  return appNode;
};

export function mountDiamondConcierge(target?: HTMLElement | null) {
  const host = ensureHost(target);
  const appNode = ensureAppNode(host);

  if (!host.__diamondConciergeRoot) {
    host.__diamondConciergeRoot = createRoot(appNode);
  }

  host.__diamondConciergeRoot.render(
    <StrictMode>
      <Chatbot />
    </StrictMode>,
  );

  return host.__diamondConciergeRoot;
}

export function openDiamondConcierge(target?: HTMLElement | null) {
  mountDiamondConcierge(target);

  const host = ensureHost(target);

  const tryOpen = (attempt = 0) => {
    const toggle = host.shadowRoot?.querySelector(
      '[data-diamond-concierge-toggle]'
    ) as HTMLButtonElement | null;

    if (!(toggle instanceof HTMLButtonElement)) {
      if (attempt < 8) {
        window.setTimeout(() => {
          tryOpen(attempt + 1);
        }, 120);
      }
      return;
    }

    if (toggle.getAttribute('aria-expanded') !== 'true') {
      toggle.click();
    } else {
      toggle.focus();
    }
  };

  tryOpen();
}

window.DiamondConciergeWidget = {
  mount: mountDiamondConcierge,
  open: openDiamondConcierge,
};
