import { injectable, inject } from "inversify";
import { TYPES } from "../container";
import { IController } from "../interfaces/IController";
import { IControllerResponse } from "../interfaces/IControllerResponse";
import { IDatabase } from "../interfaces/IDatabase";
import { IQuote } from "../interfaces/IQuote";

const headers = {
  "Content-Type": "application/json",
};

// La anotación @injectable indica que la clase es candidata para ser inyectada
// por el contenedor de IoC.
/**
 * Controller implementation for quotes
 */
@injectable()
class QuoteController implements IController {
  private database: IDatabase;

  // Para inyectar una dependencia a través del constructor, se precede el
  // argumento con el decorador @inject, al cual le pasaremos el símbolo correspondiente
  // al nombre de la interfaz definido en la constante TYPES.
  // Así, la clase QuoteController será agnóstica de la implementación de IDatabase usada.
  constructor(@inject(TYPES.IDatabase) db: IDatabase) {
    this.database = db;
  }

  findAll(): IControllerResponse {
    const quotes: IQuote[] = this.database.findAllQuotes();

    return {
      statusCode: quotes.length > 0 ? 200 : 404,
      response: quotes,
      headers: headers,
    };
  }
}

export { QuoteController };
