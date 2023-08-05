#!/usr/bin/env ts-node
import { ReplayParser } from "@/core/parser";
import { StreamReader } from "@/core/util";
import { Argument, program } from "commander";
import { O_RDONLY } from "constants";
import { open } from "fs/promises";
import { promisify } from "util";
import { unzip } from "zlib";

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
    const parser = new ReplayParser(
      new StreamReader(readStreamToReadableStream(readStream)),
      promisify(unzip)
    );
    await parser.parse();
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