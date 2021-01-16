import ShoppingWorker from "../workers/shopping.worker";

const shoppingWorker = typeof window === "object" && new ShoppingWorker();

export default shoppingWorker;
