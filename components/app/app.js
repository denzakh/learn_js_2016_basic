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

  console.log("  Cоздание объектов:");
  // создаем объект Menu (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  let menu = new Menu(setting);
  console.log("создан объект Menu");

  // создаем объект Model (новый экземпляр класса)
  // и передаем ему обыект с настройками:
  let menuModel = new Model({
    url: 'https://firebasestorage.googleapis.com/v0/b/jsbookmark-ca1a5.appspot.com/o/data.json?alt=media&token=4b91f315-527d-4e82-9ca6-15b93c91f996'
  });
  console.log("создан объект menuModel");

  // подготавливаем функции колбеки
  console.log("  Установка колбеков из app.js:");

  console.log("  - Установка колбека 'update':");

  menuModel.on('fetch', (data) => {
    console.log(" - передаем данные из menuModel в menu:");
    menu.setData(menuModel.getData());
    console.log("вызываеем render (внутри menuModel.on)");
    menu.render();
  });

  console.log("  - Установка колбека 'save':");
  // добавление колбека на добавление пункта
  menu.on ('save', (data) => {
    console.log(" - передаем данные из menu в menuModel:");
    menuModel.setData(menu.getData());
    menuModel.save();
  });

  // вызываем первичную орисовку
  console.log("  Первичная отрисовка:");
  menuModel.fetch();

  // menuModel.save();




  // указания на обновление данных
  // можно повесить на кнопку
  // console.log("из app.js вызван метод fetch");
  // menuModel.fetch();

})();
