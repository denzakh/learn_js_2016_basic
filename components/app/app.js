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
    // data - объект menuData, содержащий 
	new Menu({
		el: document.querySelector('.bookmark'),
		data: menuData
	});

})();