(function() {

  'use strict';

  class Menu {

    // конструктор запишит свойства в создаваемый экземпляр класса Меню
    constructor (arg) {
      // сохраняем аргументы в свойства экземпляра
      // el - имя контейнера, на котором будут отслежены всплывающие события
      this.el = arg.el;
      this.data = arg.data;

      // отрисовка начальных данных
      this.render();

      // вызываем (инициализируем) обработчики событий
      this._initEvents ();
    }

    render () {
      // заголовок
      let title = this.el.querySelector('.bookmark__title');
      title.innerHTML = this.data.title;

      // создание пунктов меню:
      //
      // находим родитель списка
      let parentList = this.el.querySelector('.bookmark__list');
      // создаем переменную для html
      let menuList;
      // пункты из настроек
      let items = this.data.items;
      // цикл перебора массива объектов, содержащих ссылки в поле anchor
      items.forEach( function(item, i, arr) {

        // для каждого пункта создаем обертку и присваеваем ей класс
        let bookmarkItem = document.createElement('div');
        bookmarkItem.classList.add('bookmark__item');

        // работа со ссылкой
        let bookmarkLink =  document.createElement('div');
        bookmarkLink.classList.add('bookmark__link');
        // получаем url
        let url = item.anchor;

        // создаем ссылку
        let a =  document.createElement('a');
        a.href = url;
        let host = a.hostname;
        let hostname = host.charAt(0).toUpperCase() + host.slice(1);
        let protocol = a.protocol.replace(':','');
        a.innerHTML = hostname;
        bookmarkLink.appendChild(a);

        // создаем фавикон
        let bookmarkFavicon = document.createElement('div');
        bookmarkFavicon.classList.add('bookmark__favicon');
        let faviconImg = document.createElement('img');
        faviconImg.src = protocol + "://" + host + "/favicon.ico";
        bookmarkFavicon.appendChild(faviconImg);

        // создаем кнопку удаления
        let bookmarkDel = document.createElement('button');
        bookmarkDel.classList.add('bookmark__del-btn');

        // собираем внутренние части пункта меню вместе
        bookmarkItem.appendChild(bookmarkFavicon);
        bookmarkItem.appendChild(bookmarkLink);
        bookmarkItem.appendChild(bookmarkDel);

        // вставка в документ
        parentList.appendChild(bookmarkItem);

      }  );



    }

    // метод, обабатывающий события на элементе el (в данном случае клики)
    // при всплытие на el события 'click', метод запустит функцию _onClick
    _initEvents () {
      this.el.addEventListener('click', this._onClick.bind(this));
      console.log(this.el);
    }

    // метод, обабатывающий клик
    // здесь event - это объект события, переданный из _initEvents через _onClick.bind(this);

    _onClick (event) {
      // определяем элемент, по которому непосредственно кликнули
      // (свойство target объекта event)
      let target = event.target;

      if (target.classList.contains("bookmark__add-btn") ) {
        // нажата кнопка добавить --> добавить пункт в меню
        this.addItem(target);
      }

      if (target.classList.contains("bookmark__del-btn") ) {
        // нажата кнопка удалить --> удалить пункт из меню
        this.delItem(target);
      }
    }

    // метод, добавляющий пункт в меню (и в объект данных?)
    addItem (target) {

    }

    // метод, удаляющий пункт в меню
    delItem (target) {

    }

  }


  // экспорт
  window.Menu = Menu;

})();
