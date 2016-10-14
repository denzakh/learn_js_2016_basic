(function() {

  'use strict';

  class Model {

    /// конструктор запишит свойства в создаваемый экземпляр класса
    constructor ({url, data = {}}) {
      // получаем настройки и сохраняем аргументы в свойства
      this.url = url;
      // объект для хранения обработчиков событий
      this._handlers = {};
      // начальная установка данных
      this.setData(data);

    }

    // ------------- методы -------------

    /// setData - метод, обновляющий данные в _data
    setData (data) {
      this._data = data;
      // отправка сообщения о событии обновления в _data
      this.trigger('update', this._data);
    }

    /// getData - метод, забирающий данные из _data
    getData () {
      return this.data;
    }

    fetch () {
      this._makeRequest('GET', this.url);
    }

    // публичный метод, вызывается извне
    on (name, callback) {
      // проверяем, есть ли
      if (!this._handlers[name]) {
        // если в объекте с обработчиками событий нет свойства с названием события
        // то создадим такое свойство как пустой массив {name: []}
        this._handlers[name] = [];
      }
      // если такой пустой массив уже точно есть,
      // то добавляем в него текущий callback - {name: [callback]}
      this._handlers[name].push(callback);
    }

      // при наступлении события из объекта с обработчиками событий
      // проверить, что для текущего имени такой объект есть
      // и если такой объект есть,
      // то для каждого пункта в массиве
      // выполнить этот callback с переданными данными (аргументами)
      //
    trigger (name, data) {
      if (this._handlers[name]) {
          this._handlers[name].forEach(callback => callback(data));
      }
    }

    /// _makeRequest - метод, делающий запрос к серверу
    _makeRequest (method, url) {
      // Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();
      // конфигурируем его: GET-запрос на URL
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
          // получение данных
          let data = xhr.responseText;
          // парсигн JSON
          data = JSON.parse(data);
          // отправка сообщения о событии
          // передаем имя события и объект xhr текущего запроса
          this.trigger('fetch', xhr);
          // обновление данных в _data
          this.setData(data);

        }
      };

      xhr.send();
    }

  }

  // экспорт
  window.Model = Model;

})();
