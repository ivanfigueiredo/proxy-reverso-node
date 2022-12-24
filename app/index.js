const express = require('express');
const app = express();
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: 3306
};
const mysql = require('mysql');
const conn = mysql.createConnection(config);

const sqlCreateTable = `create table people(id int not null auto_increment, name varchar(255), primary key(id))`;
const sqlInsert = `INSERT INTO people(name) values('Ivan')`;
conn.query(sqlCreateTable);
conn.query(sqlInsert);

app.get('/', async (req, res) => {
    await conn.query(`SELECT * FROM people`, (err, data) => {
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            ${data ? data.map(user => `<ul>1<li>${user.name}</li></ul>`) : []}
        `);
    });
});

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`Runing in PORT: ${port}`);
});