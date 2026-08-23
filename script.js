/* =========================================================
   AMOS MWANSA PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENT REFERENCES
     ========================================================= */

  const body = document.body;
  const header = document.querySelector("header");

  const burger = document.getElementById("burger");
  const navbar = document.getElementById("navbar");
  const darkModeToggle = document.getElementById("darkModeToggle");

  const navLinks = document.querySelectorAll("#navbar a");
  const sections = document.querySelectorAll("main section");


  /* =========================================================
     AOS ANIMATION
     ========================================================= */

  /*
    AOS is only activated if the library loaded successfully.

    The CSS also contains a fallback, so if AOS fails,
    your Skills, Experience, Projects and Certifications
    will still remain visible.
  */

  if (typeof AOS !== "undefined") {

    document.documentElement.classList.add("aos-enabled");

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60
    });

  }


  /* =========================================================
     DARK MODE
     ========================================================= */

  const savedTheme = localStorage.getItem("portfolio-theme");

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;


  function enableDarkMode() {

    body.classList.add("dark-mode");

    if (darkModeToggle) {

      darkModeToggle.textContent = "☀️";

      darkModeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );

      darkModeToggle.setAttribute(
        "title",
        "Switch to light mode"
      );

    }

  }


  function enableLightMode() {

    body.classList.remove("dark-mode");

    if (darkModeToggle) {

      darkModeToggle.textContent = "🌙";

      darkModeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );

      darkModeToggle.setAttribute(
        "title",
        "Switch to dark mode"
      );

    }

  }


  /* Load saved theme */

  if (savedTheme === "dark") {

    enableDarkMode();

  } else if (savedTheme === "light") {

    enableLightMode();

  } else if (prefersDarkMode) {

    enableDarkMode();

  } else {

    enableLightMode();

  }


  /* Dark mode button */

  if (darkModeToggle) {

    darkModeToggle.addEventListener("click", () => {

      const darkModeEnabled =
        body.classList.contains("dark-mode");


      if (darkModeEnabled) {

        enableLightMode();

        localStorage.setItem(
          "portfolio-theme",
          "light"
        );

      } else {

        enableDarkMode();

        localStorage.setItem(
          "portfolio-theme",
          "dark"
        );

      }

    });

  }


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  function openMenu() {

    if (!navbar || !burger) return;


    navbar.classList.add("open");

    body.classList.add("menu-open");

    burger.textContent = "✕";


    burger.setAttribute(
      "aria-expanded",
      "true"
    );


    burger.setAttribute(
      "aria-label",
      "Close navigation"
    );

  }


  function closeMenu() {

    if (!navbar || !burger) return;


    navbar.classList.remove("open");

    body.classList.remove("menu-open");

    burger.textContent = "☰";


    burger.setAttribute(
      "aria-expanded",
      "false"
    );


    burger.setAttribute(
      "aria-label",
      "Open navigation"
    );

  }


  function toggleMenu() {

    if (!navbar) return;


    if (navbar.classList.contains("open")) {

      closeMenu();

    } else {

      openMenu();

    }

  }


  if (burger && navbar) {

    burger.setAttribute(
      "aria-expanded",
      "false"
    );


    burger.setAttribute(
      "aria-controls",
      "navbar"
    );


    burger.addEventListener(
      "click",
      toggleMenu
    );

  }


  /* =========================================================
     CLOSE MENU AFTER CLICKING NAVIGATION LINK
     ========================================================= */

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 820) {

        closeMenu();

      }

    });

  });


  /* =========================================================
     CLOSE MOBILE MENU WITH ESC KEY
     ========================================================= */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      navbar &&
      navbar.classList.contains("open")
    ) {

      closeMenu();

    }

  });


  /* =========================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ========================================================= */

  document.addEventListener("click", event => {

    if (!navbar || !burger) return;


    const clickedInsideNavbar =
      navbar.contains(event.target);


    const clickedBurger =
      burger.contains(event.target);


    if (
      navbar.classList.contains("open") &&
      !clickedInsideNavbar &&
      !clickedBurger
    ) {

      closeMenu();

    }

  });


  /* =========================================================
     RESET MOBILE NAVIGATION WHEN SCREEN BECOMES DESKTOP
     ========================================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 820 &&
      navbar &&
      navbar.classList.contains("open")
    ) {

      closeMenu();

    }

  });


  /* =========================================================
     HEADER SCROLL EFFECT
     ========================================================= */

  function updateHeader() {

    if (!header) return;


    if (window.scrollY > 20) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", event => {

        const targetId =
          anchor.getAttribute("href");


        /*
          Ignore empty # links.
          This also prevents errors from placeholder project links.
        */

        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          10;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });


  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  function updateActiveNavigation() {

    if (!sections.length) return;


    const headerHeight =
      header
        ? header.offsetHeight
        : 0;


    const scrollPosition =
      window.scrollY +
      headerHeight +
      120;


    let currentSection = "";


    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;


      const sectionHeight =
        section.offsetHeight;


      const sectionId =
        section.getAttribute("id");


      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          sectionId;

      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");


      const href =
        link.getAttribute("href");


      if (
        currentSection &&
        href === `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  }


  updateActiveNavigation();


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* =========================================================
     AUTOMATIC COPYRIGHT YEAR
     ========================================================= */

  const footer =
    document.querySelector("footer");


  if (footer) {

    const footerParagraphs =
      footer.querySelectorAll("p");


    if (footerParagraphs.length > 0) {

      footerParagraphs[0].innerHTML =
        `&copy; ${new Date().getFullYear()} Amos Mwansa. All Rights Reserved.`;

    }

  }


  /* =========================================================
     EXTERNAL LINK SECURITY
     ========================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  externalLinks.forEach(link => {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });


  /* =========================================================
     EMAIL LINKS
     ========================================================= */

  const emailLinks =
    document.querySelectorAll(
      'a[href^="mailto:"]'
    );


  emailLinks.forEach(link => {

    link.setAttribute(
      "title",
      "Send Amos an email"
    );

  });


  /* =========================================================
     TELEPHONE LINKS
     ========================================================= */

  const phoneLinks =
    document.querySelectorAll(
      'a[href^="tel:"]'
    );


  phoneLinks.forEach(link => {

    link.setAttribute(
      "title",
      "Call Amos Mwansa"
    );

  });


  /* =========================================================
     CV DOWNLOAD LINK
     ========================================================= */

  const cvLinks =
    document.querySelectorAll(
      'a[href$=".pdf"]'
    );


  cvLinks.forEach(link => {

    if (
      link.hasAttribute("download")
    ) {

      link.setAttribute(
        "title",
        "Download Amos Mwansa CV"
      );

    }

  });


  /* =========================================================
     PAGE LOADED
     ========================================================= */

  body.classList.add("page-loaded");

});
