(function() {
    'use strict';

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
            this.el.innerHTML = `
            <form class="form__form">
                <fieldset>
                    <input class="form__input-date"
                        type="date"
                        name="day"
                        required="required"
                        value="${this._getDateInFormat()}"/>
                        
                    <input class="form__input-text"
                        type="text"
                        name="anchor"
                        required="required"
                        placeholder="время - дело"/>

                    <input class="form__input-url"
                        type="url"
                        name="href"
                        placeholder="https://music.yandex.ru/oldschool/"/>

                    <button class="form__button" type="submit">&#160</button>
                </fieldset>
            </form>`;
        }

        /**
        * Развешиваем события 2
        */
        _myInitEvents() {
            this.el.addEventListener('submit', this._myTrigger.bind(this));
        }

        /**
        * Триггер 2
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
                detail: eventData
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
