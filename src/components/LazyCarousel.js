import loadable from "@loadable/component";

const LoadCarousel = loadable(() => import("./InfiniteCarousel"));

const LazyCarousel = props => <LoadCarousel {...props} />;

export default LazyCarousel;
