import ReactDOM from "react-dom";
import wrapWithProvider from "./wrap-with-provider";

const onInitialClientRender = () => {
  window.addEventListener(
    "popstate",
    () => (window.location.href = window.location.href)
  );
};

const replaceHydrateFunction = () => (element, container, callback) =>
  ReactDOM.render(element, container, callback);

const wrapRootElement = wrapWithProvider;

const onServiceWorkerUpdateFound = () => {
  window.swUpdate = true;
};

const onServiceWorkerUpdateReady = async () => {
  window.localStorage.clear();
  if (caches) {
    await caches
      .keys()
      .then(async names => {
        await Promise.all(names.map(name => caches.delete(name)));
      })
      .catch(console.log);
    window.location.reload();
  }
};

export {
  onInitialClientRender,
  onServiceWorkerUpdateFound,
  onServiceWorkerUpdateReady,
  replaceHydrateFunction,
  wrapRootElement
};
