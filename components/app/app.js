(function () {
  'use strict';

// план:
// - ошибки данных - дописать разбор
// - данные по запросу с сервера
// - отрисовка формы в отдельную компоненту
// - вынуть шаблон пунктов из меню
// - кнопка обновления данных
// - объединение и сжатие скриптов на продакшн



  // import
  let Menu = window.Menu;


  let menuData = {
    title: 'Закладки сайтов на&nbsp;JavaScript',
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
    list: '.bookmark__list',
    // элемент ввода новых ссылок
    input: '.bookmark__add-text',
    // данные
    data: menuData
  }

    // создаем объект (новый экземпляр класса) Menu и передаем ему
    // обыект с настройками:
  new Menu(setting);

})();
