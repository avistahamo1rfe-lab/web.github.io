document.addEventListener("DOMContentLoaded", () => {

  /* ---- Mobile nav toggle ---- */
  const navTrigger = document.getElementById("navTrigger");
  const mobileNav = document.getElementById("mobileNav");

  navTrigger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    navTrigger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navTrigger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- Sepia reading mode ---- */
  const modeToggle = document.getElementById("modeToggle");
  const modeToggleMobile = document.getElementById("modeToggleMobile");
  const body = document.body;

  const applyMode = (sepia) => {
    body.classList.toggle("sepia", sepia);
    modeToggle.setAttribute("aria-pressed", String(sepia));
    modeToggle.querySelector("span:last-child") &&
      (modeToggle.lastChild.textContent = sepia ? " paper mode" : " reading mode");
    modeToggleMobile.textContent = sepia ? "Paper reading mode" : "Sepia reading mode";
  };

  const saved = localStorage.getItem("mv-sepia") === "true";
  applyMode(saved);

  const toggleMode = () => {
    const next = !body.classList.contains("sepia");
    applyMode(next);
    localStorage.setItem("mv-sepia", String(next));
  };

  modeToggle.addEventListener("click", toggleMode);
  modeToggleMobile.addEventListener("click", toggleMode);

  /* ---- Essay index filtering ---- */
  const chips = document.querySelectorAll(".filter-chip");
  const items = document.querySelectorAll(".index-item");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      const tag = chip.dataset.tag;
      items.forEach(item => {
        const match = tag === "all" || item.querySelector(".index-tag").textContent === tag;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---- Back to top ---- */
  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
