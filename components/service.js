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
         * 
         */
        static _makeRequest(method, url, data) {
            let options = {
                method: method,
                body: JSON.stringify(data)};
            fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        /**
         * Get collection
         * @return {Promise<*>}
         */
        static getItems() {
            return this._makeRequest('GET', BASE_URL, undefined);
        }

        /**
         * Update collections
         * @param {Object} links
         * @return {Promise<*>}
         */
        static putItems(links) {
            return this._makeRequest('PUT', BASE_URL, links);
        }
    }
    // Export
    window.Service = Service;
})();
