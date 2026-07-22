import { exec } from "node:child_process";

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  async function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.warn("\n🟢 Postgres is ready and accpeting connections");
  }
}
console.warn("\n🔴 Waiting for postgres conection");
checkPostgres();
