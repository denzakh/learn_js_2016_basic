(function() {

  'use strict';

  class Menu {

    // конструктор запишит свойства в создаваемый экземпляр класса Меню
    constructor (arg) {

      // получаем настройки и сохраняем аргументы в свойства
      this.el = document.querySelector(arg.el);
      this.title = document.querySelector(arg.title);
      this.parentList = document.querySelector(arg.list);
      this.input = document.querySelector(arg.input);

      // делаем пустой массив для html
      this.htmlList = [];

      // проверяем настройки на ошибки
      this._isErrorSetting(arg)

      // вызываем (инициализируем) обработчики событий
      this._initEvents ();

    }

    // --------------- Методы ---------------------


    /// setData - метод, сохраняющий данные в поле data
    setData (data) {
      this.data = data;
    }

    /// render - метод, отрисовывающий меню
    render () {
      // создание заголовка
      this.title.innerHTML = this.data.title;

      // создание пунктов меню:
      // получаем пункты из настроек
      let items = this.data.items;

      // сохраняем метод addItem в переменную с добавлением контекста
      let addItemThis = this.addItem.bind(this);

      // создаем функцию-коллбек для цикла forEach
      function addRender (item) {
        addItemThis(item);
      }

      // запускаем цикл перебора массива объектов содержащих ссылки,
      // который вызывает метод addItem, создающий сохраненные пункты меню
      items.forEach( addRender);

      // склеиваем массив html и вставляем меню в документ
      this.parentList.innerHTML = this.htmlList.join("");
    }

    /// _isErrorSetting - метод проверки на ошибки настроек
    _isErrorSetting (arg) {

      try {

        if (!this.el) {
          throw "неправильно указан класс корневого элемента приложения (" + arg.el + ")";
        }
        if (!this.title) {
          throw "неправильно указан класс заголовка формы (" + arg.title + ")";
        }
        if (!this.parentList) {
          throw "неправильно указан класс элемента, содержащего список пунктов меню (" + arg.list + ")";
        }
        if (!this.input) {
          throw "неправильно указан класс элемента ввода input (" + arg.input + ")";
        }

        return true;

      } catch (e) {
        console.log( "Ошибка в настройках: " + e);
      }

    }

    /// _isErrorData - метод проверки на ошибки получения данных
    _isErrorData (arg) {

      try {

        if (!this.data) {
          throw "нет объекта данных (" + arg.data + ")";
        }

        return true;

      } catch (e) {
        console.log( "Ошибка получения данных: " + e);
      }

    }

    /// _initEvents - метод, обабатывающий события на элементе el (корневой)
    // так, при всплытие на el события 'click', метод запустит функцию _onClick
    _initEvents () {
      this.el.addEventListener('click', this._onClick.bind(this));
    }

    /// _onClick - метод, обабатывающий клик
    // здесь event - это объект события, переданный из
    // _initEvents через _onClick.bind(this);
    _onClick (event) {
      // определяем элемент, по которому непосредственно кликнули
      // (свойство target объекта event)
      let target = event.target;

      // определяет элемент, на котором возникло событие
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

    /// addItem - метод, добавляющий пункт в меню
    addItem (item, parentList = this.parentList) {

      // получаем url
      let url = this._urlValidation(item);

      // проверяем url на пустоту
      if (url) {

        // создаем элемент а и получаем ее свойства
        let a =  document.createElement('a');
        a.href = url;
        let host = a.hostname;
        let hostname = host.charAt(0).toUpperCase() + host.slice(1);

        // создаем фавикон
        let faviconImgUrl = url + "/favicon.ico";

        // шаблон содержания пункта меню
        let itemHtml = `
            <div class="bookmark__item">
              <div class="bookmark__favicon">
                <img src="${url}/favicon.ico">
              </div>
              <div class="bookmark__link">
                <a href="${url}">${hostname}</a>
              </div>
              <button class="bookmark__del" type="button" data-action="bookmark__del"></button>
            </div>
        `
        // вставка пункта меню в массив html
        this.htmlList.push(itemHtml);
      }

    }

    /// _urlValidation - метод, получающий и проверяющий url
    _urlValidation (item) {

      let url = '';
      // проверяем наличие url в настройках, затем в input
      if (item.anchor) {
        url = item.anchor;
      } else {
        url = this.input.value;
      }

      // проверяем наличие url и отсутствие в нем пробелов
      if (url && (url.match(/\s/g) == null) ) {
        // проверяем наличие протокола
        if (url.indexOf("://") == -1) {
          url = "http://" + url;
        }
      } else {
        url = "";
      }

      return url;
    }

    /// delItem - метод, удаляющий пункт в меню
    delItem (target) {
      this.parentList.removeChild(target.parentElement);
    }

  }

  // экспорт
  window.Menu = Menu;

})();
