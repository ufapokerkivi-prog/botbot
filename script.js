/* Pure JS interactions for the static landing */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var stickyBtn = $('#stickyBtn');
  var hero = $('#hero');
  var modal = $('#modal');
  var popup = $('#popup');
  var reviewsSlider = $('#reviewsSlider');

  // Scroll reveal animations
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.fade-in, .slide-up').forEach(function (el) { revealObserver.observe(el); });

  // Count-up when visible
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $$('.count-up').forEach(function (el) { countObserver.observe(el); });

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target') || '0', 10);
    var duration = 1800;
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var val = Math.floor(progress * (target - start) + start);
      el.textContent = String(val);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Sticky button show/hide based on hero visibility (mobile)
  var stickyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        stickyBtn.classList.remove('show');
      } else {
        stickyBtn.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  if (hero && stickyBtn) stickyObserver.observe(hero);

  // Reviews filter
  var filterBtns = $$('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var city = btn.getAttribute('data-city');
      var cards = $$('.review-card', reviewsSlider);
      cards.forEach(function (card) {
        if (city === 'all') {
          card.classList.remove('hidden');
        } else {
          var match = card.getAttribute('data-city') === city;
          card.classList.toggle('hidden', !match);
        }
      });
      // Reset slider to start
      if (reviewsSlider) reviewsSlider.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });

  // Simple auto-scroll for reviews
  var autoScrollInterval = null;
  function startAutoScroll() {
    if (!reviewsSlider) return;
    stopAutoScroll();
    autoScrollInterval = setInterval(function () {
      var maxScroll = reviewsSlider.scrollWidth - reviewsSlider.clientWidth;
      if (reviewsSlider.scrollLeft + 10 >= maxScroll) {
        reviewsSlider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        reviewsSlider.scrollBy({ left: 330, behavior: 'smooth' });
      }
    }, 3000);
  }
  function stopAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
  if (reviewsSlider) {
    startAutoScroll();
    reviewsSlider.addEventListener('mouseenter', stopAutoScroll);
    reviewsSlider.addEventListener('mouseleave', startAutoScroll);
    // Allow drag to scroll (mouse)
    var isDown = false; var startX = 0; var scrollLeft = 0;
    reviewsSlider.addEventListener('mousedown', function (e) {
      isDown = true; startX = e.pageX - reviewsSlider.offsetLeft; scrollLeft = reviewsSlider.scrollLeft; reviewsSlider.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', function () { isDown = false; reviewsSlider.style.cursor = ''; });
    reviewsSlider.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - reviewsSlider.offsetLeft;
      var walk = (x - startX) * 1.2;
      reviewsSlider.scrollLeft = scrollLeft - walk;
    });
  }

  // Modal logic
  function setBodyScrollLocked(locked) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function onOverlayClick(e, el, closeFn) {
    if (!el) return;
    if (e.target === el) closeFn();
  }

  window.openModal = function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setBodyScrollLocked(true);
    stickyBtn && stickyBtn.classList.remove('show');
  };
  window.closeModal = function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    setBodyScrollLocked(false);
  };

  modal && modal.addEventListener('click', function (e) { onOverlayClick(e, modal, window.closeModal); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') { window.closeModal(); window.closePopup(); } });

  // Popup (after 30s)
  var POPUP_DELAY = 30000;
  var popupTimer = null;
  var popupDismissed = false;

  function schedulePopup() {
    if (!popup) return;
    if (sessionStorage.getItem('popupDismissed') === '1') return;
    if (popupTimer) clearTimeout(popupTimer);
    popupTimer = setTimeout(function () {
      if (!popupDismissed) openPopup();
    }, POPUP_DELAY);
  }

  window.openPopup = function openPopup() {
    if (!popup) return;
    popup.classList.add('open');
    popup.setAttribute('aria-hidden', 'false');
  };
  window.closePopup = function closePopup() {
    if (!popup) return;
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');
    popupDismissed = true;
    try { sessionStorage.setItem('popupDismissed', '1'); } catch (_) {}
  };

  popup && popup.addEventListener('click', function (e) { onOverlayClick(e, popup, window.closePopup); });

  // Forms
  function normalizePhone(input) {
    return String(input || '').replace(/[^\d+]/g, '');
  }

  function fakeSubmit(payload) {
    return new Promise(function (resolve) { setTimeout(function () { resolve({ ok: true, payload: payload }); }, 700); });
  }

  function showSuccess(el) {
    if (!el) return;
    el.hidden = false;
    el.classList.add('in-view');
    setTimeout(function () { el.hidden = true; }, 5000);
  }

  window.submitForm = function submitForm(e) {
    e.preventDefault();
    var form = e.target;
    var name = (form.querySelector('input[name="name"]') || {}).value || '';
    var phone = normalizePhone((form.querySelector('input[name="phone"]') || {}).value || '');
    if (!phone || phone.replace(/\D/g, '').length < 10) { form.reportValidity(); return; }
    fakeSubmit({ name: name, phone: phone, source: 'cta' }).then(function () {
      form.reset();
      var success = $('#ctaSuccess');
      showSuccess(success);
      try { sessionStorage.setItem('formSubmitted', '1'); } catch (_) {}
    });
  };

  window.submitModal = function submitModal(e) {
    e.preventDefault();
    var form = e.target;
    var inputs = form.querySelectorAll('input');
    var phone = normalizePhone(inputs[1] && inputs[1].value);
    if (!phone || phone.replace(/\D/g, '').length < 10) { form.reportValidity(); return; }
    fakeSubmit({ phone: phone, source: 'modal' }).then(function () {
      inputs.forEach(function (i) { i.value = ''; });
      showSuccess($('#modalSuccess'));
      window.closeModal();
    });
  };

  window.submitPopup = function submitPopup(e) {
    e.preventDefault();
    var form = e.target;
    var input = form.querySelector('input');
    var phone = normalizePhone(input && input.value);
    if (!phone || phone.replace(/\D/g, '').length < 10) { form.reportValidity(); return; }
    fakeSubmit({ phone: phone, source: 'popup' }).then(function () {
      input.value = '';
      showSuccess($('#popupSuccess'));
      window.closePopup();
    });
  };

  // Initial schedule
  schedulePopup();
})();
