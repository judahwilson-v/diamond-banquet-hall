const CONCIERGE_MODULE_PATH = "/ai-widget/diamond-concierge.js";
const OPENING_LABEL = "Opening AI Chat...";

let conciergeModulePromise = null;

const resolveTriggerLabel = (trigger) => {
  if (!(trigger instanceof HTMLElement)) {
    return "";
  }

  const explicitLabel = trigger.dataset.conciergeLabel;

  if (explicitLabel) {
    return explicitLabel;
  }

  return trigger.textContent?.trim() || "";
};

const setTriggerLoadingState = (trigger, isLoading) => {
  if (!(trigger instanceof HTMLButtonElement)) {
    return;
  }

  if (!trigger.dataset.conciergeLabel) {
    trigger.dataset.conciergeLabel = resolveTriggerLabel(trigger);
  }

  trigger.disabled = isLoading;
  trigger.setAttribute("aria-busy", String(isLoading));
  trigger.textContent = isLoading ? OPENING_LABEL : trigger.dataset.conciergeLabel;
};

const loadConciergeModule = async () => {
  if (window.DiamondConciergeWidget?.open) {
    return window.DiamondConciergeWidget;
  }

  if (!conciergeModulePromise) {
    conciergeModulePromise = import(CONCIERGE_MODULE_PATH).catch((error) => {
      conciergeModulePromise = null;
      throw error;
    });
  }

  const moduleExports = await conciergeModulePromise;

  if (typeof moduleExports.openDiamondConcierge === "function") {
    return moduleExports;
  }

  if (window.DiamondConciergeWidget?.open) {
    return window.DiamondConciergeWidget;
  }

  throw new Error("Diamond concierge widget did not expose an opener.");
};

export const openConciergeChat = async (trigger) => {
  setTriggerLoadingState(trigger, true);

  try {
    const concierge = await loadConciergeModule();

    if (typeof concierge.openDiamondConcierge === "function") {
      concierge.openDiamondConcierge();
      return;
    }

    concierge.open();
  } catch (error) {
    console.error("Unable to open the Diamond concierge widget.", error);
  } finally {
    setTriggerLoadingState(trigger, false);
  }
};
