import { describeSupabaseError, getCurrentSession, signInAdmin } from "./site-data.js";
import { SUPABASE_CONFIG_ERROR } from "./supabase-config.js";

const userMap = {
  judah: "judah@diamond.com",
  empl: "empl@diamond.com"
};

const accessLevelByUsername = {
  judah: "admin",
  empl: "staff"
};

const getUsernameForEmail = (email) =>
  Object.entries(userMap).find(([, mappedEmail]) => mappedEmail === email)?.[0] ?? null;

const setRoleSession = (username) => {
  const normalizedUsername = String(username ?? "").trim().toLowerCase();
  const email = userMap[normalizedUsername];
  const accessLevel = accessLevelByUsername[normalizedUsername];

  if (!email || !accessLevel) {
    return;
  }

  sessionStorage.setItem("diamond_admin_role", normalizedUsername);
  sessionStorage.setItem("diamond_admin_username", normalizedUsername);
  sessionStorage.setItem("diamond_admin_email", email);
  sessionStorage.setItem("role", accessLevel);
};

document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("login-form");
  const loginCard = document.getElementById("login-card");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");
  const loginStatus = document.getElementById("login-status");
  const submitButton = loginForm?.querySelector('button[type="submit"]');
  let shakeTimer = null;

  const ensureToastStack = () => {
    let stack = document.getElementById("toast-stack");

    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toast-stack";
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      stack.setAttribute("aria-atomic", "true");
      document.body.append(stack);
    }

    return stack;
  };

  const pushToast = (message, tone = "default") => {
    if (!message) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.tone = tone;
    toast.textContent = message;
    ensureToastStack().append(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 250);
    }, 3200);
  };

  const setStatus = (message, tone = "default") => {
    if (!loginStatus) {
      return;
    }

    loginStatus.textContent = message;
    loginStatus.dataset.tone = tone;
  };

  const showErrorState = () => {
    if (shakeTimer) {
      window.clearTimeout(shakeTimer);
    }

    loginCard?.classList.remove("is-shaking");
    void loginCard?.offsetWidth;
    loginCard?.classList.add("is-shaking");
    usernameInput?.classList.add("is-error");
    passwordInput?.classList.add("is-error");
    shakeTimer = window.setTimeout(() => {
      loginCard?.classList.remove("is-shaking");
    }, 500);
  };

  const clearErrorState = () => {
    loginCard?.classList.remove("is-shaking");
    usernameInput?.classList.remove("is-error");
    passwordInput?.classList.remove("is-error");
  };

  if (SUPABASE_CONFIG_ERROR) {
    const message = describeSupabaseError(
      SUPABASE_CONFIG_ERROR,
      "Admin sign-in is temporarily unavailable."
    );

    setStatus(message, "error");
    pushToast(message, "error");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Config Required";
    }

    return;
  }

  try {
    const session = await getCurrentSession();
    const email = session?.user?.email ?? "";
    const existingUsername = getUsernameForEmail(email);

    if (existingUsername) {
      setRoleSession(existingUsername);
      window.location.replace("admin.html");
      return;
    }
  } catch (_error) {
    // Keep the login form visible if session lookup fails.
  }

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrorState();
    setStatus("Authenticating...");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Authenticating...";
    }

    const username = String(usernameInput?.value ?? "").trim().toLowerCase();
    const password = String(passwordInput?.value ?? "");
    const email = userMap[username];

    if (!email) {
      showErrorState();
      passwordInput.value = "";
      setStatus("That name is not authorized for this admin portal.", "error");
      pushToast("That name is not authorized for this admin portal.", "error");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
      }
      return;
    }

    if (!password) {
      showErrorState();
      passwordInput.value = "";
      setStatus("Enter your password to continue.", "error");
      pushToast("Enter your password to continue.", "error");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
      }
      return;
    }

    try {
      const data = await signInAdmin(email, password);
      setRoleSession(username);
      passwordInput.value = "";
      setStatus("");
      pushToast("Authentication successful.", "success");

      if (data) {
        window.location.replace("admin.html");
        return;
      }

      throw new Error("No active session was returned after login.");
    } catch (error) {
      console.error("[diamond-login] Unable to sign in.", error);
      showErrorState();
      passwordInput.value = "";
      const message = describeSupabaseError(error, "Unable to sign in.");
      setStatus(message, "error");
      pushToast(message, "error");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
      }
    }
  });

  [usernameInput, passwordInput].forEach((field) => {
    field?.addEventListener("input", clearErrorState);
  });
});
