import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  //Bearer 28133928-2131312
  //[0] - Bearer
  //[1] - 28133928-2131312
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "7108537956afa2a526f96cc9da7b0c36"
    ) as IPayload;
    request.id_client = sub;
    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}
