(function () {
  var P = window.PAYCHI || { demo: true, services: [] };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var hash = function () { return decodeURIComponent((location.hash || '').slice(1)); };

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Mobile menu */
  var menuBtn = $('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* Services filter */
  var grid = $('#service-grid');
  if (grid) {
    var setFilter = function (id) {
      if (!$('.filter[data-filter="' + id + '"]')) id = 'all';
      $$('.filter').forEach(function (b) {
        var on = b.dataset.filter === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      $$('.service-card', grid).forEach(function (c) { c.hidden = id !== 'all' && c.dataset.category !== id; });
    };
    $$('.filter').forEach(function (b) { b.addEventListener('click', function () { setFilter(b.dataset.filter); }); });
    if (hash()) setFilter(hash());
  }

  /* Request wizard */
  var form = $('#request-form');
  if (form) {
    var step = 1;
    var panels = $$('.wizard-panel', form);
    var back = $('#w-back'), next = $('#w-next'), submit = $('#w-submit');
    var serviceSel = $('#r-service');

    if (hash() && serviceSel.querySelector('option[value="' + hash() + '"]')) serviceSel.value = hash();

    var contactLabels = { Email: ['Email address', 'you@example.com'], Telegram: ['Telegram username', '@username'], WhatsApp: ['WhatsApp number', '+00 000 000 0000'] };
    $('#r-method').addEventListener('change', function (e) {
      var l = contactLabels[e.target.value];
      $('#r-contact-label').textContent = l[0];
      $('#r-contact').placeholder = l[1];
    });

    var showError = function (id, show) {
      var el = $('[data-error-for="' + id + '"]');
      var input = document.getElementById(id);
      if (el) el.classList.toggle('show', show);
      if (input) input.setAttribute('aria-invalid', String(show));
      return !show;
    };
    var validate = function (n) {
      var ok = true;
      if (n === 1) {
        var link = $('#r-link').value.trim();
        ok = showError('r-link', !/^https?:\/\/\S+\.\S+/.test(link)) && ok;
        ok = showError('r-details', !$('#r-details').value.trim()) && ok;
      }
      if (n === 2) ok = showError('r-contact', !$('#r-contact').value.trim()) && ok;
      if (n === 3) ok = showError('r-agree', !$('#r-agree').checked) && ok;
      if (!ok) { var bad = $('[aria-invalid="true"]', form); if (bad) bad.focus(); }
      return ok;
    };

    var summary = function () {
      var svc = serviceSel.options[serviceSel.selectedIndex];
      var rows = [
        ['Service', serviceSel.value ? svc.text : 'Not specified'],
        ['Type', $('input[name="type"]:checked', form).value],
        ['Link', $('#r-link').value.trim()],
        ['Details', $('#r-details').value.trim()],
        ['Contact', $('#r-method').value + ': ' + $('#r-contact').value.trim()]
      ];
      var dl = $('#summary');
      dl.innerHTML = '';
      rows.forEach(function (r) {
        var div = document.createElement('div');
        var dt = document.createElement('dt'); dt.textContent = r[0];
        var dd = document.createElement('dd'); dd.textContent = r[1];
        div.appendChild(dt); div.appendChild(dd); dl.appendChild(div);
      });
    };

    var show = function (n) {
      step = n;
      panels.forEach(function (p) { p.hidden = +p.dataset.step !== n; });
      $$('[data-step-label]').forEach(function (li) {
        var i = +li.dataset.stepLabel;
        li.classList.toggle('is-current', i === n);
        li.classList.toggle('is-done', i < n);
      });
      back.hidden = n === 1;
      next.hidden = n === 3;
      submit.hidden = n !== 3;
      if (n === 3) summary();
      var first = $('[data-step="' + n + '"] input, [data-step="' + n + '"] select', form);
      if (first && n !== 1) first.focus();
    };

    next.addEventListener('click', function () { if (validate(step)) show(step + 1); });
    back.addEventListener('click', function () { show(step - 1); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (step !== 3) { if (validate(step)) show(step + 1); return; }
      if (!validate(3)) return;
      // TODO: replace with a real submission when the backend exists.
      var ref = 'PC-' + String(Math.floor(1000 + Math.random() * 9000));
      var svc = serviceSel.value ? serviceSel.options[serviceSel.selectedIndex].text : '';
      store.set('paychi:last', { ref: ref, what: [svc, $('#r-details').value.trim()].filter(Boolean).join(' · ') });
      form.hidden = true;
      $('.wizard-steps').hidden = true;
      $('#w-ref').textContent = ref;
      $('#w-track').href = 'track.html#' + ref;
      $('#w-done').hidden = false;
      $('#w-done').scrollIntoView({ block: 'center' });
    });
    $$('[data-reset]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); location.reload(); }); });
  }

  /* Track */
  var tform = $('#track-form');
  if (tform) {
    var input = $('#t-ref');
    var run = function () {
      var ref = input.value.trim().toUpperCase();
      var valid = /^PC-\d{3,}$/.test(ref);
      var err = $('[data-error-for="t-ref"]');
      err.classList.toggle('show', !valid);
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid) { $('#track-result').hidden = true; return; }
      var last = store.get('paychi:last');
      $('#t-out-ref').textContent = ref;
      $('#t-out-what').textContent = last && last.ref === ref ? last.what : 'Example request';
      $('#track-result').hidden = false;
    };
    tform.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    var initial = hash() || ((store.get('paychi:last') || {}).ref) || '';
    if (initial) { input.value = initial; if (hash()) run(); }
  }
})();
