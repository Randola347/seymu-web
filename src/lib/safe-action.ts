import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/auth";

export const actionClient = createSafeActionClient({
  handleServerError(e: any) {
    if (e instanceof Error) {
      return e.message;
    }
    return "Ocurrió un error inesperado.";
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("No tienes permisos para realizar esta acción. Por favor, inicia sesión.");
  }

  return next({ ctx: { userId: session.user.id } });
});
