import { Container } from "inversify";

import { Module } from "../../app.module";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";

export class BoardModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(BoardController).to(BoardController).inSingletonScope();
    ioc.bind(BoardService).to(BoardService).inSingletonScope();
  }
}
