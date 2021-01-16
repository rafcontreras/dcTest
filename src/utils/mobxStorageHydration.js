import { observable, autorun, set, remove } from "mobx";
import merge from "lodash-es/merge";
import cloneDeep from "lodash-es/cloneDeep";
import isObject from "lodash-es/isObject";

const reservedKeys = ["reset", "extend", "destroy"];

const checkReservedKeys = object => {
  if (isObject(object)) {
    Object.keys(object).forEach(key => {
      if (reservedKeys.includes(key)) {
        throw new TypeError(
          `Property ${key} is reserved for storedObservable method`
        );
      }
    });
  }
};

const factory = storageType => ({
  key,
  defaultValue,
  storageAvailable,
  autorunOpts = { delay: 500 }
}) => {
  const storage = storageAvailable && window[storageType];
  const fromStorage = storage && storage.getItem(key);
  checkReservedKeys(defaultValue);
  storage && checkReservedKeys(fromStorage);
  let disposeAutorun;

  const defaultClone = Object.assign(
    Object.assign({}, cloneDeep(defaultValue)),
    {
      reset() {
        disposeAutorun && disposeAutorun();
        set(obsVal, defaultValue);
        Object.keys(obsVal).forEach(item => {
          if (
            !defaultValue.hasOwnProperty(item) &&
            !["reset", "extend", "destroy"].includes(item)
          ) {
            remove(obsVal, item);
          }
        });
        establishAutorun();
      },
      extend(obj) {
        disposeAutorun && disposeAutorun();
        set(obsVal, obj);
        establishAutorun();
      },
      destroy() {
        disposeAutorun();
        storage && storage.removeItem(key);
      }
    }
  );
  if (fromStorage) {
    merge(defaultClone, JSON.parse(fromStorage));
  }
  const obsVal = observable(defaultClone);
  const establishAutorun = () => {
    disposeAutorun = autorun(() => {
      if (storage) {
        const stringified = JSON.stringify(obsVal);
        storage.setItem(key, stringified);
      }
    }, autorunOpts);
  };
  establishAutorun();
  return obsVal;
};

export const localStored = factory("localStorage");
export const sessionStored = factory("sessionStorage");
