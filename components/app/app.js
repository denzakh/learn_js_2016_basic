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

  // добавление колбека на добавление пункта
  menu.on ('add', (data) => {
    // сохраняем новое значение из menu в menuModel._data
    menuModel.setData(menu.getData());
    console.log("сохранили новое значение данных из menu в menuModel");
    console.log(menuModel.getData());


     // !!! ошибка, почему-то данные дописываются
    // тут должен быть метод, кодирующий данные в json и отправляющий на сервер
    // а потом вызывающий fetch
    menuModel.fetch();
  });

  // вызываем первичную орисовку
  menuModel.fetch();



  // указания на обновление данных
  // можно повесить на кнопку
  // console.log("из app.js вызван метод fetch");
  // menuModel.fetch();

})();
