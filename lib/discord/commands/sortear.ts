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

function sanitizeName(name: string): string {
  return name
    .replace(/@everyone/g, "@\u200Beveryone")
    .replace(/@here/g, "@\u200Bhere")
    .replace(/<@!?(\d+)>/g, "<@\u200B$1>")
    .replace(/<@&(\d+)>/g, "<@\u200B&$1>");
}

function formatTeams(jugadores: string[]): string {
  const mezclados = shuffle(jugadores);
  const equipo1 = mezclados.slice(0, 5);
  const equipo2 = mezclados.slice(5, 10);
  const sanitized1 = equipo1.map(sanitizeName);
  const sanitized2 = equipo2.map(sanitizeName);

  return (
    `🎮 **CS2 - Sorteo de Equipos** 🎮\n\n` +
    `**🔴 Terrorists (T):**\n- ${sanitized1.join("\n- ")}\n\n` +
    `**🔵 Counter-Terrorists (CT):**\n- ${sanitized2.join("\n- ")}`
  );
}

export function handleSortear(interaction: DiscordInteraction): Response {
  const jugadoresInput = interaction.data?.options?.[0]?.value;

  if (typeof jugadoresInput !== "string") {
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

  const formatted = formatTeams(jugadores);
  if (formatted.length > 1900) {
    return message("⚠️ Los nombres de los jugadores son demasiado largos. Usa nombres más cortos.", true);
  }

  return message(formatted);
}
