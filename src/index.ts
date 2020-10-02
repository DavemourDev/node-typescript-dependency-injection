import * as http from "http";
import "reflect-metadata"; // Necesario para añadir soporte para anotaciones/decoradores.
import { TYPES, container } from "./container";
import { QuoteController } from "./controllers/QuoteController";
import { MockData } from "./database/MockData";
import { IController } from "./interfaces/IController";
import { IControllerResponse } from "./interfaces/IControllerResponse";
import { IDatabase } from "./interfaces/IDatabase";

/* CONFIG CONSTANTS */
const PORT = process.env.PORT || 3000;

/* CONTAINER BINDINGS */
// Aquí se establece qué implementación se desea que utilice el contenedor
// para resolver cada interface.
// Para la interface IDatabase establecemos la clase MockData, que utilizará datos de prueba.
// Si queremos usar otra implementación de IDatabase, solamente tenemos que
// cambiar el argumento de "to" en el binding.
container.bind<IController>(TYPES.IController).to(QuoteController);
container.bind<IDatabase>(TYPES.IDatabase).to(MockData);

// Para instanciar un objeto a través del contenedor, se utiliza el método get
// del contenedor, tipándolo para la interface deseada.
// La clase del objeto se corresponde con los bindings realizados antes.
const controller: IController = container.get<IController>(TYPES.IController);

const app: http.Server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (["", "/", undefined].includes(request.url)) {
      const result: IControllerResponse = controller.findAll();
      const headers = result.headers || {};
      response.statusCode = result.statusCode;
      Object.keys(headers).forEach((header) => {
        response.setHeader(header, headers[header]);
      });
      response.end(JSON.stringify(result.response));
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
