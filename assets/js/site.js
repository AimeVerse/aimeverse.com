(function () {
  "use strict";

  var scriptEl = document.currentScript;
  if (!scriptEl) {
    var scripts = document.querySelectorAll("script[src]");
    scriptEl = scripts[scripts.length - 1];
  }

  var scriptUrl = new URL(scriptEl.getAttribute("src"), window.location.href);
  var siteRootUrl = new URL("../../", scriptUrl);

  var headerFallback =
    '<a class="skip-link" href="#main-content">Skip to content</a>' +
    '<header class="site-header"><div class="container header-inner">' +
    '<a class="brand" href="/" data-route="/">' +
    '<img class="brand-logo" src="/assets/img/aime-logo-mark.svg" data-asset-src="assets/img/aime-logo-mark.svg" alt="" aria-hidden="true">' +
    '<span class="brand-text">Aime Technologies</span>' +
    "</a>" +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><span class="nav-toggle-label">Menu</span></button>' +
    '<nav id="site-nav" class="site-nav" aria-label="Main navigation" data-site-nav>' +
    '<a href="/" data-route="/" data-nav-link>Home</a>' +
    '<a href="/technology/" data-route="/technology/" data-nav-link>Technology</a>' +
    '<a href="/platform/" data-route="/platform/" data-nav-link>Platform</a>' +
    '<a href="/xpell-ai/" data-route="/xpell-ai/" data-nav-link>xpell-ai</a>' +
    '<a href="/projects/" data-route="/projects/" data-nav-link>Projects</a>' +
    '<a href="/blog/" data-route="/blog/" data-nav-link>Blog</a>' +
    '<a href="/about/" data-route="/about/" data-nav-link>About</a>' +
    '<a href="/contact/" data-route="/contact/" data-nav-link>Contact</a>' +
    "</nav>" +
    "</div></header>";

  var footerFallback =
    '<footer class="site-footer"><div class="container footer-inner">' +
    '<p class="footer-description">Aime Technologies builds AI-native runtime systems for real-time human and AI collaboration.</p>' +
    '<nav class="footer-nav" aria-label="Footer navigation">' +
    '<a href="/" data-route="/">Home</a>' +
    '<a href="/technology/" data-route="/technology/">Technology</a>' +
    '<a href="/platform/" data-route="/platform/">Platform</a>' +
    '<a href="/xpell-ai/" data-route="/xpell-ai/">xpell-ai</a>' +
    '<a href="/projects/" data-route="/projects/">Projects</a>' +
    '<a href="/blog/" data-route="/blog/">Blog</a>' +
    '<a href="/about/" data-route="/about/">About</a>' +
    '<a href="/contact/" data-route="/contact/">Contact</a>' +
    '</nav><section class="footer-connect" aria-labelledby="connect-title">' +
    '<h3 id="connect-title">Connect with Aime</h3>' +
    '<div class="social-links">' +
    '<a href="https://discord.gg/VP3UFUYH5q" target="_blank" rel="noopener noreferrer">Discord</a>' +
    '<a href="https://www.linkedin.com/company/aimeverse/" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
    '<a href="https://www.youtube.com/@aimetechnologies" target="_blank" rel="noopener noreferrer">YouTube</a>' +
    '<a href="https://www.facebook.com/aimetechnologies/" target="_blank" rel="noopener noreferrer">Facebook</a>' +
    '<a href="https://www.instagram.com/aimetechnologies" target="_blank" rel="noopener noreferrer">Instagram</a>' +
    '<a href="https://x.com/Aimeverseai" target="_blank" rel="noopener noreferrer">X</a>' +
    "</div></section>" +
    '<div class="footer-legal"><p class="copyright">&copy; 2026 Aime Technologies</p><p class="tagline">Building AI-native systems.</p></div>' +
    "</div></footer>";

  function routeToHref(route) {
    if (!route || route === "/") {
      return siteRootUrl.href;
    }

    if (route === "/xpell-ai/") {
      return new URL("xpell-ai/index.html", siteRootUrl).href;
    }

    var clean = route.replace(/^\/+/, "");
    return new URL(clean, siteRootUrl).href;
  }

  function applyRouteLinks(scope) {
    var links = (scope || document).querySelectorAll("[data-route]");
    links.forEach(function (link) {
      var route = link.getAttribute("data-route");
      link.setAttribute("href", routeToHref(route));
    });
  }

  function applyAssetSources(scope) {
    var assets = (scope || document).querySelectorAll("[data-asset-src]");
    assets.forEach(function (asset) {
      var assetPath = asset.getAttribute("data-asset-src");
      if (!assetPath) {
        return;
      }
      asset.setAttribute("src", new URL(assetPath, siteRootUrl).href);
    });
  }

  function detectCurrentRoute(pathname) {
    var lowerPath = pathname.toLowerCase();

    if (lowerPath.indexOf("/blog/posts/") !== -1) {
      return "/blog/";
    }

    var routes = [
      "/technology/",
      "/platform/",
      "/xpell-ai/",
      "/projects/",
      "/blog/",
      "/about/",
      "/contact/"
    ];

    for (var i = 0; i < routes.length; i += 1) {
      var route = routes[i];
      if (lowerPath.indexOf(route) !== -1 || lowerPath.endsWith(route + "index.html")) {
        return route;
      }
    }

    return "/";
  }

  function highlightActiveNav() {
    var currentRoute = detectCurrentRoute(window.location.pathname);
    var navLinks = document.querySelectorAll("[data-nav-link]");

    navLinks.forEach(function (link) {
      var isCurrent = link.getAttribute("data-route") === currentRoute;
      link.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function setupMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]");

    if (!toggle || !nav) {
      return;
    }

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 840px)").matches) {
          closeNav();
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 841px)").matches) {
        closeNav();
      }
    });
  }

  function setFooterYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  function injectPartial(targetId, partialUrl, fallbackHtml) {
    var target = document.getElementById(targetId);
    if (!target) {
      return Promise.resolve();
    }

    return fetch(partialUrl.href, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load partial");
        }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
      })
      .catch(function () {
        target.innerHTML = fallbackHtml;
      });
  }

  function initSite() {
    var headerUrl = new URL("partials/header.html", siteRootUrl);
    var footerUrl = new URL("partials/footer.html", siteRootUrl);

    Promise.all([
      injectPartial("site-header", headerUrl, headerFallback),
      injectPartial("site-footer", footerUrl, footerFallback)
    ]).then(function () {
      applyRouteLinks(document);
      applyAssetSources(document);
      highlightActiveNav();
      setupMobileNav();
      setFooterYear();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite);
  } else {
    initSite();
  }
})();
