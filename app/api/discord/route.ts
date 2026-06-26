import { verifyDiscordRequest } from "@/lib/discord/verify";
import { handleInteraction } from "@/lib/discord/handlers";
import { InteractionType } from "@/lib/discord/types";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10_000;

const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  try {
    const { body, isValid } = await verifyDiscordRequest(req);

    if (!isValid) {
      return new Response("Firma inválida", { status: 401 });
    }

    const interaction = JSON.parse(body);

    if (interaction.type !== InteractionType.PING) {
      const userId = interaction.member?.user?.id || interaction.user?.id || "unknown";
      const guildId = interaction.guild_id || "unknown";
      const key = `${guildId}:${userId}`;

      if (isRateLimited(key)) {
        return new Response("Demasiadas solicitudes. Espera unos segundos.", { status: 429 });
      }
    }

    return handleInteraction(interaction);
  } catch (error) {
    console.error("Error procesando interacción:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
