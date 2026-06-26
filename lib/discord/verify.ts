import { verifyKey } from "discord-interactions";

export async function verifyDiscordRequest(req: Request): Promise<{
  body: string;
  isValid: boolean;
}> {
  const signature = req.headers.get("X-Signature-Ed25519");
  const timestamp = req.headers.get("X-Signature-Timestamp");
  const bodyText = await req.text();

  if (!signature || !timestamp) {
    return { body: bodyText, isValid: false };
  }

  const isValid = await verifyKey(
    bodyText,
    signature,
    timestamp,
    process.env.DISCORD_PUBLIC_KEY!,
  );

  return { body: bodyText, isValid };
}
