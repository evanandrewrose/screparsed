#!/usr/bin/env ts-node
import { ReplayParser } from "@/main";
import { Argument, program } from "commander";
import { O_RDONLY } from "constants";
import { open } from "fs/promises";

const run = async (replay: string) => {
  const file = await open(replay, O_RDONLY);
  const readStream = file.createReadStream();
  const parser = await new ReplayParser(readStream).parse();
}

const main = async () => {
  program.name("screparsed").version("0.0.1");
  program.addArgument(new Argument("<file>", "replay file"));
  program.action(run);
  await program.parseAsync(process.argv);
};

main();