# screparsed

A StarCraft: Remastered replay parser, taking much inspiration from [screp](https://github.com/icza/screp) (a golang implementation).

It works both via NodeJS and in the browser (browser app demonstration included).

## Installation

```bash
npm i screparsed --save
```

## Usage in browser

This package should work out-of-the-box for NodeJS environments. In the browser, you'll need polyfills for `zlib`, `buffer`, `stream`,
`util`, and `assert`. See [vite.config.ts](web-preview/vite.config.ts) for an example configuration.

## Examples

### Constructing via file in NodeJS
```typescript
const file = await open(replay, O_RDONLY);
const readStream = file.createReadStream();
const parser = ReplayParser.fromReadableStream(
  new ReadableStream({
    start(controller) {
      readStream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      readStream.on("end", () => {
        controller.close();
      });
      readStream.on("error", (err) => {
        controller.error(err);
      });
    },
    type: "bytes",
  });
);
```

### Constructing via ArrayBuffer (e.g., after fetch in browser)
```typescript
const parser = ReplayParser.fromArrayBuffer(arrayBuffer);
```

### Parse
```typescript
const parsed = await parser.parse();
```

### Print game info, players (colors, race, name, apm, eapm), and chat messages
```typescript
console.log(JSON.stringify({
    gameInfo: parsed.gameInfo,
    players: parsed.players,
    messages: parsed.chatMessages.map((message) => `${message.sender.name}: ${message.message}`),
}, null, 2));
```

#### Displays
```json
{
  "gameInfo": {
    "engine": 1,
    "frames": 15710,
    "startTime": "2023-08-08T03:19:03.000Z",
    "title": "aIcA^O_vNgMw",
    "mapWidth": 128,
    "mapHeight": 128,
    "availableSlotsCount": 2,
    "speed": 6,
    "type": 15,
    "subType": 1,
    "host": "[dex]",
    "map": "\u0007Polyp\u0006oid \u00061\u0003.65"
  },
  "players": [
    {
      "slotID": 0,
      "ID": 0,
      "type": 2,
      "race": "zerg",
      "team": 1,
      "name": "[dex]",
      "color": {
        "name": "Brown",
        "rgb": 7352340
      },
      "apm": 430,
      "eapm": 258
    },
    {
      "slotID": 2,
      "ID": 1,
      "type": 2,
      "race": "terran",
      "team": 2,
      "name": "some1",
      "color": {
        "name": "Blue",
        "rgb": 805068
      },
      "apm": 332,
      "eapm": 264
    }
  ],
  "messages": [
    "[dex]: gg"
  ]
}
```

## Running via CLI
```bash
# in repo directory
npm i
npm run cli -- /path/to/replay.rep
```

## Running drag-n-drop web preview locally
```bash
# in repo directory
npm build
cd web-preview
npm i
npm run dev
```