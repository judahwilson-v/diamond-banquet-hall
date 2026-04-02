import { describeSupabaseError, getCurrentSession, signInAdmin, signOutAdmin } from "./site-data.js";
import { SUPABASE_CONFIG_ERROR, supabaseClient } from "./supabase-config.js";

const allowedAdmins = new Map([
  ["judah@diamond.com", "super_admin"],
  ["empl@diamond.com", "staff_admin"]
]);

const normalizeEmail = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const resolveAdminAccess = async (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!allowedAdmins.has(normalizedEmail)) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from("admin_users")
    .select("email, role")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("login-form");
  const loginCard = document.getElementById("login-card");
  const emailInput = document.getElementById("login-email");
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
    emailInput?.classList.add("is-error");
    passwordInput?.classList.add("is-error");
    shakeTimer = window.setTimeout(() => {
      loginCard?.classList.remove("is-shaking");
    }, 500);
  };

  const clearErrorState = () => {
    loginCard?.classList.remove("is-shaking");
    emailInput?.classList.remove("is-error");
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
    const email = normalizeEmail(session?.user?.email);

    if (email) {
      const adminAccess = await resolveAdminAccess(email);

      if (adminAccess) {
        window.location.replace("admin.html");
        return;
      }

      await signOutAdmin();
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

    const email = normalizeEmail(emailInput?.value);
    const password = String(passwordInput?.value ?? "");

    if (!allowedAdmins.has(email)) {
      showErrorState();
      passwordInput.value = "";
      setStatus("This email is not allowlisted for the admin portal.", "error");
      pushToast("This email is not allowlisted for the admin portal.", "error");

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Sign In";
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
        submitButton.textContent = "Sign In";
      }

      return;
    }

    try {
      const session = await signInAdmin(email, password);
      const adminAccess = await resolveAdminAccess(email);

      if (!session || !adminAccess) {
        await signOutAdmin();
        throw new Error("This account is not configured for admin access.");
      }

      passwordInput.value = "";
      setStatus("");
      pushToast("Authentication successful.", "success");
      window.location.replace("admin.html");
    } catch (error) {
      console.error("[diamond-login] Unable to sign in.", error);
      showErrorState();
      passwordInput.value = "";
      const message = describeSupabaseError(error, "Unable to sign in.");
      setStatus(message, "error");
      pushToast(message, "error");

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Sign In";
      }
    }
  });

  [emailInput, passwordInput].forEach((field) => {
    field?.addEventListener("input", clearErrorState);
  });
});
