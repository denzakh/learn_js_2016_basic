(function() {

// шаблон отрисовки меню

var jstemplate = {};

jstemplate.menu = `
    <form class="bookmark" action="#" >
      <div class="bookmark__list-box">
        <h1 class="bookmark__title" >
          <%=title%>
        </h1>
        <div class="bookmark__list">
        </div>
      </div>

      <div class="bookmark__add-box">
        <input type="text" class="bookmark__add-text" value="http://javascript.ru">
        <button class="bookmark__add btn" type="submit" data-action="bookmark__add">Добавить</button>
      </div>
    </form>
    `

  // экспорт
  window.jstemplate = jstemplate;

}());
