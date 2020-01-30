import { GeneratorSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import { snedSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = GeneratorSecret();
      console.log(loginSecret);
      try {
        await snedSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
