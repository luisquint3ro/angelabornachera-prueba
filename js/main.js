(function () {
  var cfg = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- Cabecera y menú ----------
  var header = $('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var btn = $('.menu-btn'), nav = $('.nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  });

  // ---------- Revelar al desplazar ----------
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add('in'); });

  // ---------- Contadores ----------
  function countUp(el) {
    var to = +el.getAttribute('data-count'), pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = pre + to + suf; return; }
    var t0 = null;
    (function step(t) {
      if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); io2.unobserve(e.target); } });
    }, { threshold: .6 });
    counters.forEach(function (c) { io2.observe(c); });
  } else counters.forEach(countUp);

  // ---------- ¿Qué estás viviendo hoy? ----------
  var YT = 'https://www.youtube.com/@pastorayprofetaangelaborna5400/search?query=';
  var moods = {
    ansiedad: { v: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.', r: 'Filipenses 4:6', q: 'ansiedad' },
    empezar: { v: 'He aquí, yo hago nuevas todas las cosas.', r: 'Apocalipsis 21:5', q: 'volver a empezar' },
    soltar: { v: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.', r: 'Mateo 11:28', q: 'suelta' },
    quebrantado: { v: 'Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.', r: 'Salmo 34:18', q: 'ya no puedo' },
    miedo: { v: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.', r: 'Isaías 41:10', q: 'miedo' },
    silencio: { v: 'Aguarda a Jehová; esfuérzate, y aliéntese tu corazón; sí, espera a Jehová.', r: 'Salmo 27:14', q: 'silencio' }
  };
  var lastRef = {};
  var panel = $('#mood-panel'), typeTok = 0;
  $$('.mood').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.mood').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      var key = b.getAttribute('data-mood'), m = moods[key]; if (!m || !panel) return;
      if (window.innerWidth < 860 && panel.scrollIntoView) setTimeout(function () { panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }, 120);
      var pool = (window.VERSICULOS || []).filter(function (x) { return x.tema === key; });
      if (pool.length) {
        var pick; do { pick = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && pick.r === lastRef[key]);
        lastRef[key] = pick.r; m = { v: pick.t, r: pick.r, q: m.q };
      }
      var tok = ++typeTok, i = 0;
      panel.innerHTML = '<p class="verse caret"></p><p class="ref"></p><div class="cta-row"></div>';
      var verse = $('.verse', panel), ref = $('.ref', panel), row = $('.cta-row', panel);
      function done() {
        verse.classList.remove('caret'); ref.textContent = m.r;
        row.innerHTML = '<a class="btn btn-sm" target="_blank" rel="noopener" href="' + YT + encodeURIComponent(m.q) + '">Ver mensajes sobre esto</a><a class="btn btn-sm btn-ghost" href="pedir-oracion.html">Pedir oración</a>';
      }
      if (reduce) { verse.textContent = '“' + m.v + '”'; done(); return; }
      var txt = '“' + m.v + '”';
      (function tick() { if (tok !== typeTok) return; verse.textContent = txt.slice(0, ++i); if (i < txt.length) setTimeout(tick, 16); else done(); })();
    });
  });

  // ---------- Mensajes (chat en bucle) ----------
  var chatBody = $('#chat-body');
  if (chatBody) {
    var PERSON = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>';
    var msgs = [
      ['Comentario en YouTube', '#8E2A9E', 'Yo justo estoy en el desierto, como en un encierro, y Dios se ha quedado en silencio, pero esto me está haciendo anhelar más y querer conocerle con desesperación.'],
      ['Marvelis · YouTube', '#C9812A', 'Gracias a esto el Señor me habló. Gloria a Dios. 🙏'],
      ['Julisa, desde Guerrero · YouTube', '#2F8F83', 'Gracias por todos sus devocionales. Bendiciones.'],
      ['Armando, desde Caracas · YouTube', '#4B63B8', 'Amén, pastora. Saludos desde Venezuela.'],
      ['Yoleidy · Facebook', '#B0456F', 'Amén amén, Dios le continúe bendiciendo y fortaleciendo en el cumplimiento de su propósito.']
    ];
    var chatTok = 0, running = false, visible = false;
    var addMsg = function (node) { chatBody.appendChild(node); requestAnimationFrame(function () { requestAnimationFrame(function () { node.classList.add('show'); }); });
      while (chatBody.scrollHeight > chatBody.clientHeight + 4 && chatBody.children.length > 1) chatBody.removeChild(chatBody.firstChild); };
    var wait = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? Math.min(ms, 300) : ms); }); };
    var loop = async function () {
      if (running) return; running = true; var tok = ++chatTok;
      while (tok === chatTok) {
        chatBody.classList.remove('fade'); chatBody.innerHTML = '';
        for (var i = 0; i < msgs.length && tok === chatTok; i++) {
          while (!visible && tok === chatTok) await wait(500);
          var m = msgs[i];
          var t = document.createElement('div'); t.className = 'msg'; t.innerHTML = '<span class="av" style="--c:' + m[1] + '">' + PERSON + '</span><div class="typing"><span></span><span></span><span></span></div>';
          addMsg(t); await wait(1100); if (tok !== chatTok) break;
          t.innerHTML = '<span class="av" style="--c:' + m[1] + '">' + PERSON + '</span><div class="bubble" style="--c:' + m[1] + '"><b>' + esc(m[0]) + '</b>' + esc(m[2]) + '</div>';
          await wait(1500 + m[2].length * 28);
        }
        if (tok !== chatTok) break;
        await wait(2500); chatBody.classList.add('fade'); await wait(700);
      }
      running = false;
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !running) loop(); }, { threshold: .25 }).observe(chatBody);
    } else { visible = true; loop(); }
  }

  // ---------- Ofrendas ----------
  $$('[data-pay]').forEach(function (el) {
    var v = cfg[el.getAttribute('data-pay')], code = $('[data-pay-value]', el), soon = $('.soon', el), act = $('[data-pay-act]', el);
    if (v) {
      if (soon) soon.hidden = true; if (act) act.hidden = false;
      if (code) { code.textContent = v; code.parentNode.hidden = false; }
      var link = $('[data-pay-link]', el); if (link) link.href = v;
    }
  });
  function bindCopy(root) {
    $$('[data-copy]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var t = b.getAttribute('data-copy') || ($('[data-pay-value]', b.closest('.pay')) || {}).textContent;
        if (navigator.clipboard && t) navigator.clipboard.writeText(t).then(function () { var o = b.textContent; b.textContent = '¡Copiado!'; setTimeout(function () { b.textContent = o; }, 1600); });
      });
    });
  }
  bindCopy(document);

  // ---------- Formularios → WhatsApp ----------
  var titulos = { oracion: 'Hola, quiero pedir oración.', invitacion: 'Hola, quiero invitar a la pastora Angela.', devocional: 'Hola, quiero recibir el devocional Mi Cita con Dios.', libro: 'Hola, quiero que me avisen cuando salga el libro.' };
  $$('form[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [titulos[f.getAttribute('data-form')] || 'Hola'];
      new FormData(f).forEach(function (v, k) { if (k !== 'acepto' && String(v).trim()) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); });
      window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      var c = $('.confirm'); if (c) c.hidden = false; f.reset();
    });
  });

  // ---------- Agenda ----------
  var AG = (window.AGENDA || []).slice();
  function ts(e, h) { return new Date(e.fecha + 'T' + (h || e.hora || '00:00') + ':00' + (e.offset || '-05:00')); }
  function endTs(e) { return ts(e, e.horaFin || e.hora || '23:59'); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function fmtDate(e) { return cap(new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Bogota' }).format(ts(e))); }
  function h12(h) { var p = h.split(':'), n = +p[0], s = n >= 12 ? 'p. m.' : 'a. m.'; n = n % 12 || 12; return n + ':' + p[1] + ' ' + s; }
  function fmtTime(e) { return e.hora ? h12(e.hora) + (e.horaFin ? ' a ' + h12(e.horaFin) : '') + ' (hora de Colombia)' : ''; }
  function dayNum(e) { return new Intl.DateTimeFormat('es-CO', { day: 'numeric', timeZone: 'America/Bogota' }).format(ts(e)); }
  function monShort(e) { return new Intl.DateTimeFormat('es-CO', { month: 'short', timeZone: 'America/Bogota' }).format(ts(e)).replace('.', ''); }
  var now = new Date();
  var upcoming = AG.filter(function (e) { return endTs(e) >= now; }).sort(function (a, b) { return ts(a) - ts(b); });
  var past = AG.filter(function (e) { return endTs(e) < now; }).sort(function (a, b) { return ts(b) - ts(a); });
  function waLink(e) { return 'https://wa.me/' + (e.whatsapp || cfg.whatsapp) + '?text=' + encodeURIComponent('Hola, quiero inscribirme en: ' + e.titulo + ' (' + fmtDate(e) + ').'); }
  function evUrl(e) { return 'evento.html?e=' + encodeURIComponent(e.id); }
  function evCard(e, isPast) {
    return '<article class="ev reveal"><div class="ev-img"><img src="' + esc(e.imagen) + '" alt="Afiche: ' + esc(e.titulo) + '" loading="lazy"><div class="ev-badge"><b>' + dayNum(e) + '</b><span>' + monShort(e) + '</span></div></div>' +
      '<div class="ev-body">' + (e.subtitulo ? '<span class="eyebrow">' + esc(e.subtitulo) + '</span>' : '') + '<h3>' + esc(e.titulo) + '</h3>' +
      '<p class="ev-meta">' + fmtDate(e) + '<br>' + fmtTime(e) + (e.costo ? '<br>' + esc(e.costo) + (e.cupos ? ' · ' + esc(e.cupos) : '') : '') + '</p>' +
      '<div class="cta-row"><a class="btn btn-sm" href="' + evUrl(e) + '">Ver detalles</a>' + (isPast ? '' : '<a class="btn btn-sm btn-ghost" target="_blank" rel="noopener" href="' + waLink(e) + '">Inscribirme</a>') + '</div></div></article>';
  }
  function reveal(root) { $$('.reveal', root).forEach(function (el) { requestAnimationFrame(function () { el.classList.add('in'); }); }); }

  var agList = $('#agenda-list');
  if (agList) {
    agList.innerHTML = upcoming.length ? upcoming.map(function (e) { return evCard(e); }).join('') : '<p class="empty">Pronto publicaremos nuevas fechas. Escríbenos por WhatsApp para estar al tanto.</p>';
    reveal(agList);
    var agPast = $('#agenda-past');
    if (agPast && past.length) { agPast.innerHTML = '<h2 class="one">Encuentros anteriores</h2><div class="ev-grid">' + past.map(function (e) { return evCard(e, true); }).join('') + '</div>'; reveal(agPast); }
  }

  // Teaser en inicio
  var nextBox = $('#agenda-next');
  if (nextBox) {
    if (upcoming.length) {
      var e0 = upcoming[0];
      nextBox.innerHTML = '<div class="wrap split rev"><div><span class="tag">Próximo encuentro</span><h2 style="margin-top:.5em">' + esc(e0.titulo) + '</h2><p>' + fmtDate(e0) + '<br>' + fmtTime(e0) + '</p><div class="countdown" data-cd="' + ts(e0).getTime() + '"></div><div class="cta-row"><a class="btn" href="' + evUrl(e0) + '">Ver detalles</a><a class="btn btn-ghost" href="agenda.html">Ver agenda</a></div></div><img class="rounded" src="' + esc(e0.imagen) + '" alt="Afiche: ' + esc(e0.titulo) + '" loading="lazy" style="max-height:520px"></div>';
    } else nextBox.hidden = true;
  }

  // Página del evento
  var evBox = $('#evento');
  if (evBox) {
    var id = new URLSearchParams(location.search).get('e'), e = AG.filter(function (x) { return x.id === id; })[0];
    var I = function (d) { return '<svg viewBox="0 0 24 24"><path d="' + d + '"/></svg>'; };
    if (!e) { evBox.innerHTML = '<div class="wrap narrow center"><h2>No encontramos este encuentro</h2><p><a class="btn" href="agenda.html">Ver la agenda</a></p></div>'; }
    else {
      document.title = e.titulo + ' · Angela Bornachera';
      var m = $('meta[name=description]'); if (m) m.content = e.descripcion || e.titulo;
      var isPast = endTs(e) < now;
      var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(e.titulo) + '&dates=' + ts(e).toISOString().replace(/[-:]|\.\d{3}/g, '') + '/' + endTs(e).toISOString().replace(/[-:]|\.\d{3}/g, '') + '&details=' + encodeURIComponent((e.subtitulo || '') + ' con la pastora y profeta Angela Bornachera') + '&location=' + encodeURIComponent(e.lugar || e.modalidad || '');
      var facts = '<li>' + I('M3 8h18M7 3v4M17 3v4M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z') + '<span>' + fmtDate(e) + '</span></li>' +
        (e.hora ? '<li>' + I('M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z') + '<span>' + fmtTime(e) + '</span></li>' : '') +
        (e.modalidad || e.lugar ? '<li>' + I('M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z') + '<span>' + esc([e.modalidad, e.lugar].filter(Boolean).join(' · ')) + '</span></li>' : '') +
        (e.costo ? '<li>' + I('M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z') + '<span>' + esc(e.costo) + (e.cupos ? ' · ' + esc(e.cupos) : '') + '</span></li>' : '');
      var pays = '';
      if (e.paypal) pays += '<div class="pay-chip"><img src="assets/icons/paypal.svg" alt="PayPal"><div><b>PayPal</b><small>' + esc(e.paypal) + '</small></div><button class="btn btn-sm btn-ghost" type="button" data-copy="' + esc(e.paypal) + '">Copiar</button></div>';
      if (e.zelle) pays += '<div class="pay-chip"><img src="assets/icons/zelle.svg" alt="Zelle"><div><b>Zelle</b><small>' + esc(e.zelle) + '</small></div><button class="btn btn-sm btn-ghost" type="button" data-copy="' + esc(e.zelle) + '">Copiar</button></div>';
      evBox.innerHTML = '<section class="page-hero"><div class="wrap ev-hero"><img class="ev-poster" src="' + esc(e.imagen) + '" alt="Afiche: ' + esc(e.titulo) + '"><div>' +
        (isPast ? '<span class="tag">Encuentro realizado</span>' : '<span class="tag">Próximo encuentro</span>') + (e.subtitulo ? '<p class="eyebrow" style="margin-top:14px">' + esc(e.subtitulo) + '</p>' : '') +
        '<h1 style="margin-top:.2em">' + esc(e.titulo) + '</h1><p class="lead">' + esc(e.descripcion || '') + '</p><ul class="facts">' + facts + '</ul>' +
        (isPast ? '' : '<div class="countdown" data-cd="' + ts(e).getTime() + '"></div>') +
        '<div class="cta-row">' + (isPast ? '' : '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(e) + '"><img src="assets/icons/whatsapp.svg" alt="">Inscribirme por WhatsApp</a><a class="btn btn-ghost" target="_blank" rel="noopener" href="' + gcal + '">Agregar a mi calendario</a>') + '<button class="btn btn-ghost" type="button" id="share">Compartir</button></div>' +
        (pays ? '<h3 style="margin-top:28px">Tu donación</h3><div class="pay-mini">' + pays + '</div>' : '') + '</div></div></section>';
      bindCopy(evBox);
      var sh = $('#share'); if (sh) sh.addEventListener('click', function () {
        var data = { title: e.titulo, text: e.titulo + ' con la pastora Angela Bornachera', url: location.href };
        if (navigator.share) navigator.share(data).catch(function () { });
        else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { sh.textContent = '¡Enlace copiado!'; });
      });
    }
  }

  // Cuentas regresivas
  function tickCd() {
    $$('[data-cd]').forEach(function (el) {
      var d = +el.getAttribute('data-cd') - Date.now();
      if (d <= 0) { el.innerHTML = '<span class="tag">¡Es hoy!</span>'; return; }
      var x = Math.floor(d / 1000), D = Math.floor(x / 86400), H = Math.floor(x % 86400 / 3600), M = Math.floor(x % 3600 / 60), S = x % 60;
      el.innerHTML = [[D, 'días'], [H, 'horas'], [M, 'min'], [S, 'seg']].map(function (p) { return '<div class="cd"><b>' + String(p[0]).padStart(2, '0') + '</b><span>' + p[1] + '</span></div>'; }).join('');
    });
  }
  tickCd(); setInterval(tickCd, 1000);

  // ---------- Ventana emergente ----------
  var modal = $('#modal');
  var featured = upcoming.filter(function (x) { return x.destacado; })[0];
  var isHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  if (modal && featured && isHome) {
    var key = 'popup-' + featured.id, seen = false, DAYS = 3 * 86400000;
    try { var ts0 = +localStorage.getItem(key); seen = ts0 && (Date.now() - ts0 < DAYS); } catch (x) { try { seen = sessionStorage.getItem(key); } catch (y) { } }
    if (!seen) {
      $('.modal-box', modal).innerHTML = '<button class="modal-x" type="button" aria-label="Cerrar">×</button><img src="' + esc(featured.imagen) + '" alt="Afiche: ' + esc(featured.titulo) + '"><div class="modal-body"><span class="tag" style="align-self:flex-start">Próximo encuentro</span><h2>' + esc(featured.titulo) + '</h2><p>' + fmtDate(featured) + '<br>' + fmtTime(featured) + '</p><div class="countdown" data-cd="' + ts(featured).getTime() + '"></div><div class="cta-row"><a class="btn" href="' + evUrl(featured) + '">Ver detalles</a><a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(featured) + '"><img src="assets/icons/whatsapp.svg" alt="">Inscribirme</a></div></div>';
      var close = function () { modal.classList.remove('open'); try { localStorage.setItem(key, String(Date.now())); } catch (x) { try { sessionStorage.setItem(key, '1'); } catch (y) { } } };
      setTimeout(function () { modal.classList.add('open'); tickCd(); var cb = $('.modal-x', modal); if (cb) cb.focus(); }, 1800);
      modal.addEventListener('click', function (ev) { if (ev.target === modal || ev.target.classList.contains('modal-x')) close(); });
      document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') close(); });
    }
  }

  // ---------- Palabra para ti (mensaje en bucle) ----------
  var VS = (window.VERSICULOS || []).slice(), TEMAS = window.TEMAS || {};
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var wordOff = false; try { wordOff = sessionStorage.getItem('word-off'); } catch (x) { }
  if (VS.length && !wordOff && !$('#adm') && !$('#verses')) {
    var box = document.createElement('aside'); box.className = 'word'; box.setAttribute('aria-live', 'polite'); box.setAttribute('aria-label', 'Una palabra para ti');
    box.innerHTML = '<div class="word-head"><span class="word-ico"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg></span>Una palabra para ti</div><p class="word-text"></p><p class="word-ref"></p><div class="word-act"><button type="button" class="word-next">Otra palabra</button><a href="palabra.html">Ver más</a><button type="button" class="word-x" aria-label="Cerrar">×</button></div><div class="word-bar"></div>';
    document.body.appendChild(box);
    var queue = [], hoverPaused = false, timer = null, SHOW = 15000, GAP = 20000;
    var moodBusy = false, busyBy = {};
    var watch = function (el, key) { if (el && 'IntersectionObserver' in window) new IntersectionObserver(function (es) { busyBy[key] = es[0].isIntersecting; moodBusy = !!(busyBy.m || busyBy.f); if (moodBusy) box.classList.remove('show'); }, { threshold: .1 }).observe(el); };
    watch($('#mood-panel'), 'm'); watch($('.site-footer'), 'f');
    box.style.setProperty('--dur', SHOW / 1000 + 's');
    var nextWord = function () { if (!queue.length) queue = shuffle(VS.slice()); return queue.pop(); };
    var showWord = function () {
      var m = $('#modal'), ae = document.activeElement;
      if ((m && m.classList.contains('open')) || moodBusy || (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName))) { timer = setTimeout(showWord, 5000); return; }
      var v = nextWord(); $('.word-text', box).textContent = '“' + v.t + '”'; $('.word-ref', box).textContent = v.r;
      box.classList.remove('show'); void box.offsetWidth; box.classList.add('show');
      timer = setTimeout(hideWord, SHOW);
    };
    var hideWord = function () { if (hoverPaused) { timer = setTimeout(hideWord, 2000); return; } box.classList.remove('show'); timer = setTimeout(showWord, GAP); };
    box.addEventListener('mouseenter', function () { hoverPaused = true; box.classList.add('paused'); });
    box.addEventListener('mouseleave', function () { hoverPaused = false; box.classList.remove('paused'); });
    $('.word-next', box).addEventListener('click', function () { clearTimeout(timer); showWord(); });
    $('.word-x', box).addEventListener('click', function () { clearTimeout(timer); box.classList.remove('show'); try { sessionStorage.setItem('word-off', '1'); } catch (x) { } });
    timer = setTimeout(showWord, 9000);
  }

  // ---------- Página de textos bíblicos ----------
  var vBox = $('#verses');
  if (vBox) {
    var chips = $('#chips'), cur = 'todos';
    var draw = function () {
      var list = VS.filter(function (v) { return cur === 'todos' || v.tema === cur; });
      vBox.innerHTML = list.map(function (v) { return '<article class="card verse-card reveal"><span class="tema">' + esc(TEMAS[v.tema] || v.tema) + '</span><p>“' + esc(v.t) + '”</p><span class="ref">' + esc(v.r) + ' · RVR1960</span><div class="cta-row"><button class="btn btn-sm btn-ghost" type="button" data-copy="' + esc('“' + v.t + '” — ' + v.r + ' (RVR1960)') + '">Copiar</button></div></article>'; }).join('');
      bindCopy(vBox); reveal(vBox);
    };
    chips.innerHTML = '<button class="chip" type="button" data-t="todos" aria-pressed="true">Todos</button>' + Object.keys(TEMAS).map(function (k) { return '<button class="chip" type="button" data-t="' + k + '" aria-pressed="false">' + esc(TEMAS[k]) + '</button>'; }).join('');
    $$('.chip', chips).forEach(function (c) { c.addEventListener('click', function () { cur = c.getAttribute('data-t'); $$('.chip', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); }); draw(); }); });
    draw();
  }

  // ---------- Administrador de agenda ----------
  var adm = $('#adm');
  if (adm) {
    var KEY = 'agenda-borrador', list;
    try { list = JSON.parse(localStorage.getItem(KEY)); } catch (x) { }
    if (!Array.isArray(list)) list = JSON.parse(JSON.stringify(window.AGENDA || []));
    var sel = 0;
    var fields = ['titulo', 'subtitulo', 'fecha', 'hora', 'horaFin', 'costo', 'cupos', 'modalidad', 'lugar', 'descripcion', 'imagen', 'whatsapp', 'paypal', 'zelle'];
    var save = function () { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (x) { } };
    var renderList = function () {
      $('#adm-list').innerHTML = list.map(function (e, i) { return '<button class="adm-item' + (i === sel ? ' sel' : '') + '" data-i="' + i + '">' + esc(e.titulo || 'Sin título') + '<small>' + esc(e.fecha || '') + (e.destacado ? ' · ⭐ emergente' : '') + '</small></button>'; }).join('') || '<p class="note">No hay eventos.</p>';
      $$('.adm-item').forEach(function (b) { b.addEventListener('click', function () { sel = +b.getAttribute('data-i'); renderList(); renderForm(); }); });
    };
    var renderForm = function () {
      var e = list[sel], f = $('#adm-form'); if (!e) { f.hidden = true; return; } f.hidden = false;
      fields.forEach(function (k) { var el = f.elements[k]; if (el) el.value = e[k] || ''; });
      f.elements.destacado.checked = !!e.destacado;
    };
    $('#adm-form').addEventListener('input', function () {
      var e = list[sel], f = $('#adm-form'); if (!e) return;
      fields.forEach(function (k) { if (f.elements[k]) e[k] = f.elements[k].value; });
      e.destacado = f.elements.destacado.checked; e.offset = e.offset || '-05:00';
      e.id = e.id || ((e.titulo || 'evento').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + (e.fecha || ''));
      save(); renderList();
    });
    $('#adm-pick').addEventListener('change', function (ev) { var fl = ev.target.files[0]; if (fl) { $('#adm-form').elements.imagen.value = 'assets/' + fl.name; $('#adm-form').dispatchEvent(new Event('input')); } });
    $('#adm-new').addEventListener('click', function () { list.push({ id: '', titulo: 'Nuevo encuentro', fecha: '', hora: '19:00', horaFin: '', offset: '-05:00', imagen: '', whatsapp: cfg.whatsapp, destacado: false }); sel = list.length - 1; save(); renderList(); renderForm(); });
    $('#adm-del').addEventListener('click', function () { if (list[sel] && confirm('¿Eliminar este evento?')) { list.splice(sel, 1); sel = 0; save(); renderList(); renderForm(); } });
    $('#adm-reset').addEventListener('click', function () { if (confirm('¿Descartar el borrador y volver a la agenda publicada?')) { try { localStorage.removeItem(KEY); } catch (x) { } list = JSON.parse(JSON.stringify(window.AGENDA || [])); sel = 0; renderList(); renderForm(); } });
    $('#adm-dl').addEventListener('click', function () {
      var txt = '// AGENDA MINISTERIAL — generado desde admin.html\nwindow.AGENDA = ' + JSON.stringify(list, null, 2) + ';\n';
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/javascript' })); a.download = 'agenda.js'; a.click();
    });
    renderList(); renderForm();
  }
})();
