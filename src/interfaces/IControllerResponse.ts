/**
 * Response basic structure.
 */
interface IControllerResponse {
  /**
   * Status code sent with the response.
   */
  statusCode: number;
  /**
   * The response data.
   */
  response: any;

  /**
   * The response headers.
   */
  headers?: {
    [header: string]: string;
  };
}

export { IControllerResponse };
