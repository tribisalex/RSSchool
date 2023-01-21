import store from "./store";
import { Auto, Winners } from "./types/types";

const renderChangeViewBlock = (): string => `
  <div class='change-view-block d-flex justify-content-center'>
    <button class='garage__button button-project'>TO GARAGE</button>
    <button class='winners__button button-project'>TO WINNERS</button>
  </div>
`;

const renderCarIco = (color: string) => `
  <svg class='auto__ico-it' fill="${color}" width="80px" height="80px" viewBox="0 -39.69 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
    style="enable-background:new 0 0 122.88 43.49" xml:space="preserve" stroke="${color}" transform="matrix(-1, 0, 0, 1, 0, 0)">
    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style> <g> <path class="st0" d="M103.94,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76c-5.39,0-9.76-4.37-9.76-9.76 C94.18,28.34,98.55,23.97,103.94,23.97L103.94,23.97z M23,29.07v3.51h3.51C26.09,30.86,24.73,29.49,23,29.07L23,29.07z M26.52,34.87H23v3.51C24.73,37.97,26.09,36.6,26.52,34.87L26.52,34.87z M20.71,38.39v-3.51H17.2 C17.62,36.6,18.99,37.96,20.71,38.39L20.71,38.39z M17.2,32.59h3.51v-3.51C18.99,29.49,17.62,30.86,17.2,32.59L17.2,32.59z M105.09,29.07v3.51h3.51C108.18,30.86,106.82,29.49,105.09,29.07L105.09,29.07z M108.6,34.87h-3.51v3.51 C106.82,37.97,108.18,36.6,108.6,34.87L108.6,34.87z M102.8,38.39v-3.51h-3.51C99.71,36.6,101.07,37.96,102.8,38.39L102.8,38.39z M99.28,32.59h3.51v-3.51C101.07,29.49,99.71,30.86,99.28,32.59L99.28,32.59z M49.29,12.79c-1.54-0.35-3.07-0.35-4.61-0.28 C56.73,6.18,61.46,2.07,75.57,2.9l-1.94,12.87L50.4,16.65c0.21-0.61,0.33-0.94,0.37-1.55C50.88,13.36,50.86,13.15,49.29,12.79 L49.29,12.79z M79.12,3.13L76.6,15.6l24.13-0.98c2.48-0.1,2.91-1.19,1.41-3.28c-0.68-0.95-1.44-1.89-2.31-2.82 C93.59,1.86,87.38,3.24,79.12,3.13L79.12,3.13z M0.46,27.28H1.2c0.46-2.04,1.37-3.88,2.71-5.53c2.94-3.66,4.28-3.2,8.65-3.99 l24.46-4.61c5.43-3.86,11.98-7.3,19.97-10.2C64.4,0.25,69.63-0.01,77.56,0c4.54,0.01,9.14,0.28,13.81,0.84 c2.37,0.15,4.69,0.47,6.97,0.93c2.73,0.55,5.41,1.31,8.04,2.21l9.8,5.66c2.89,1.67,3.51,3.62,3.88,6.81l1.38,11.78h1.43v6.51 c-0.2,2.19-1.06,2.52-2.88,2.52h-2.37c0.92-20.59-28.05-24.11-27.42,1.63H34.76c3.73-17.75-14.17-23.91-22.96-13.76 c-2.67,3.09-3.6,7.31-3.36,12.3H2.03c-0.51-0.24-0.91-0.57-1.21-0.98c-1.05-1.43-0.82-5.74-0.74-8.23 C0.09,27.55-0.12,27.28,0.46,27.28L0.46,27.28z M21.86,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76 c-5.39,0-9.76-4.37-9.76-9.76C12.1,28.34,16.47,23.97,21.86,23.97L21.86,23.97z"/> </g> </g>
  </svg>
`;

const renderFlag = (autoId: number): string => `
  <div class="flag__ico" id='flag-ico-${autoId}'>
    <svg fill="#ff0000" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" transform="matrix(1, 0, 0, 1, 0, 0)">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        <path d="M20,5l-4,5,4,5H6v6a1,1,0,0,1-2,0V3A1,1,0,0,1,6,3V5Z"/>
      </g>
    </svg>
  </div>
`;

const renderCar = (auto: Auto): string => `
  <div class='auto-item__controls'>
    <button class='select__auto button-project' id='select-auto-${
      auto.id
    }'>SELECT</button>
    <button class='delete__auto button-project' id='remove-auto-${
      auto.id
    }'>REMOVE</button>
    <span class='name__auto'>${auto.name}</span>
  </div>
  <div class='auto-item__race'>
    <div class='auto-item__race-block'>
      <div class='started-engine__button button-engine'>A</div>
      <div class='stop-engine__button button-engine'>B</div>
    </div>
    <div class='auto__ico' id='auto-${auto.id}'>
      ${renderCarIco(auto.color)}
    </div>
    ${renderFlag(auto.id)}
  </div>
`;

const renderGarage = (): string => `
  <h1 class="h1">Garage (${store.carsCount})</h1>
    <div class="pagination-garage pagination">
      <span>Page</span>
      <span class="pagination__garage-page">#${store.carsCurrentPage}</span>
    </div>
    <ul class='auto__block'>
    ${store.cars
      .map(
        (auto: Auto) => `
      <li class='auto__block-item'>${renderCar(auto)}</li>
    `
      )
      .join("")}
    </ul>
`;

const renderCreateUpdateForm = (): string => `
  <div>
    <form class='create-auto change-auto' id='create-auto'>
      <input class="name__auto__create input" type='text' value='' placeholder='Enter auto'>
      <input class="color__auto__create" type='color'>
      <button class='button-project'>Create auto</button>
    </form>
    <form class='update-auto change-auto' id='update-auto' >
      <input class="name__auto__update input" type='text' value='' placeholder='Enter auto'>
      <input class="color__auto__update" type='color' value='#12af55'>
      <button class='button-project'>Update auto</button>
    </form>
  </div>
`;

const renderStartRace = (): string => `
    <div class="start-race change-auto">
      <button class='button-project'>RACE</button>
      <button class='button-project'>RESET</button>
      <button class='button-project'>GENERATE CARS</button>
    </div>
`;

const renderTBodyWinners = (): string => `
      <tbody>
      ${store.winners
        .map(
          (winner: Winners, index: number) => `
      <tr>
        <td>${index + 1}</td>
        <td>
        ${renderCarIco(winner.car.color)}
        </td>
        <td>${winner.car.name}</td>
        <td>${winner.wins}</td>
        <td>${winner.time}</td>
      </tr>
    `
        )
        .join("")}
      </tbody>
`;

const renderWinnersTable = (): string => `
    <table class="winners__table">
      <thead>
      <tr>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th>Wins</th>
        <th>Best time (seconds)</th>
      </tr>
      </thead>
      ${renderTBodyWinners()}
    </table>
`;

const renderPaginationButton = (): string => `
  <div class="pagination__control">
    <button class='button-project prev-button'>PREV</button>
    <button class='button-project next-button'>NEXT</button>
  </div>
`;

const renderWinners = (): string => `
  <h1 class="h1">Winners (${store.winnersCount})</h1>
    <div class="pagination-winners pagination">
      <span>Page</span>
      <span class="pagination__winners-page">#${store.winnersCurrentPage}</span>
    </div>
  ${renderWinnersTable()}
  </div>
  ${renderPaginationButton()}
`;

export const renderPage = async () => {
  const pageLayout = `
  ${renderChangeViewBlock()} 
  <div class='garage-view'>  
  ${renderCreateUpdateForm()}
  ${renderStartRace()}
  ${renderGarage()}
  </div>
 
  <div class="winners-view">
  ${renderWinners()}
    `;
  const main: HTMLElement = document.createElement("div");
  main.innerHTML = pageLayout;
  document.body.appendChild(main);
};
