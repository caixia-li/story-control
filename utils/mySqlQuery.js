var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,//一次性最多连接个数是10个
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'sun',
    database: 'story'
});

const mysqlQuery = async (sql) => {
    return await pool.getConnection(async (error, connection)=> {
        if (error) {
            throw Error('cannot connect mysql')
            return
        }
        await connection.query(sql, '', async (error, results, field) => {
            connection.release();
            return results;

        })
    })
}



module.exports = mysqlQuery;