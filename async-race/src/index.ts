import { renderPage } from "./renderPage";
import { checkPagination, listener } from "./listener";

await renderPage();
listener();
await checkPagination();
