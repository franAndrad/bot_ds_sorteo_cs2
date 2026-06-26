export interface DiscordInteraction {
  type: number;
  data?: {
    name: string;
    options?: { name: string; value: unknown }[];
  };
}

export interface DiscordResponse {
  type: number;
  data?: {
    content: string;
    flags?: number;
  };
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
}

export enum InteractionResponseType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
}

export enum MessageFlags {
  EPHEMERAL = 64,
}
