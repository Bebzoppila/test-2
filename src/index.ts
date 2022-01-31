import "./style/main.sass";
import "./style/normalize.css";
type LocalDataType = {
  pagesLength: number;
  mainPage: number;
  alertMain: boolean;
  alertAll: boolean;
};
let pageIndex = 1;

const setItemLocalStorage = (pagesInfo: LocalDataType) => {
  localStorage.setItem("pagesInfo", JSON.stringify(pagesInfo));
};
const getItemLocalStorage = (): LocalDataType => {
  return JSON.parse(localStorage.getItem("pagesInfo"));
};

let allData = getItemLocalStorage();
if (!allData) {
  setItemLocalStorage({
    pagesLength: 1,
    mainPage: 1,
    alertMain: false,
    alertAll: false,
  });
} else {
  let parsedDate = allData;
  parsedDate.pagesLength += 1;
  pageIndex = parsedDate.pagesLength;
  setItemLocalStorage(parsedDate);
}

window.onbeforeunload = function () {
  let parsedDate = getItemLocalStorage();
  parsedDate.pagesLength -= 1;
  if (pageIndex == parsedDate.mainPage) {
    parsedDate.mainPage = parsedDate.pagesLength;
  }
  setItemLocalStorage(parsedDate);
};

const allBtn = document.querySelector(".all") as HTMLButtonElement;
allBtn.addEventListener("click", () => {
  let parsedDate = JSON.parse(
    localStorage.getItem("pagesInfo")
  ) as LocalDataType;
  parsedDate.alertAll = true;
  localStorage.setItem("pagesInfo", JSON.stringify(parsedDate));
});

setInterval(() => {
  let parsedDate = getItemLocalStorage();
  if (parsedDate && parsedDate.alertAll) {
    alert("Сообщение всем");
  }
  if (parsedDate.alertMain && parsedDate.mainPage === pageIndex) {
    alert("Сообщение Главной");
  }
  parsedDate.alertAll = false;
  parsedDate.alertMain = false;
  setItemLocalStorage(parsedDate);
}, 1000);

const mainBtn = document.querySelector(".main") as HTMLButtonElement;
mainBtn.addEventListener("click", () => {
  let parsedDate = getItemLocalStorage();
  parsedDate.alertMain = true;
  setItemLocalStorage(parsedDate);
});
