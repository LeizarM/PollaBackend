const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sapbus1n3ss',
    server: '192.168.3.116',
    database: 'POLLA',
    options: {
        encrypt: false,
        enableArithAbort: false
    }
};

sql.connect(config, (err) => {
    if (err) {
        console.error('Error al conectar con SQL Server', err);
    } else {
        console.log('Conexión exitosa a SQL Server');
    }
});

module.exports = sql;
