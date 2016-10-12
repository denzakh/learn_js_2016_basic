(function () {
  'use strict';

  // import
  let Menu = window.Menu;


  let menuData = {
    title: 'Проект закладок сайтов на JS',
    items: [
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

    // создаем объект (новый экземпляр класса) Menu и передаем ему
    // обыект с настройками:
    // el - имя контейнера, на котором будут отслежены всплывающие события
    // list - родительский элемент для списка ссылок
    // data - объект menuData, содержащий
  new Menu({
    el: document.querySelector('.bookmark'),
    title: document.querySelector('.bookmark__title'),
    list: document.querySelector('.bookmark__list'),
    input: document.querySelector('.bookmark__add-text'),
    data: menuData
  });

})();
