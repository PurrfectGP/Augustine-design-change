/* ==========================================================================
   main.js — Entry point. DOMContentLoaded bootstrap that calls all init
   functions from utils.js, nav.js, charts.js, animations.js, and forms.js.
   Must be loaded last, after all other JS modules.
   ========================================================================== */

        document.addEventListener('DOMContentLoaded', () => {
            initHarmoniaLogos(); // Apply logo to all data-harmonia-logo elements
            setNavActiveFromURL(); // Highlight current page in nav
            animateRadar();
            initVisualCardAnimation(); // Must init before slider
            initPersonalityCardAnimation(); // Init personality animation
            initGeneticCardAnimation(); // Init genetic animation
            initSynthesisCardAnimation(); // Init synthesis animation
            initWhySlider();
            initTeamSlider();
            initForms();
            initPartnerships();
        });
