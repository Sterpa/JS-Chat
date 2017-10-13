(function() {
    'use strict';

    // import
    let Menu = window.Menu;
    let Form = window.Form;
    let Service = window.Service;

    /**
     * Компонента "Форма"
     */
    class App {
        /**
         * @param {Object} param0 
         * @param {HTMLElement} param0.el
         */
        constructor({el}) {
            this.el = el;

            this.menu = new Menu({
                el: document.querySelector('.js-menu'),
                data: {
                    title: 'Список дел в этой вселенной',
                    items: [
                        {
                            day: new Date(),
                            anchor: 'Loading...',
                            href: 'https://duna2chat.firebaseio.com/menu/menu1808.json'
                        }
                    ]
                },
                onPick(item) {
                    console.log(item);
                }
            });

            this.form = new Form({
                el: el.querySelector('.js-form'),
                data: {}
            });

            // Обрабатываем всплывающее событие с form
            this.el.addEventListener('toChat', (event) => {
                this.menu.addItem(event.detail);
                this.uploadData();
            });

            // Обрабатываем click событие на слайдшоу
            this.el.querySelector('.pics').addEventListener('click', this.getBigPic.bind(this));

            this.loadData();
        }

        /**
         * Load data from server
         * @return {Promise<*>}
         */
        loadData() {
            return Service.getItems()
            .then((resp) => {
                this.menu.setData(resp);
            })
            .catch((error) => {
                console.log('Error fetch(loadData): ' + error.message);
            });
        }

        /**
         * Upload data to the server
         * @return {Promise<*>}
         */
        uploadData() {
            return Service.putItems(this.menu.data)
            .catch((error) => {
                console.log('Error fetch(uploadData): ' + error.message);
            });
        }

        /**
         * Open big picture
         */
        getBigPic() {
            let pics = this.el.querySelectorAll('.map__img');
            let target = pics[0];
            for (let i = 0; i < pics.length; i++) {
                let op = 0;
                let st = getComputedStyle(pics[i]);
                if (st.opacity > op) {
                    op = st.opacity;
                    target = pics[i];
                }
            }
            window.open(target.src);
        }
    }

    // export
    window.App = App;
})();
