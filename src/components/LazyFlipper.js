import loadable from "@loadable/component";

const LoadFlipper = loadable(() => import("./Flipper"));

const LazyFlipper = props => <LoadFlipper {...props} />;

export default LazyFlipper;
