(function () {
  'use strict';

// план:
// - ошибки
// - данные по запросу с сервера
// - отрисовка формы в отдельную компоненту
// - объединение и сжатие скриптов на продакшн



  // import
  let Menu = window.Menu;


  let menuData = {
    title: 'Проект закладок сайтов на JS',
    items: [
    // если комментарий
      {
        anchor: 'http://mail.ru'
      },
      {
        anchor: 'http://yandex.ru'
      },
      {
        anchor: 'http://yahoo.com'
      },
      {
        anchor: 'http://google.com'
      }
    ]
  };

  let setting = {
    // класс формы (корневой элемент приложения)
    el: '.bookmark',
    // элемент заголовка
    title: '.bookmark__title',
    // элемент, содержащий список ссылок
    list: '.bookmark__list1',
    // элемент ввода новых ссылок
    input: '.bookmark__add-text',
    // данные
    data: menuData
  }

    // создаем объект (новый экземпляр класса) Menu и передаем ему
    // обыект с настройками:
  new Menu(setting);

})();
