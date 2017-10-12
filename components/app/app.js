(function() {
    'use strict';

    // import
    let Menu = window.Menu;
    let Form = window.Form;
    //let Service = window.Service;

    /**
     * Компонента "Форма"
     */
    class App {
        /**
         * @param {Object} param0 
         * @param {HTMLElement} param0.el
         */
        constructor({el}) {
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

            let form = new Form({
                el: el.querySelector('.js-form'),
                data: {}
            });

            // Обрабатываем всплывшее событие с form
            form.el.addEventListener('toChat', (event) => {
                this.menu.addItem(event.detail);
                this.uploadData();
            });

            el.querySelector('.pics').addEventListener('click', (event) => {
                this.getBigPic();
            });

            Service.getItems(this.menu.data)
            .then((resp) => {
                this.menu.render();
            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Upload data to the server
         */
        uploadData() {
            let options = {
                method: 'PUT',
                body: JSON.stringify(this.menu.data.items)};

            fetch('https://duna2chat.firebaseio.com/menu/menu1808/items.json', options)
            .then((response) => {
                return response.json();
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Open big picture
         */
        getBigPic() {
            let pics = document.body.querySelectorAll('.map__img');
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
