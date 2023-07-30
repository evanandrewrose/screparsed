#!/usr/bin/env ts-node
import { program } from "commander";

const main = async () => {
  program.name("screparsed").version("0.0.1");

  program.parse();
};

main();
