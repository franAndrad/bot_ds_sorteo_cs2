import type { DiscordInteraction } from "../types";
import { message } from "../responses";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTeams(jugadores: string[]): string {
  const mezclados = shuffle(jugadores);
  const equipo1 = mezclados.slice(0, 5);
  const equipo2 = mezclados.slice(5, 10);

  return (
    `🎮 **CS2 - Sorteo de Equipos** 🎮\n\n` +
    `**🔴 Terrorists (T):**\n- ${equipo1.join("\n- ")}\n\n` +
    `**🔵 Counter-Terrorists (CT):**\n- ${equipo2.join("\n- ")}`
  );
}

export function handleSortear(interaction: DiscordInteraction): Response {
  const jugadoresInput = interaction.data?.options?.[0]?.value as string | undefined;

  if (!jugadoresInput) {
    return message("⚠️ Debes proporcionar una lista de participantes separados por comas.", true);
  }

  const jugadores = jugadoresInput
    .split(",")
    .map((j) => j.trim())
    .filter((j) => j !== "");

  if (jugadores.length !== 10) {
    return message(
      `⚠️ Necesito exactamente 10 participantes separados por comas. Me pasaste ${jugadores.length}.`,
      true,
    );
  }

  return message(formatTeams(jugadores));
}
