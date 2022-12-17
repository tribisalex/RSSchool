import './news.css';
import { IArticle } from '../../../types/index';

class News {
    draw(data: IArticle[]): void {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item: object, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: IArticle, idx: number): void => {
            const newsClone: HTMLElement = <HTMLElement>newsItemTemp.content.cloneNode(true);
            const newsItem: HTMLElement = <HTMLElement>newsClone.querySelector('.news__item');

            if (idx % 2) newsItem.classList.add('alt');
            const newsMetaPhoto: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-photo');
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || './assets/news_placeholder.jpg'})`;

            (<HTMLElement>newsClone.querySelector('.news__meta-author')).textContent = item.author || item.source.name;
            (<HTMLElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (<HTMLElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
            (<HTMLElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock: HTMLElement = <HTMLElement>document.querySelector('.news');
        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
