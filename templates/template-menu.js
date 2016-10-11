(function() {

// шаблон отрисовки меню

var jstemplate = {};

jstemplate.menu = `
    <div class="bookmark">
      <form action="">
        <div class="bookmark__list-box">
          <h1 class="bookmark__title">
            <%=title%>
          </h1>
          <div class="bookmark__list">
            <%=list%>
          </div>
        </div>

        <div class="bookmark__add-box">
          <input type="text" class="bookmark__add-text" value="http://javascript.ru">
          <button class="bookmark__add-btn btn">Добавить</button>
        </div>
      </form>
    </div>
    `

  // экспорт
  window.jstemplate = jstemplate;

}());
