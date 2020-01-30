import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { prisma } from "../generated/prisma-client";

const PORT = process.env.PORT || 4777;

const server = new GraphQLServer({ schema, context: req => req.request });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
