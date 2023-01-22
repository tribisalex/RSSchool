import { renderPage } from "./renderPage";
import { checkPagination, listener } from "./listener";

renderPage();
listener();
await checkPagination();
