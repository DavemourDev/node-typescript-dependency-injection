import { injectable } from "inversify";
import { container, TYPES } from "../container";
import { IDatabase } from "../interfaces/IDatabase";
import { IQuote } from "../interfaces/IQuote";

const data: IQuote[] = [
  {
    text:
      "Many of life's failures are people who did not realize how close they were to success when they gave up",
    author: "Thomas A. Edison",
  },
  {
    text:
      "If you want to live a happy life, tie ti to a goal, not to people or things.",
    author: "Albert Einstein",
  },
  {
    text:
      "Money and success don't change people; they merely amplify what is already there.",
    author: "Will Smith",
  },
  {
    text: "You never really learn too much from hearing yourself speak",
    author: "George Clooney",
  },
];

@injectable()
class MockData implements IDatabase {
  findAllQuotes(): IQuote[] {
    return data;
  }
}

export { MockData };
