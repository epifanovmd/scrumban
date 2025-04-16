import Koa from "koa";

import { IUserDto } from "../modules/user/user.model";

export type JWTDecoded = {
  userId: string;
  iat: number;
  exp: number;
};

interface RequestClient {
  ctx: {
    request: {
      user: IUserDto | undefined;
    };
  };
}

export type KoaRequest = Koa.Request & RequestClient;
