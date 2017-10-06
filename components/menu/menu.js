(function() {
    'use strict';

    const template = window.menuTemplate;
    const templateItem = window.menuitemTemplate;

    // const tmpl = window.menuTmpl;

    /**
     * @typedef {Item} Тип элемента меню
     * @prop {string} href URL
     * @prop {string} anchor текст
     */

    /**
     * Компонента "Меню"
     */
    class Menu {
        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;
            this.onPick = opts.onPick;

            this.render();
            this._initEvents();
        }

        /**
         * Возвращает HTML элемент списка меню
         * @return {HTMLUListElement}
         */
        get list() {
            return this.el.querySelector('.menu__list');
        }

        /**
         * Возвращает HTML элемент заголовка меню
         * @return {HTMLUListElement}
         */
        get title() {
            return this.el.querySelector('.menu__title');
        }

        /**
         * Обновление состояния меню
         * @param {Object} data 
         */
        setData(data) {
            this.data = data;
            this.render();
        }

        /**
         * Добавляем элемент меню
         * @param {Object} item
         */
        addItem(item) {
            this.data.items.push(item);
            this.render();
        }

        /**
         * Удаляем пункт меню из данных
         * @param {Object} item
         */
        removeItem(item) {
            let index = parseInt(item.parentNode.dataset.index, 10);
            this.data.items.splice(index, 1);
            this.render();
        }

        /**
         * HTML одного объекта меню
         * @param {Item} item
         * @param {number} index
         * @return {string}
         */
        getItemHtml(item, index) {
            return templateItem({item, index});
        }

        /**
         * Создаем HTML
         */
        render() {
            this.el.innerHTML = template(this.data);
        }

        /**
        * Удаления элемента меню
        * @param  {Element} item
        * @private
        */
        _onRemoveClick(item) {
            this.removeItem(item);
        }

        /**
        * Выбор элемента меню
        * @param  {HTMLElement} item
        */
        _onPickClick(item) {
            this.onPick(item);
        }

        /**
        * Развешиваем события
        */
        _initEvents() {
            this.el.addEventListener('click', this._onClick.bind(this));
        }

        /**
        * Клик в любую область меню
        * @param {Event} event
        * @private
        */
        _onClick(event) {
            // if (event.target.dataset.action != 'pick') event.preventDefault();
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
            case 'remove':
                this._onPickClick(item);
                this._onRemoveClick(item);
                break;

            case 'pick':
                this._onPickClick(item);
                if (item.href) window.open(item.href);
                break;
            }
        }
    }

    // Export
    window.Menu = Menu;
})(window);
