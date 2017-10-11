(function() {
    'use strict';

    // import
    let Menu = window.Menu;
    let Form = window.Form;

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
                this.uploadData2();
            });

            document.body.querySelector('.pics').addEventListener('click', (event) => {
                console.log('yes');
                this.getBigPic();
            });

            this.loadData2();
        }

        /**
         * Load data from server
         */
        loadData() {
            const url = 'https://duna2chat.firebaseio.com/menu/menu1808.json';
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.error('Сетевая ошибка', xhr);
                    } else {
                        const resp = xhr.responseText;

                        this.menu.setData(JSON.parse(resp));
                    }
                }
            });

            xhr.open('GET', url, true);
            xhr.send();
        }

        /**
         * Load data from server (fetch)
         */
        loadData2() {
            fetch('https://duna2chat.firebaseio.com/menu/menu1808.json')
            .then((response) => {
                return response.json();
            })
            .then((resp) => {
                this.menu.setData(resp);
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Upload data to the server
         */
        uploadData2() {
            let options = {
                method: 'PUT',
                body: JSON.stringify(this.menu.data)};

            fetch('https://duna2chat.firebaseio.com/menu/menu1808.json', options)
            .then((response) => {
                return response.json();
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Upload data to the server
         */
        uploadData() {
            const url = 'https://duna2chat.firebaseio.com/menu/menu1808.json';
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', url, true);

            xhr.onload = (event) => {
                console.log('DONE!');
            };

            xhr.send(JSON.stringify(this.menu.data));
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
