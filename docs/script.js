const $ = (selector) => document.querySelector(selector);

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

function setStaticMeta() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const updatedEl = $("#lastUpdated");
  if (updatedEl) updatedEl.textContent = formatDate(new Date());
}

function setupNavToggle() {
  const btn = $(".nav-toggle");
  const links = $("#navLinks");
  if (!btn || !links) return;

  const close = () => {
    links.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) close();
  });

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Node)) return;
    if (links.contains(e.target) || btn.contains(e.target)) return;
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupModal() {
  const modal = $("#thanksModal");
  if (!(modal instanceof HTMLElement)) return { open: () => {}, close: () => {} };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  };

  const open = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  };

  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.hasAttribute("data-modal-close")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { open, close };
}

async function copyEmail() {
  const emailEl = $("#emailText");
  const noteEl = $("#formNote");
  const text = emailEl?.textContent?.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    if (noteEl) noteEl.textContent = "メールアドレスをコピーしました。";
    window.setTimeout(() => {
      if (noteEl) noteEl.textContent = "";
    }, 1800);
  } catch {
    if (noteEl) noteEl.textContent = "コピーに失敗しました（ブラウザの権限をご確認ください）。";
  }
}

function setupCopyEmail() {
  const btn = $("#copyEmailBtn");
  if (!btn) return;
  btn.addEventListener("click", () => void copyEmail());
}

/** お問い合わせフォームは見た目のみ（デモ）。送信は行わない。 */
function setupContactFormDemo(modalApi) {
  const form = $("#contactForm");
  const submitBtn = $("#submitBtn");
  if (!(form instanceof HTMLFormElement)) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = true;
      submitBtn.textContent = "…";
      window.setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "デモを試す";
      }, 400);
    }
    modalApi?.open?.();
  });
}

setStaticMeta();
setupNavToggle();
setupCopyEmail();
const modalApi = setupModal();
setupContactFormDemo(modalApi);
