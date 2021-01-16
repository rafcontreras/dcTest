import React from "react";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import store from "./src/store";

configure({ useProxies: "always", enforceActions: "always" });

const StoreProvider = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export default StoreProvider;
