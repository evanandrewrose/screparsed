#!/usr/bin/env ts-node
import { ReplayParser } from "@/parser";
import { Argument, program } from "commander";
import { O_RDONLY } from "constants";
import { open } from "fs/promises";

const readStreamToReadableStream = (
  readStream: NodeJS.ReadableStream
): ReadableStream =>
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

const run = async (replay: string) => {
  const file = await open(replay, O_RDONLY);
  try {
    const readStream = file.createReadStream();
    const parser = ReplayParser.fromReadableStream(
      readStreamToReadableStream(readStream)
    );
    const parsed = await parser.parse();
    const duration = parsed.leaveCommands[0].timeMs / 1000;
    console.log(
      `game was this long: ${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`
    );

    console.log(JSON.stringify(parsed.chatMessages, null, 2));

    console.log(JSON.stringify(parsed.players, null, 2));
  } finally {
    await file.close();
  }
};

const main = async () => {
  program.name("screparsed").version("0.0.1");
  program.addArgument(new Argument("<file>", "replay file"));
  program.action(run);
  await program.parseAsync(process.argv);
};

main();
