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

const boot = () => {
  mountDiamondConcierge();
  window.DiamondConciergeWidget = {
    mount: mountDiamondConcierge,
  };
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
