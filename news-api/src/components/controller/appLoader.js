import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '2b0c2736a87843beaab7e1c55c804742', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
