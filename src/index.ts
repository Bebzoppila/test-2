import { LocalStoragePages } from "./localStorage";
import "./style/main.sass";
import "./style/normalize.css";
// import { LocalStoragePages } from "./localStorage"


const storage = new LocalStoragePages();
storage.init();
window.onbeforeunload = function () {
  storage.closePage();
};

const allBtn = document.querySelector(".all") as HTMLButtonElement;
allBtn.addEventListener("click", () => {
  storage.setAllStorage();
});

const mainBtn = document.querySelector(".main") as HTMLButtonElement;
mainBtn.addEventListener("click", () => {
  storage.setMainStorage();
});