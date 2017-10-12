const BASE_URL = 'https://duna2chat.firebaseio.com/menu/menu1808.json';

(function() {
    /**
     * Data source for links collection
     */
    class Service {
        /**
         * Wrapper for XMLHttpRequest
         * @param {string} method
         * @param {string} url
         * @param {Object} data
         * @return {Promise<*>}
         */
        static _makeRequest(method, url, data) {
            let options = {
                method: method,
                body: JSON.stringify(data)};
            return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Get collection
         * @param {Object} links
         * @return {Promise<*>}
         */
        static getItems(links) {
            return this._makeRequest('GET', BASE_URL, undefined)
            .then((resp) => {
                links = resp;
            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Update collections
         * @param {Object} links
         * @return {Promise<*>}
         */
        static putItems(links) {
            return this._makeRequest('PUT', BASE_URL, links)
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }
    }
    // Export
    window.Service = Service;
})();
