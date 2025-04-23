// Credit to BulletProof React for the typeSafe env setup: https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/config/env.ts

import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    VITE_APP_URL: z.string().optional().default("http://localhost:3000"),
    VITE_APP_NAME: z.string().min(1).default("The Golden Apple"),
    VITE_APP_DATABASE_URL: z.string().url(),
    VITE_APP_DATABASE_ANON_KEY: z.string().min(1),
    VITE_APP_PORT: z.number().default(3000),
    VITE_APP_BASE_PATH: z.string().default("./"),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      const prefixRemoved = key.replace("VITE_APP_", "");
      if (typeof prefixRemoved !== "string") {
        throw new Error(
          `Environment variable ${key} is undefined after removing VITE_APP_ prefix`,
        );
      }
      if (typeof value !== "string") {
        throw new Error("envVars value is not a string");
      }
      acc[prefixRemoved] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${
        Object.entries(parsedEnv.error.flatten().fieldErrors)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join("\n")
      }
`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();

console.log(env);
