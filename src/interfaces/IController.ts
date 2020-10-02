import { IControllerResponse } from "./IControllerResponse";

/**
 * Basic controller structure.
 */
interface IController {
  /**
   * Gets all elements from a collection.
   */
  findAll: () => IControllerResponse;
}

export { IController };
