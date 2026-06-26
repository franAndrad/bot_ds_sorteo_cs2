import type { DiscordInteraction } from "./types";
import { InteractionType } from "./types";
import { pong, message } from "./responses";
import { handleSortear } from "./commands/sortear";

export function handleInteraction(interaction: DiscordInteraction): Response {
  switch (interaction.type) {
    case InteractionType.PING:
      return pong();

    case InteractionType.APPLICATION_COMMAND:
      return handleApplicationCommand(interaction);

    default:
      return message("Comando desconocido.", true);
  }
}

function handleApplicationCommand(interaction: DiscordInteraction): Response {
  const commandName = interaction.data?.name;

  switch (commandName) {
    case "sortear":
      return handleSortear(interaction);

    default:
      return message(`Comando "/${commandName}" no reconocido.`, true);
  }
}
