'use strict';

/* =========================
   HELPER FUNCTION
========================= */
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active");
};

/* =========================
   SIDEBAR TOGGLE
========================= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar);
});

/* =========================
   TESTIMONIAL MODAL
========================= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const testimonialsModalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const testimonialsOverlay = document.querySelector("[data-overlay]");

const testimonialsModalImg = document.querySelector("[data-modal-img]");
const testimonialsModalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleTestimonialsModal = () => {
  testimonialsModalContainer.classList.toggle("active");
  testimonialsOverlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    testimonialsModalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    testimonialsModalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    testimonialsModalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    toggleTestimonialsModal();
  });
});

modalCloseBtn.addEventListener("click", toggleTestimonialsModal);
testimonialsOverlay.addEventListener("click", toggleTestimonialsModal);

/* =========================
   FILTER SYSTEM (PROJECTS)
========================= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => {
  elementToggleFunc(select);
});

const filterFunc = (value) => {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();

    if (value === "all" || value === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();

    selectValue.innerText = this.innerText;
    elementToggleFunc(select);

    filterFunc(value);
  });
});

let lastActiveBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();

    selectValue.innerText = this.innerText;
    filterFunc(value);

    lastActiveBtn.classList.remove("active");
    this.classList.add("active");
    lastActiveBtn = this;
  });
});

/* =========================
   CONTACT FORM VALIDATION
========================= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

/* =========================
   PAGE NAVIGATION
========================= */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const target = this.innerHTML.toLowerCase();

    pages.forEach((page, i) => {
      if (page.dataset.page === target) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});

/* =========================
   SLIDESHOW (EVENTS + PROJECTS)
========================= */
document.querySelectorAll("[data-slideshow]").forEach(slideshow => {
  const images = slideshow.querySelectorAll("img");
  let current = 0;

  if (images.length === 0) return;

  images.forEach(img => img.classList.remove("active"));
  images[0].classList.add("active");

  setInterval(() => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
  }, 2500);
});

/* =========================
   PROJECT MODAL (FIXED)
========================= */
const projectItems = document.querySelectorAll(".project-item");
const modalContainer = document.querySelector("[data-project-modal-container]");
const modalImg = document.querySelector("[data-project-modal-img]");
const modalTitle = document.querySelector("[data-project-modal-title]");
const modalDesc = document.querySelector("[data-project-modal-desc]");
const modalClose = document.querySelector("[data-project-modal-close]");
const overlay = document.querySelector("[data-project-overlay]");

const openProjectModal = (item) => {
  const img = item.querySelector("img");
  const title = item.querySelector(".project-title");
  const desc = item.querySelector(".project-category");

  modalImg.src = img?.src || "";
  modalTitle.textContent = title?.textContent || "";
  modalDesc.textContent = desc?.textContent || "";

  modalContainer.classList.add("active");
};

projectItems.forEach(item => {
  const eyeIcon = item.querySelector(".project-item-icon-box");

  if (!eyeIcon) return;

  eyeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    openProjectModal(item);
  });
});

/* CLOSE MODAL (FIXED & RELIABLE) */
const closeProjectModal = () => {
  modalContainer.classList.remove("active");
};

modalClose.addEventListener("click", closeProjectModal);
overlay.addEventListener("click", closeProjectModal);

/* EXTRA SAFETY: ESC key closes modal */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});
