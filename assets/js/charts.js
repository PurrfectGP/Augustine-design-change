/* ==========================================================================
   charts.js — Radar chart animation (animateRadar, statusTexts, statusIndex)
   and slider initializers (initWhySlider, initTeamSlider).
   Depends on: animations.js (window.triggerVisualCardAnimation etc. must be
   available when initWhySlider triggers card animations)
   ========================================================================== */

        function animateRadar() {
            const radarA = document.getElementById('radarA');
            const radarB = document.getElementById('radarB');
            const status = document.getElementById('radar-status');
            if (!radarA || !radarB) return;

            setInterval(() => {
                const rand = () => Math.random() * 30 - 15;
                radarA.setAttribute('points', [
                    `200,${50+rand()}`, `${340+rand()},${125+rand()}`, `${330+rand()},${275+rand()}`,
                    `200,${345+rand()}`, `${60+rand()},${270+rand()}`, `${70+rand()},${130+rand()}`
                ].join(' '));
                radarB.setAttribute('points', [
                    `200,${70+rand()}`, `${320+rand()},${140+rand()}`, `${325+rand()},${265+rand()}`,
                    `200,${330+rand()}`, `${80+rand()},${260+rand()}`, `${75+rand()},${135+rand()}`
                ].join(' '));
            }, 2000);

            if (status) {
                setInterval(() => {
                    status.style.opacity = '0';
                    setTimeout(() => {
                        statusIndex = (statusIndex + 1) % statusTexts.length;
                        status.textContent = statusTexts[statusIndex];
                        status.style.opacity = '1';
                    }, 300);
                }, 3000);
            }
        }

        // Why Harmonia slider
        function initWhySlider() {
            const slider = document.getElementById('scienceSlider');
            if (!slider) return;
            const cards = slider.querySelectorAll('.science-card');
            const dots = document.querySelectorAll('.pagination-dot');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            let currentIndex = 0;
            let autoRotateInterval = null;

            function updateDots(i) {
                dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
                currentIndex = i;
            }

            function triggerCardAnimations(i) {
                if (window.triggerVisualCardAnimation) {
                    window.triggerVisualCardAnimation(i === 0);
                }
                if (window.triggerPersonalityCardAnimation) {
                    window.triggerPersonalityCardAnimation(i === 1);
                }
                if (window.triggerGeneticCardAnimation) {
                    window.triggerGeneticCardAnimation(i === 2);
                }
                if (window.triggerSynthesisCardAnimation && i === 3) {
                    window.triggerSynthesisCardAnimation(true);
                }
            }
            
            function scrollToCard(i) {
                i = Math.max(0, Math.min(i, cards.length - 1));
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                updateDots(i);
                // Animations are triggered by the debounced scroll listener only,
                // so they fire once the card has fully settled — not mid-scroll
            }

            // Auto-rotate every 20 seconds
            function startAutoRotate() {
                stopAutoRotate();
                autoRotateInterval = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % cards.length;
                    scrollToCard(nextIndex);
                }, 20000);
            }
            
            function stopAutoRotate() {
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                    autoRotateInterval = null;
                }
            }
            
            // Restart auto-rotate after user interaction
            function resetAutoRotate() {
                stopAutoRotate();
                startAutoRotate();
            }

            if (prevBtn) prevBtn.onclick = () => { scrollToCard(currentIndex - 1); resetAutoRotate(); };
            if (nextBtn) nextBtn.onclick = () => { scrollToCard(currentIndex + 1); resetAutoRotate(); };
            dots.forEach((d, i) => d.onclick = () => { scrollToCard(i); resetAutoRotate(); });
            
            // Click on card to center it
            cards.forEach((card, i) => {
                card.style.cursor = 'pointer';
                card.onclick = () => { scrollToCard(i); resetAutoRotate(); };
            });

            let scrollTimeout;
            slider.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const rect = slider.getBoundingClientRect();
                    const center = rect.left + rect.width / 2;
                    let closest = 0, minDist = Infinity;
                    cards.forEach((c, i) => {
                        const cr = c.getBoundingClientRect();
                        const dist = Math.abs(center - (cr.left + cr.width / 2));
                        if (dist < minDist) { minDist = dist; closest = i; }
                    });
                    updateDots(closest);
                    // Only trigger animations once scroll has fully settled
                    triggerCardAnimations(closest);
                }, 50);
            });
            
            // Start auto-rotate
            startAutoRotate();
            
            // Pause on hover, resume on leave
            slider.addEventListener('mouseenter', stopAutoRotate);
            slider.addEventListener('mouseleave', startAutoRotate);
        }

        // Team slider
        function initTeamSlider() {
            const slider = document.getElementById('teamSlider');
            if (!slider) return;
            const prevBtn = document.querySelector('.slider-arrow.prev');
            const nextBtn = document.querySelector('.slider-arrow.next');
            const dotsContainer = document.querySelector('.slider-dots');
            const cards = slider.querySelectorAll('.team-card');
            const totalCards = cards.length; // 6
            
            function getCardWidth() {
                const card = cards[0];
                if (!card) return 300;
                const gap = parseFloat(getComputedStyle(slider).gap) || 16;
                return card.offsetWidth + gap;
            }

            function isTablet() {
                const w = window.innerWidth;
                return w >= 768 && w <= 1024;
            }

            function getVisibleCount() {
                const w = window.innerWidth;
                // Tablet (768-1024): 3 visible = 2 pages
                // Mobile (<768): 1 visible = 6 pages
                if (w >= 768 && w <= 1024) return 3;
                return 1;
            }

            function getDotsCount() {
                const visible = getVisibleCount();
                return Math.ceil(totalCards / visible);
            }

            function getCurrentCardIndex() {
                const sliderRect = slider.getBoundingClientRect();
                const sliderCenter = sliderRect.left + sliderRect.width / 2;
                
                let closestIndex = 0;
                let closestDistance = Infinity;
                
                cards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const distance = Math.abs(sliderCenter - cardCenter);
                    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });
                
                return closestIndex;
            }

            function createDots() {
                if (!dotsContainer) return;
                // Hide dots on tablet
                if (isTablet()) {
                    dotsContainer.style.display = 'none';
                    return;
                }
                dotsContainer.style.display = '';
                const count = getDotsCount();
                dotsContainer.innerHTML = '';
                for (let i = 0; i < count; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'dot' + (i === 0 ? ' active' : '');
                    dot.dataset.index = i;
                    dotsContainer.appendChild(dot);
                }
                attachDotListeners();
            }

            function updateDots() {
                if (isTablet()) return;
                const dots = dotsContainer.querySelectorAll('.dot');
                const cardIndex = getCurrentCardIndex();
                const visible = getVisibleCount();
                const pageIndex = Math.floor(cardIndex / visible);
                
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === pageIndex);
                });
            }

            function scrollToPage(pageIndex) {
                const visible = getVisibleCount();
                const cardIndex = pageIndex * visible;
                const card = cards[cardIndex];
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            }

            function attachDotListeners() {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((d) => {
                    d.onclick = () => {
                        const pageIndex = parseInt(d.dataset.index);
                        scrollToPage(pageIndex);
                    };
                });
            }

            // Tablet: click card to center it
            cards.forEach((card) => {
                card.addEventListener('click', () => {
                    if (isTablet()) {
                        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                });
            });

            if (nextBtn) nextBtn.onclick = () => slider.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            if (prevBtn) prevBtn.onclick = () => slider.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });

            slider.addEventListener('scroll', updateDots);
            
            // Recreate dots on resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    createDots();
                    updateDots();
                }, 150);
            });

            slider.style.cursor = 'grab';
            
            // Initial setup
            createDots();
            updateDots();
        }

        // Forms
