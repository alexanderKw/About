'use strict';

(function () {
  'use strict';

  var sections = document.querySelectorAll('.section');
  var navList = document.querySelector('#nav-list');
  var pointer = document.querySelector('.pointer');
  var btnTop = document.querySelector('#btn-top');

  /* Page resize height */
  sections.forEach(function (s) {
    s.style.height = window.innerHeight + 'px';
    s.style.minHeight = 650 + 'px';
  });

  /* Active link pointer */
  function getScroll() {
    sections.forEach(function (el) {
      var top = el.offsetTop - 300;
      var bottom = top + el.clientHeight;
      var scroll = window.pageYOffset;
      var id = el.getAttribute('id');

      btnTop.textContent = scroll < 300 ? 'Up' : 'Scroll';

      if (scroll > top && scroll < bottom) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = navList.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            item.classList.remove('active');
            if (item.firstChild.getAttribute('href') === '#' + id) {
              item.classList.add('active');
              pointer.style.left = item.offsetLeft + item.offsetWidth / 2 + 'px';
              pointer.style.top = item.offsetTop + item.offsetHeight / 2 - pointer.offsetHeight / 2 + 'px';
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    });
  }

  window.addEventListener('scroll', getScroll);
  getScroll();

  /* Anchor link */
  var linkNav = document.querySelectorAll('[href^="#nav"]');
  var V = 0.3;
  var t = void 0;
  var start = void 0;

  linkNav.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var w = window.pageYOffset;
      var hash = this.href.replace(/[^#]*(.*)/, '$1');
      t = document.querySelector(hash).getBoundingClientRect().top, start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start;
        var r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    }, false);
  });

  /* Btn to top */
  var scrolled = void 0;
  var timer = void 0;
  btnTop.addEventListener('click', function () {
    scrolled = window.pageYOffset;
    scrollToTop();
  });

  function scrollToTop() {
    if (scrolled > 0) {
      window.scrollTo(0, scrolled);
      scrolled -= 100;
      timer = setTimeout(scrollToTop, 20);
    } else {
      clearTimeout(timer);
      window.scrollTo(0, 0);
    }
  }
})();