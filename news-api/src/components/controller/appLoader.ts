import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: '2b0c2736a87843beaab7e1c55c804742',
        });
    }
}

export default AppLoader;
