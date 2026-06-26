import { InteractionResponseType, MessageFlags, type DiscordResponse } from "./types";

export function pong(): Response {
  return Response.json({ type: InteractionResponseType.PONG } satisfies DiscordResponse);
}

export function message(content: string, ephemeral = false): Response {
  const response: DiscordResponse = {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content },
  };

  if (ephemeral) {
    response.data!.flags = MessageFlags.EPHEMERAL;
  }

  return Response.json(response);
}
