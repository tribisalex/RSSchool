import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Articles, DSources } from '../../types/index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: Articles) => this.view.drawNews(data))
            );
        this.controller.getSources((data: DSources) => this.view.drawSources(data));
    }
}

export default App;
