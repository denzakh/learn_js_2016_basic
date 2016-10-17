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
    url: '/data/data.json'
  });
  console.log("создан объект menuModel");


  console.log("  Установка колбеков из app.js:");
  console.log("  - Установка колбека 'update':");
  // подготавливаем функцию обработки
  menuModel.on('update', (data) => {

    console.log("передаем данные из menuModel в menu:");
    menu.setData(menuModel.getData());
    console.log("вызываеем render (внутри menuModel.on)");
    menu.render();
  });

  console.log("  - Установка колбека 'add':");
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

  console.log("  - Установка колбека 'delite' в Menu:");
  // подготавливаем функцию обработки
  menuModel.on('del', (data) => {
    console.log("передаем данные из menu в menuModel:");
    menuModel.setData(menu.getData());
    console.log("вызываеем Model.save (из app.js)");
    menuModel.save();
    // console.log("вызываеем 'update' (из app.js)");
    // menuModel.trigger('update');
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
