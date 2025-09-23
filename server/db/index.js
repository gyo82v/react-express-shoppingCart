import path from "node:path"
import fs from "node:fs/promises"
import { PGlite } from "@electric-sql/pglite";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDB(dbDir) {
    // ensure directory exists
    await fs.mkdir(dbDir, {recursive: true})
    // create/boot the pglite istance
    const db = await PGlite.create(dbDir)
    // run ddl sql file
    const createTablePath = path.join(__dirname, "createTable.sql")
    const createTableSql = await fs.readFile(createTablePath, "utf8")
    await db.exec(createTableSql)
    //seed if table is empty
    const countRes = await db.query("SELECT COUNT(*)::int AS count FROM cart")
    const count = (countRes.rows && Number(countRes.rows[0].count)) || 0
    if(count === 0){
        const insertSqlPath = path.join(__dirname, "insertCartData.sql");
        const insertSql = await fs.readFile(insertSqlPath, "utf8");
        await db.exec(insertSql);
    }
    return db
}