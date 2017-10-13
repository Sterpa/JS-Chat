(function() {
    'use strict';

    const templateForm = window.formTemplate;

    /**
     * Компонента "Форма"
     */
    class Form {
        /**
         * @constructor
         * @param {Object} opts
         */
        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;

            this.render();
            this._myInitEvents();
        }

        /**
         * Создаем HTML
         */
        render() {
            this.el.innerHTML = templateForm({dayNow: this._getDateInFormat()});
        }

        /**
        * Развешиваем события
        */
        _myInitEvents() {
            this.el.addEventListener('submit', this._myTrigger.bind(this));
        }

        /**
        * Триггер
        * @param {Event} event
        */
        _myTrigger(event) {
            event.preventDefault(); // Отмена действия браeзера 'submit' по-умолчанию для формы
            let eventData = {
                day: this.el.querySelector('input[name="day"]').value,
                anchor: this.el.querySelector('input[name="anchor"]').value,
                href: this.el.querySelector('input[name="href"]').value
            };
            this.trigger('toChat', eventData);
            event.target.reset();
        }

        /**
         * Генерация события на элементе
         * @param {string} eventName
         * @param {*} eventData
         */
        trigger(eventName, eventData) {
            let myEvent = new CustomEvent(eventName, {
                detail: eventData,
                bubbles: true
            });

            this.el.dispatchEvent(myEvent);
        }

        /**
         * Получение текущей даты в формате YYYY-MM-DD
         * @return {string}
         */
        _getDateInFormat() {
            let dateNow = new Date();
            let yearNow = dateNow.getFullYear();
            let monthNow = dateNow.getMonth();
            if (monthNow < 10) monthNow = `0${monthNow}`;
            let dayNow = dateNow.getDate();
            if (dayNow < 10) dayNow = `0${dayNow}`;
            return `${yearNow}-${monthNow}-${dayNow}`;
        }
    }

    // export
    window.Form = Form;
})();
