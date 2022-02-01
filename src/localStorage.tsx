import { AbstractLocalStorage } from "./abstract";

interface PagesInfoType {
  pagesLength: number;
  mainPage: number;
  alertMain: boolean;
  alertAll: boolean;
}

export class LocalStoragePages extends AbstractLocalStorage {
  private page: number = 1;
  private storageItemName = "pagesInfo";

  public init() {
    if (this.checkedStorage()) {
      this.updateLocalStorage();
    } else {
      this.installDefaultValues();
    }
    this.trackingStorage()
  }

  private updateLocalStorage() {
    const localData = this.getItem<PagesInfoType>(this.storageItemName);
    localData.pagesLength += 1;
    this.page = localData.pagesLength;
    localData.mainPage = localData.pagesLength
    this.setItem(this.storageItemName, localData);
  }

  private installDefaultValues() {
    this.setItem(this.storageItemName, {
      pagesLength: 1,
      mainPage: 1,
      alertMain: false,
      alertAll: false,
    });
  }

  private checkedStorage(): boolean {
    return Boolean(this.getItem<PagesInfoType>(this.storageItemName));
  }

  public closePage() {
    const localData = this.getItem<PagesInfoType>(this.storageItemName);
    localData.pagesLength = Math.max(0, localData.pagesLength - 1);
    this.setItem(this.storageItemName, localData);
  }

  public setAllStorage() {
    const localData = this.getItem<PagesInfoType>(this.storageItemName);
    localData.alertAll = true;
    this.setItem(this.storageItemName, localData);
  }
  private trackingStorage() {
    setInterval(() => {
      const localData = this.getItem<PagesInfoType>(this.storageItemName);
      if(localData.alertAll){
        alert('Привет всем')
        localData.alertAll = false
      }
      if(this.page == localData.pagesLength && localData.alertMain){
        alert('Привет Главная')
        localData.alertMain = false
      }
      
      this.setItem(this.storageItemName, localData);
    }, 1000);
  }

  public setMainStorage(){
    const localData = this.getItem<PagesInfoType>(this.storageItemName);
    localData.alertMain = true;
    this.setItem(this.storageItemName, localData);
  }
}