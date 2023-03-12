import News from './news/news';
import Sources from './sources/sources';
import { Articles, IArticle, ISources, DSources } from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Articles): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DSources): void {
        const values: ISources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
