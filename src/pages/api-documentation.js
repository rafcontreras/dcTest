import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import document from "../data/swagger.json";

const ApiDocumentation = () => <SwaggerUI spec={document} />;

export default ApiDocumentation;
