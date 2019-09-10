import mysql from "mysql";

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'gljgljglj',
  password: 'gljgogo',
  database: 'hanabi_yii_vue',
  port: 3306
});

db.connect(function (err) {
  if (err) {
      console.log("err" + err.stack);
      return;
  }
  console.log("connection id " + db.threadId);
});

export default db;