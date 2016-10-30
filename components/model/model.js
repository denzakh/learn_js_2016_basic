(function() {

  'use strict';

  class Model {

    /// конструктор запишит свойства в создаваемый экземпляр класса
    constructor ({url, data = {}}) {
      // получаем настройки и сохраняем аргументы в свойства
      this.url = url;
      // объект для хранения обработчиков событий
      this._handlers = {};

    }

    // ------------- методы -------------

    /// setData - метод, обновляющий данные в _data
    setData (data) {
      console.log("вызван метод Model.setData, данные получены и сохранены");
      this._data = data;
      // отправка сообщения о событии обновления в _data
      // this.trigger('update', this._data);
    }

    /// getData - метод, забирающий данные из _data
    getData () {
      console.log("вызван метод Model.getData, данные выданы");
      return this._data;
    }

    // публичный метод, вызывается извне для обновления данных
    fetch () {
      console.log("вызван метод fetch");
      this._makeRequest('GET', this.url, this._onFetch.bind(this));
    }

    _onFetch(data, xhr) {
      console.log("вызов _onFetch");
      this.setData(data);
      this.trigger('fetch', this._data);
    }

    save () {
      console.log("вызван метод save");
      this._makeRequest('PUT', this.url, this._onSave.bind(this));
    }

    _onSave(data, xhr) {
      console.log("вызов _onSave");
      this.setData(data);
      this.fetch();
    }

    // публичный метод, вызывается извне
    // устанавливает в _handlers функции-колбэки на имя
    on (name, callback) {
      console.log("вызван метод Model.on c именем " + name );
      // проверяем, есть ли
      if (!this._handlers[name]) {
        // если в объекте с обработчиками событий нет свойства с названием события
        // то создадим такое свойство как пустой массив {name: []}
        this._handlers[name] = [];
      }
      // если такой пустой массив уже точно есть,
      // то добавляем в него текущий callback - {name: [callback]}
      this._handlers[name].push(callback);
      console.log("колбек под именем '" + name + "' добавлен в объект Model._handlers");
    }

      // trigger выполняет функции по имени
      // принимает аргументами имя и данные
      // при наступлении события из объекта с обработчиками событий _handlers
      // проверить, что для текущего имени такой объект есть
      // и если такой объект есть, то для каждого пункта в массиве
      // выполнить этот callback с переданными данными (аргументами)
      //
    trigger (name, data) {
      console.log("вызван метод Model.trigger c именем '" + name + "' ");

      if (this._handlers[name]) {
        console.log("такое имя есть, активирован колбек для '" + name + "'");
          this._handlers[name].forEach(callback => callback(data));
      }
    }

    /// _makeRequest - метод, делающий запрос к серверу
    _makeRequest (method, url, callback) {
      console.log("вызван метод _makeRequest c методом " + method);
      // Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();
      // конфигурируем его: GET или PUT-запрос на URL
      xhr.open(method, url, true);
      // подписываемся на событие изменения статуса
      xhr.onreadystatechange = () => {
        // проверка статуса загрузки, ждем ответ == 4
        if (xhr.readyState !== 4) {
          // console.log(xhr.readyState, xhr.status);
          return;
        }

        // если код ответа сервера не 200, то это ошибка
        if (xhr.status !== 200) {
          // обработать ошибку
          console.log(xhr.status + ': ' + xhr.statusText);
        } else {
          console.log("запрос удачно завершен");
          // получение данных
          let data = xhr.responseText;
          // парсигн JSON
          data = JSON.parse(data);
          console.log("получены данные из json");
          // отправка сообщения о событии
          // передаем имя события и объект xhr текущего запроса
          // this.trigger('fetch', xhr);
          // console.log("из _makeRequest вызван метод trigger");
          // console.log("с аргументами  'fetch' и xhr ");
          // обновление данных в _data
          // this.setData(data);
          //

          callback(data, xhr);
          console.log(callback);
        }
      };

      let data = null;

      if (method == 'PUT') {
        data = JSON.stringify(this.getData());
        console.log("json из Model.data записан в строку");
      }

      xhr.send(data);
      console.log("отправлен запрос на сервер");
    }

  }

  // экспорт
  window.Model = Model;

})();
