(function() {

  'use strict';

  class Menu {

    // конструктор запишит свойства в создаваемый экземпляр класса Меню
    constructor (arg) {
      // сохраняем аргументы в свойства экземпляра
      // el - имя контейнера, на котором будут отслежены всплывающие события
      this.el = arg.el;
      this.title = arg.title;
      this.data = arg.data;
      this.parentList = arg.list;

      // отрисовка начальных данных
      this.render();

      // вызываем (инициализируем) обработчики событий
      this._initEvents ();

    }

    // --------------- Методы ---------------------

    render () {
      // заголовок
      let title = this.title;
      // нужно поменять на data-

      title.innerHTML = this.data.title;
      let parentList = this.parentList;

      // создание пунктов меню:

      // получаем пункты из настроек
      let items = this.data.items;

      // сохраняем метод addItem в переменную с добавлением контекста
      let addItemThis = this.addItem.bind(this);

      // создаем функцию-коллбек для цикла forEach
      function addRender (item) {
        addItemThis(item);
      }

      // запускаем цикл перебора массива объектов, содержащих ссылки
      items.forEach( addRender);

    }

    // метод, обабатывающий события на элементе el (в данном случае клики)
    // при всплытие на el события 'click', метод запустит функцию _onClick
    _initEvents () {
      this.el.addEventListener('click', this._onClick.bind(this));
    }

    // метод, обабатывающий клик
    // здесь event - это объект события, переданный из
    // _initEvents через _onClick.bind(this);

    _onClick (event) {
      // определяем элемент, по которому непосредственно кликнули
      // (свойство target объекта event)
      let target = event.target;

      switch(target.dataset.action) {
        case 'bookmark__add':
        // нажата кнопка добавить --> добавить пункт в меню
        event.preventDefault();
        this.addItem(target);
        break;

        case 'bookmark__del':
        // нажата кнопка удалить --> удалить пункт из меню
        event.preventDefault();
        this.delItem(target);
        break;
      }

    }

    // метод, добавляющий пункт в меню
    addItem (item, parentList = this.parentList) {

      // для каждого пункта создаем обертку и присваеваем ей класс
      let bookmarkItem = document.createElement('div');
      bookmarkItem.classList.add('bookmark__item');

      // получаем url
      let url = '';

      // проверяем наличие url в настройках

      console.log(this);
      //
      if (item.anchor) {
        url = item.anchor;
        // console.log(this);
      } else {
        // console.log(this);
        let input = this.el.querySelector('.bookmark__add-text');
        url = input.value;
        // url = this._urlValidation(url);
      }

      // создаем элемент а и получаем ее свойства
      let a =  document.createElement('a');
      a.href = url;
      let host = a.hostname;
      let hostname = host.charAt(0).toUpperCase() + host.slice(1);

      // создаем фавикон
      let faviconImgUrl = url + "/favicon.ico";
      // bookmarkFavicon.appendChild(faviconImg);

      // шаблон содержания пункта меню
      let itemHtml = `
            <div class="bookmark__favicon">
              <img src="${faviconImgUrl}">
            </div>
            <div class="bookmark__link">
              <a href="${url}">${hostname}</a>
            </div>
            <button class="bookmark__del" data-action="bookmark__del"></button>
      `
      // вставка содержания в пункт меню
      bookmarkItem.innerHTML = itemHtml;
      // вставка в документ готового пункта
      parentList.appendChild(bookmarkItem);

    }

    // метод, удаляющий пункт в меню
    delItem (target) {
      this.parentList.removeChild(target.parentElement);
    }

    _urlValidation (url) {
      let isUrl = (url.indexOf("://") != -1) && (url.indexOf(".") != -1);
      if (!isUrl) {
        url = "http://" + url;
      }
      return url;
    }

    _urlValidation2 (item) {
      let url = '';

      // проверяем наличие url в настройках
      if (item.anchor) {
        url = item.anchor;
      } else {
        let input = this.el.querySelector('.bookmark__add-text');
        url = input.value;
        url = this._urlValidation(url);
      }

      let isUrl = (url.indexOf("://") != -1) && (url.indexOf(".") != -1);
      if (!isUrl) {
        url = "http://" + url;
      }
      return url;
    }

  }


  // экспорт
  window.Menu = Menu;
  window.testG = "testG";

})();
