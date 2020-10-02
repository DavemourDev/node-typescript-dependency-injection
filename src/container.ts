import { Container } from "inversify";

// Instanciamos el contenedor IoC de nuestra aplicación.

/**
 * The application IoC container.
 */
const container = new Container();

// Y a continuación, definimos un objeto mapa para los símbolos de cada interface.
// Esto es necesario porque no podemos usar las interfaces como argumentos
// de forma directa.

/**
 * Type mapping to symbols.
 */
const TYPES = {
  // Cada interface debe asociarse a un símbolo para poder
  // ser configurada en el contenedor.
  IController: Symbol("IController"),
  IDatabase: Symbol("IDatabase"),
};

export { container, TYPES };
