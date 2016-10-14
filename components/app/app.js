(function () {
  'use strict';

// план:
// - отрисовка формы в отдельную компоненту
// - вынуть шаблон пунктов из меню
// - кнопка обновления данных
// - объединение и сжатие скриптов на продакшн

  // import
  let Menu = window.Menu;
  let Model = window.Model;

  // создаем объект (новый экземпляр класса) Model
  // и передаем ему обыект с настройками:
  let menuModel = new Model({
    url: '/data/data.json',
    data: {}
  });

  menuModel.setData ("data1");
  console.log(menuModel._data);

  // на событие update те данные,
  // которые получаю в обработчике,
  // буду устанавливать в менюшку
  menuModel.on('update', (data) => {
    menu.setData (data);
    menu.render();
  });

  // свойства
  let setting = {
    // класс формы (корневой элемент приложения)
    el: '.bookmark',
    // элемент заголовка
    title: '.bookmark__title',
    // элемент, содержащий список ссылок
    list: '.bookmark__list',
    // элемент ввода новых ссылок
    input: '.bookmark__add-text'
  };

  // создаем объект (новый экземпляр класса) Menu
  // и передаем ему обыект с настройками:
  new Menu(setting);

  // указания на обновление данных
  // можно повесить на кнопку
  menuModel.fetch();

})();
