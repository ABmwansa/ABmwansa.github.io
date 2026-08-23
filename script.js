/* =========================================================
   AMOS MWANSA PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
     ========================= */

  const body = document.body;

  const header = document.querySelector("header");

  const burger = document.getElementById("burger");

  const navbar = document.getElementById("navbar");

  const darkModeToggle =
    document.getElementById("darkModeToggle");

  const navLinks =
    document.querySelectorAll("#navbar a");

  const sections =
    document.querySelectorAll("main section");


  /* =========================
     AOS INITIALIZATION
     ========================= */

  if (typeof AOS !== "undefined") {

    AOS.init({

      duration: 700,

      easing: "ease-out-cubic",

      once: true,

      offset: 70

    });

  }


  /* =========================
     DARK MODE
     ========================= */

  const savedTheme =
    localStorage.getItem("portfolio-theme");

  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  function enableDarkMode() {

    body.classList.add("dark-mode");

    darkModeToggle.textContent = "☀️";

    darkModeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

  }


  function enableLightMode() {

    body.classList.remove("dark-mode");

    darkModeToggle.textContent = "🌙";

    darkModeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

  }


  if (savedTheme === "dark") {

    enableDarkMode();

  } else if (savedTheme === "light") {

    enableLightMode();

  } else if (systemPrefersDark) {

    enableDarkMode();

  } else {

    enableLightMode();

  }


  if (darkModeToggle) {

    darkModeToggle.addEventListener(
      "click",
      () => {

        const darkModeEnabled =
          body.classList.contains(
            "dark-mode"
          );

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

      }
    );

  }


  /* =========================
     MOBILE MENU
     ========================= */

  function openMenu() {

    navbar.classList.add("open");

    body.classList.add("menu-open");

    burger.textContent = "✕";

    burger.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  function closeMenu() {

    navbar.classList.remove("open");

    body.classList.remove("menu-open");

    burger.textContent = "☰";

    burger.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  function toggleMenu() {

    const isOpen =
      navbar.classList.contains("open");

    if (isOpen) {

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

    burger.addEventListener(
      "click",
      toggleMenu
    );

  }


  /* =========================
     CLOSE MOBILE MENU
     WHEN LINK IS CLICKED
     ========================= */

  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (
          window.innerWidth <= 820
        ) {

          closeMenu();

        }

      }
    );

  });


  /* =========================
     ESC KEY CLOSE MENU
     ========================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        navbar.classList.contains(
          "open"
        )
      ) {

        closeMenu();

      }

    }
  );


  /* =========================
     CLOSE MENU WHEN RESIZING
     TO DESKTOP
     ========================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 820 &&
        navbar.classList.contains(
          "open"
        )
      ) {

        closeMenu();

      }

    }
  );


  /* =========================
     HEADER SCROLL EFFECT
     ========================= */

  function updateHeader() {

    if (window.scrollY > 20) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =========================
     ACTIVE NAVIGATION LINK
     ========================= */

  function updateActiveNav() {

    const scrollPosition =
      window.scrollY + 160;


    sections.forEach(
      section => {

        const sectionTop =
          section.offsetTop;

        const sectionHeight =
          section.offsetHeight;

        const sectionId =
          section.getAttribute("id");


        if (
          scrollPosition >=
            sectionTop &&

          scrollPosition <
            sectionTop +
            sectionHeight
        ) {

          navLinks.forEach(
            link => {

              link.classList.remove(
                "active"
              );

              const href =
                link.getAttribute(
                  "href"
                );

              if (
                href ===
                `#${sectionId}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            }
          );

        }

      }
    );

  }


  updateActiveNav();


  window.addEventListener(
    "scroll",
    updateActiveNav,
    {
      passive: true
    }
  );


  /* =========================
     SMOOTH INTERNAL LINKS
     ========================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        event => {

          const targetId =
            anchor.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            const headerHeight =
              header.offsetHeight;


            const targetPosition =
              target.offsetTop -
              headerHeight -
              10;


            window.scrollTo({

              top: targetPosition,

              behavior: "smooth"

            });

          }

        }
      );

    });


  /* =========================
     AUTOMATIC FOOTER YEAR
     ========================= */

  const footer =
    document.querySelector(
      "footer"
    );


  if (footer) {

    const copyright =
      footer.querySelector(
        "p"
      );


    if (copyright) {

      copyright.innerHTML =
        `&copy; ${new Date().getFullYear()} Amos Mwansa. All Rights Reserved.`;

    }

  }


  /* =========================
     CARD REVEAL ENHANCEMENT
     ========================= */

  const cards =
    document.querySelectorAll(
      ".project-card, .skill-category"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const cardObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList
                  .add(
                    "card-visible"
                  );


                cardObserver
                  .unobserve(
                    entry.target
                  );

              }

            }
          );

        },

        {

          threshold: 0.08

        }

      );


    cards.forEach(
      card => {

        cardObserver.observe(
          card
        );

      }
    );

  }


  /* =========================
     EXTERNAL LINKS SECURITY
     ========================= */

  const externalLinks =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  externalLinks.forEach(
    link => {

      if (
        !link.hasAttribute("rel")
      ) {

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );

      }

    }
  );

});
