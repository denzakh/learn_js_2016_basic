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

      // объект для хранения колбеков
      this._handlers = {};

      // проверяем настройки на ошибки
      this._isErrorSetting(arg)

      // вызываем (инициализируем) обработчики событий
      this._initEvents ();

    }

    // --------------- Методы ---------------------


    /// setData - метод, сохраняющий данные в поле data
    setData (data) {
      this.data = data;
      console.log("вызван метод Menu.setData, данные сохранены");
    }

    /// setData - метод, сохраняющий данные в поле data
    getData () {
      return this.data;
      console.log("вызван метод Menu.getData, данные получены");
    }

    /// render - метод, отрисовывающий меню
    render () {
      // создание заголовка
      this.title.innerHTML = this.data.title;

      // создание пунктов меню:
      // получаем пункты из настроек
      let items = this.data.items;

      // сохраняем метод addItem в переменную с добавлением контекста
      let addItemThis = this.addItemHtml.bind(this);

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
        console.log("  Добавление пункта меню:");
        this.addItemInData(target);
        break;

        case 'bookmark__del':
        // нажата кнопка удалить --> удалить пункт из меню
        event.preventDefault();
        console.log("  Удаление пункта меню:");
        this.delItemInData(target);
        break;
      }

    }

    /// addItem - метод, добавляющий пункты в меню
    addItemHtml (item, parentList = this.parentList) {

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

    /// addItemInData - метод, добавляющий пункт в данные
    addItemInData (item, parentList = this.parentList) {

      // получаем url
      let url = this._urlValidation(item);

      // проверяем url на пустоту
      if (url) {
        // вставка пункта меню в массив data.items
        this.data.items.push({"anchor": url});


        // this.trigger('add');
      }
    }

    // публичный метод, вызывается извне
    // устанавливает в _handlers функции-колбэки на имя
    on (name, callback) {
      console.log("вызван метод Menu.on c именем " + name );
      // проверяем, есть ли
      if (!this._handlers[name]) {
        // если в объекте с обработчиками событий нет свойства с названием события
        // то создадим такое свойство как пустой массив {name: []}
        this._handlers[name] = [];
      }
      // если такой пустой массив уже точно есть,
      // то добавляем в него текущий callback - {name: [callback]}
      this._handlers[name].push(callback);
      console.log("колбек под именем '" + name + "' добавлен в объект Menu._handlers");
    }

    trigger (name, data) {
      console.log("вызван метод trigger c именем '" + name + "' ");

      if (this._handlers[name]) {
        console.log("такое имя есть, вызывается цикл, выполняющий колбеки, ");
        console.log("сохраненные под этим именем в объекте _handlers");
          this._handlers[name].forEach(callback => callback(data));
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
    delItemInData (target) {
      // определяем номер кликнутого элемента
      for (var i = 0; i < this.parentList.children.length; i++) {
        if (this.parentList.children[i] == target.parentElement) {
          // узнаем название удалемого сайта
          let removedName = target.parentElement.querySelector("[href]");
          // let removedData = this.data.items[i].anchor
          // удаляем сайт из данных
          this.data.items.splice(i, 1);
          console.log(removedName.innerHTML + " удален из данных");
        };
      }

      // this.parentList.removeChild(target.parentElement);
    }

  }

  // экспорт
  window.Menu = Menu;

})();
