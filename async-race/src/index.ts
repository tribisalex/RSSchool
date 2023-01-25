import { renderPage } from "./renderPage";
import { listener } from "./listener";
import { checkPagination } from "./supportFunctions";

await renderPage();
listener();
await checkPagination();
alert(
  "Уважаемый проверящий, прошу проверить работу в среду вечером - четверг утром, не успел доделать гонку. Спасибо большое)"
);
