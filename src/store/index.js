import { observable, action } from "mobx";
import testLocalStorage from "./storeUtils/testLocalStorage";
import {
  getDashboardData,
  setDashboardData,
  resetDashboardData
} from "./storeUtils/dashboardDataFunctions";
import { localStored } from "../utils/mobxStorageHydration";

const windowExists = typeof window === "object";
const storageAvailable = windowExists ? testLocalStorage() : false;
const dashboardData = {};

class Store {
  @observable dashboardData;
  // @observable dashboardWorker;
  @observable loaded;

  constructor() {
    this.dashboardData = localStored({
      key: "dashboardData",
      defaultValue: dashboardData,
      storageAvailable
    });
    this.loaded = false;
  }

  @action
  setLoaded(value) {
    this.loaded = value;
  }

  @action
  getDashboardData = getDashboardData.bind(this);

  @action
  setDashboardData = setDashboardData.bind(this);

  @action
  resetDashboardData = resetDashboardData.bind(this);
}

const store = new Store();

export default store;
