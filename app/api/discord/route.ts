import { verifyDiscordRequest } from "@/lib/discord/verify";
import { handleInteraction } from "@/lib/discord/handlers";

export async function POST(req: Request) {
  const { body, isValid } = await verifyDiscordRequest(req);

  if (!isValid) {
    return new Response("Firma inválida", { status: 401 });
  }

  const interaction = JSON.parse(body);

  return handleInteraction(interaction);
}
