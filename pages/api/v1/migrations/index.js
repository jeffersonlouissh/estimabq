import { runner } from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

import fs from "node:fs";
import path from "node:path";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (request.method == "GET") {
    console.log(
      fs.readdirSync(path.join(process.cwd(), "infra", "migrations")),
    );
    const pendingMigrations = await runner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method == "POST") {
    console.log(
      fs.readdirSync(path.join(process.cwd(), "infra", "migrations")),
    );
    const migratedMigrations = await runner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  }
  return response.status(405).end();
}
