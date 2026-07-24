import type { JwtPayload } from "../modules/auth/auth.types.js";

export type AppBindings = {
  Variables: {
    user: JwtPayload;
  };
};
