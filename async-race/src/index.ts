import { renderPage } from "./renderPage";
import { listener } from "./listener";
import { checkPagination } from "./supportFunctions";

await renderPage();
listener();
await checkPagination();
