import './sources.css';
import { ISources } from '../../../types/index';
class Sources {
    draw(data: ISources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');
        data.forEach((item: ISources) => {
            const sourceClone: HTMLElement = <HTMLElement>sourceItemTemp.content.cloneNode(true);
            // (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (<HTMLElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        (<HTMLElement>document.querySelector('.sources')).append(fragment);
    }
}
export default Sources;
