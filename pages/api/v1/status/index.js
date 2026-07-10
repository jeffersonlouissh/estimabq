import database from "infra/database.js";

async function status(request, response) {
  const updated_at = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  let version = await database.query("SHOW server_version;");
  let max_connections = await database.query("SHOW max_connections;");
  let opened_connections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    updated_at,
    dependencies: {
      database: {
        version: version.rows[0].server_version,
        max_connections: parseInt(max_connections.rows[0].max_connections),
        opened_connections: opened_connections.rows[0].count,
      },
    },
  });
}
export default status;
