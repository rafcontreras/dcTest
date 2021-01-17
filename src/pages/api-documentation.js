import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import document from "../data/swagger.json";

const IndexPage = () => <SwaggerUI spec={document} />;

export default IndexPage;
