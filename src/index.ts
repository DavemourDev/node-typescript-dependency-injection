import * as http from "http";
import { Container, inject, injectable } from "inversify";
import "reflect-metadata";

/* CONFIG CONSTANTS */

const PORT = 3000;

/* INTERFACES DEFINITION*/

interface IQuote {
  sumInsured: number;
}

interface IControllerResponse {
  statusCode: number;
  response: string;
}

interface IController {
  findAll: () => IControllerResponse;
}

interface IDatabase {
  findAllQuotes: () => IQuote[];
}

interface IPepino {
  funcionPepina: () => string;
}

/* CONTAINER DEFINITION*/
const container = new Container();

const TYPES = {
  IController: Symbol("IController"),
  IDatabase: Symbol("IDatabase"),
  IPepino: Symbol("IPepino"),
};

/* CLASS IMPLEMENTATIONS */

@injectable()
class QuoteController implements IController {
  private database: IDatabase;

  constructor(@inject(TYPES.IDatabase) db: IDatabase) {
    this.database = db;
  }

  findAll(): IControllerResponse {
    const quotes: IQuote[] = this.database.findAllQuotes();

    return {
      statusCode: quotes.length > 0 ? 200 : 404,
      response: JSON.stringify(quotes),
    };
  }
}

@injectable()
class StubMockDatabase implements IDatabase {
  findAllQuotes(): IQuote[] {
    return [
      {
        sumInsured: 50000,
      },
      {
        sumInsured: 24562,
      },
      {
        sumInsured: 43561,
      },
    ];
  }
}

class Cucumber implements IPepino {
  funcionPepina() {
    return "Buah tío, el IoC está pepinísimo";
  }
}

/* CONTAINER BINDINGS */

container.bind<IController>(TYPES.IController).to(QuoteController);
container.bind<IDatabase>(TYPES.IDatabase).to(StubMockDatabase);
container.bind<IPepino>(TYPES.IPepino).to(Cucumber);

const controller: IController = container.get<IController>(TYPES.IController);

/* APP */
const app: http.Server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.url === "/quotes") {
      const result: IControllerResponse = controller.findAll();
      response.statusCode = result.statusCode;
      response.end(result.response);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// DONE
