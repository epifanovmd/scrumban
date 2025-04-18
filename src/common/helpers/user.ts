import { UnauthorizedException } from "@force-dev/utils";

import { KoaRequest } from "../../types/koa";
import { assertNotNull } from "./assertNotNull";

export const getContextUser = (req: KoaRequest) => {
  return assertNotNull(req.ctx.request.user, new UnauthorizedException());
};
