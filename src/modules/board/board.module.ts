import { Container } from "inversify";

import { Module } from "../../app.module";
import { BoardService } from "./board.service";

export class BoardModule implements Module {
  Configure(ioc: Container) {
    ioc.bind(BoardService).to(BoardService).inSingletonScope();
  }
}
