(function (app) {
  app.serviceItems = [];
  app.selectedItem = {};

  const menu = document.getElementById('menu-btn');
  const slide = document.getElementById('small-menu');
  const wrapper = document.getElementsByClassName('wrapper');

  app.homepage = function () {
    setCopyrightDate();
  };

  app.services = async function () {
    setCopyrightDate();
    await loadPageData();
    loadServicePageData();
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
    const date = new Date();
    document.getElementById('copyrightYear').innerText = date.getFullYear();
  }

  async function loadPageData() {
    const cacheData = sessionStorage.getItem('site-data');

    if (cacheData !== null) {
      app.serviceItems = JSON.parse(cacheData);
    } else {
      const rawData = await fetch('sitedata.json');
      const data = await rawData.json();
      app.serviceItems = data;
      sessionStorage.setItem('site-data', JSON.stringify(data));
    }
  }

  function loadServicePageData() {
    const originalItems = document.querySelectorAll('.highlight');
    const main = document.getElementById('services-main');
    const newItems = [];

    for (let i = 0; i < app.serviceItems.length; i++) {
      const el = app.serviceItems[i];
      const highlight = document.createElement('div');
      highlight.classList.add('highlight');
      if (i % 2 > 0) {
        highlight.classList.add('invert');
      }

      const textDiv = document.createElement('div');
      const h2 = document.createElement('h2');
      const ul = document.createElement('ul');

      const titleWords = el.service.split(' ');
      let service = `0${i + 1}. `;
      for (let j = 0; j < titleWords.length - 1; j++) {
        service += titleWords[j];
        service += '<br />';
      }
      service += titleWords[titleWords.length - 1];

      h2.innerHTML = `${el.service}`;
      textDiv.appendChild(h2);

      const u = el.serviceDescription.split('|');
      u.forEach((a) => {
        let li = document.createElement('li');
        li.innerHTML = `${a}`;
        ul.appendChild(li);
      });
      textDiv.appendChild(ul);

      highlight.appendChild(textDiv);

      const img = document.createElement('img');
      img.src = el.smallImage;
      img.alt = el.smallImageAlt;
      highlight.appendChild(img);

      newItems.push(highlight);
    }

    originalItems.forEach((el) => {
      el.remove();
    });

    newItems.forEach((el) => main.appendChild(el));
  }
})((window.app = window.app || {}));
