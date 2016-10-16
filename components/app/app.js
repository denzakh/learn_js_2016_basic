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

  // создаем объект Menu (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  let menu = new Menu(setting);
  console.log("создан объект Menu");

  // создаем объект Model (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  let menuModel = new Model({
    url: '/data/data.json'
  });
  console.log("создан объект menuModel");

  // подготавливаем функцию обработки
  console.log("вызываем метод menuModel.on,");
  console.log("устанавливающий функцию-колбек на имя 'update'");
  menuModel.on('update', (data) => {
    console.log("сохраняем данные из menuModel в menu");
    menu.setData(menuModel.getData());
    console.log("вызываеем render (внутри menuModel.on)");
    menu.render();
  });

  // вызываем первичную орисовку
  menuModel.fetch();

  // на событие update те данные,
  // которые получаю в обработчике,
  // буду устанавливать в менюшку
  // console.log("из app.js вызван метод menuModel.on c агументом 'update' и колбеком ");
  // console.log("состоящим из функции с арг data");
  // menuModel.on('update', (data) => {
  //   console.log("внутри menuModel.on('update', (data) )");
  //   console.log("внутри menuModel.on вызывается setData");
  //   Menu.setData (data);
  //   console.log("внутри menuModel.on вызывается render");
  //   Menu.render();
  // });

  // указания на обновление данных
  // можно повесить на кнопку
  // console.log("из app.js вызван метод fetch");
  // menuModel.fetch();

})();
