(function () {
  'use strict';

// план:
// - отрисовка формы в отдельную компоненту
// - вынуть шаблон пунктов из меню
// - кнопка обновления данных
// - сборка (webpack)

  // Настройки:
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

  // import
  let Menu = window.Menu;
  let Model = window.Model;

  // создаем объект Model (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  let menuModel = new Model({
    url: '/data/data.json',
    data: {"start":1}
  });

  // первичное обновление данных (сам добавил)
  // menuModel.fetch();
  // console.log(menuModel.getData());

  // создаем объект Menu (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  new Menu(setting);

  // на событие update те данные,
  // которые получаю в обработчике,
  // буду устанавливать в менюшку
  menuModel.on('update', (data) => {
    Menu.setData (data);
    Menu.render();
  });

  // указания на обновление данных
  // можно повесить на кнопку
  menuModel.fetch();

})();
