import './news.css';
import { IArticle } from '../../../types/index';

class News {
    draw(data: IArticle[]) {
        const news = data.length >= 10 ? data.filter((_item: object, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: IArticle, idx: number): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLElement;

            if (idx % 2) newsItem.classList.add('alt');
            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLFormElement;
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock = document.querySelector('.news') as HTMLFormElement;
        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
