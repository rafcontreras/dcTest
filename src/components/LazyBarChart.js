import loadable from "@loadable/component";

const LoadBarChart = loadable(() => import("./BarChart"));

const LazyBarChart = props => <LoadBarChart {...props} />;

export default LazyBarChart;
