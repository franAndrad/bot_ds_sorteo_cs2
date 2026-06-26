# Bot Sorteo — Discord

Bot para Discord que sortea 10 participantes en 2 equipos aleatorios usando `/sortear`.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **discord-interactions**

## Estructura

``` bash
app/api/discord/route.ts        ← endpoint HTTP
lib/discord/
  types.ts                       ← tipos de Discord
  verify.ts                      ← verificación de firma criptográfica
  responses.ts                   ← helpers de respuesta
  handlers.ts                    ← enrutador de interacciones
  commands/sortear.ts            ← comando /sortear
```

## Cómo usar

1. Instalá dependencias: `npm install`
2. Copiá tu **Public Key** de Discord en `.env`:

   ``` js
   DISCORD_PUBLIC_KEY=tu_public_key_hex_64_caracteres
   ```

3. Iniciá en dev: `npm run dev`
4. Registrá el comando en Discord (una vez):

   ``` bash
   curl -X POST https://discord.com/api/v10/applications/<APP_ID>/commands \
     -H "Authorization: Bot <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"name":"sortear","description":"Sortea 10 participantes en 2 equipos","options":[{"type":3,"name":"jugadores","description":"Los 10 participantes separados por coma","required":true}]}'
   ```

5. Configurá el **Interactions Endpoint URL** en Discord Developer Portal apuntando a tu dominio + `/api/discord`.

## Deploy en Vercel

Conectá el repo en [vercel.com/new](https://vercel.com/new) y agregá `DISCORD_PUBLIC_KEY` en Environment Variables.
