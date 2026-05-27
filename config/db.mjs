import mssql from 'mssql';
const config = {
    user : 'App',
    password : 'Vision123',
    server : 'visionapp.database.windows.net',
    database : 'App',
    Port: 1433,
    options : {
        encrypt: true, 
        trustServerCertificate: false
    } 
}
async function conectar() {
    try {
        await mssql.connect(config);
        //console.log("Conectado com sucesso!")
    } catch (error) {
        console.error(error.message)
    }
}

export { conectar }