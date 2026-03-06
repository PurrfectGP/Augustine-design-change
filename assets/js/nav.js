/* ==========================================================================
   nav.js — Navigation: theme toggle, mobile menu, page routing.
   Now uses real separate HTML pages — no SPA div-switching.
   Depends on: nothing (standalone, loads before other modules)
   ========================================================================== */

        // ── Theme Toggle ──────────────────────────────────────────────────────
        function toggleTheme() {
            const html = document.documentElement;
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('harmonia-theme', newTheme);
        }
        // Apply saved theme immediately (before paint, prevents flash)
        (function() {
            const saved = localStorage.getItem('harmonia-theme') || 'light';
            document.documentElement.setAttribute('data-theme', saved);
        })();

        // ── Mobile Navigation Toggle ──────────────────────────────────────────
        function toggleMobileNav() {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks) navLinks.classList.toggle('mobile-open');
            if (hamburger) hamburger.classList.toggle('active');
        }

        // ── Page Navigation (real page loads) ─────────────────────────────────
        // Maps page IDs to their HTML files — keeps onclick="showPage()" working.
        const PAGE_MAP = {
            'home':          'index.html',
            'why-harmonia':  'why-harmonia.html',
            'partnerships':  'partnerships.html',
            'team':          'team.html',
            'local-network': 'local-network.html',
            'p2p':           'p2p-testing.html',
            'contact':       'contact.html',
        };

        function showPage(pageId) {
            const dest = PAGE_MAP[pageId] || 'index.html';
            window.location.href = dest;
        }

        // ── Active Nav State ──────────────────────────────────────────────────
        // Sets the correct nav link as active based on the current page URL.
        function setNavActiveFromURL() {
            const filename = window.location.pathname.split('/').pop() || 'index.html';
            const name = filename.replace('.html', '');
            const NAV_MAP = {
                'index':          'nav-home',
                '':               'nav-home',
                'why-harmonia':   'nav-why-harmonia',
                'partnerships':   'nav-partnerships',
                'team':           'nav-team',
                'local-network':  'nav-local-network',
                'p2p-testing':    'nav-p2p',
                'contact':        'nav-contact',
            };
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            const targetId = NAV_MAP[name];
            if (targetId) {
                const el = document.getElementById(targetId);
                if (el) el.classList.add('active');
            }
        }

        // ── initFromHash (kept for back-compat; now just sets active state) ───
        function initFromHash() {
            setNavActiveFromURL();
        }

        // Home radar animation
        const statusTexts = ['SYNTHESIZING...', 'ANALYZING HLA...', 'CHECKING RESONANCE...', 'CALCULATING...', 'MATCHING...'];
