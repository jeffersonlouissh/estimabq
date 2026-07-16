import { exec } from "node:child_process";
import { setTimeout } from "node:timers/promises";

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  async function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      // await setTimeout(1000);
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres esta pronto e aceitando conexoes\n");
  }
}
console.log("\n 🔴 Waiting for postgres conection");
checkPostgres();
