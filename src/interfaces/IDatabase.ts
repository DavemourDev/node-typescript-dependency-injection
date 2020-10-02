import { IQuote } from "./IQuote";

/**
 * Basic database model structure for quotes.
 */
interface IDatabase {
  /**
   * Gets all quotes on the database.
   */
  findAllQuotes: () => IQuote[];
}

export { IDatabase };
