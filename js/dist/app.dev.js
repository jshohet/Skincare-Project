"use strict";

(function (app) {
  app.serviceItems = [];
  app.selectedItem = {};
  var menu = document.getElementById('menu-btn');
  var slide = document.getElementById('small-menu');
  var wrapper = document.getElementsByClassName('wrapper');

  app.homepage = function () {
    setCopyrightDate();
  };

  app.services = function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setCopyrightDate();
            _context.next = 3;
            return regeneratorRuntime.awrap(loadPageData());

          case 3:
            loadServicePageData();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  menu.addEventListener('click', menuButton);

  function menuButton(el) {
    el.preventDefault();

    if (window.getComputedStyle(slide).display != 'none') {
      slide.style.display = 'none';
    } else {
      slide.style.display = 'block';
    }
  }

  function setCopyrightDate() {
    var date = new Date();
    document.getElementById('copyrightYear').innerText = date.getFullYear();
  }

  function loadPageData() {
    var cacheData, rawData, data;
    return regeneratorRuntime.async(function loadPageData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cacheData = sessionStorage.getItem('site-data');

            if (!(cacheData !== null)) {
              _context2.next = 5;
              break;
            }

            app.serviceItems = JSON.parse(cacheData);
            _context2.next = 13;
            break;

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(fetch('sitedata.json'));

          case 7:
            rawData = _context2.sent;
            _context2.next = 10;
            return regeneratorRuntime.awrap(rawData.json());

          case 10:
            data = _context2.sent;
            app.serviceItems = data;
            sessionStorage.setItem('site-data', JSON.stringify(data));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  function loadServicePageData() {
    var originalItems = document.querySelectorAll('.highlight');
    var main = document.getElementById('services-main');
    var newItems = [];

    var _loop = function _loop(i) {
      var el = app.serviceItems[i];
      var highlight = document.createElement('div');
      highlight.classList.add('highlight');

      if (i % 2 > 0) {
        highlight.classList.add('invert');
      }

      var textDiv = document.createElement('div');
      var h2 = document.createElement('h2');
      var ul = document.createElement('ul');
      var titleWords = el.service.split(' ');
      var service = "0".concat(i + 1, ". ");

      for (var j = 0; j < titleWords.length - 1; j++) {
        service += titleWords[j];
        service += '<br />';
      }

      service += titleWords[titleWords.length - 1];
      h2.innerHTML = "".concat(el.service);
      textDiv.appendChild(h2);
      var u = el.serviceDescription.split('|');
      u.forEach(function (a) {
        var li = document.createElement('li');
        li.innerHTML = "".concat(a);
        ul.appendChild(li);
      });
      textDiv.appendChild(ul);
      highlight.appendChild(textDiv);
      var img = document.createElement('img');
      img.src = el.smallImage;
      img.alt = el.smallImageAlt;
      highlight.appendChild(img);
      newItems.push(highlight);
    };

    for (var i = 0; i < app.serviceItems.length; i++) {
      _loop(i);
    }

    originalItems.forEach(function (el) {
      el.remove();
    });
    newItems.forEach(function (el) {
      return main.appendChild(el);
    });
  }
})(window.app = window.app || {});