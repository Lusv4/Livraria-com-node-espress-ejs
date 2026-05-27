import mssql from 'mssql'
import { conectar } from '../config/db.mjs'

class UsuarioModelo {
    static async garantirTabelaDoApp() {
        await conectar()
        const configuracaoTabela = `
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuarios' AND xtype='U')
            BEGIN
                CREATE TABLE Usuarios (
                    ID INT IDENTITY(1,1) PRIMARY KEY,
                    Nome NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(100) NOT NULL UNIQUE,
                    Telefone NVARCHAR(15),                    
                    DataCadastro DATETIME DEFAULT GETDATE()
                )
            END
        `
        await mssql.query(configuracaoTabela)
    }
    
    static async obterTodosOsDados() {
        await this.garantirTabelaDoApp()
        const resultado = await mssql.query('SELECT * FROM Usuarios') // Chamando nossos dados
        return resultado.recordset // Retornando os dados para a aplicação
    }
    
    static async criarUsuario({ Nome, Email, Telefone }) {
        await this.garantirTabelaDoApp() // Garanti que a tabela exista
        const requisicao = new mssql.Request() // Faz uma requisição ao banco de dados
        requisicao.input('Nome', mssql.NVarChar(100), Nome)
        requisicao.input('Email', mssql.NVarChar(100), Email)
        requisicao.input('Telefone', mssql.NVarChar(15), Telefone)       
        const resultado = await requisicao.query(`
            INSERT INTO Usuarios (Nome, Email, Telefone)
            OUTPUT INSERTED.ID
            VALUES(@Nome, @Email, @Telefone)
            `)
        const ID = resultado.recordset[0].ID // Retorna o ID unico
        return {
            ID,
            Nome,
            Email,
            Telefone
        }
    }
    static async obterPeloID(ID) {
        //await this.garantirTabelaDoApp()
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('ID', mssql.Int, ID)
        const resultado = await requisicao.query('SELECT * FROM Usuarios WHERE ID = @ID')
        return resultado.recordset[0]
    }
    static async editar(ID, { Nome, Email, Telefone }) {
        //await this.garantirTabelaDoApp()
        await conectar()
        const requisicao = new mssql.Request() // Faz uma requisição ao banco de dados
        requisicao.input('ID', mssql.Int, ID)
        requisicao.input('Nome', mssql.NVarChar(100), Nome)
        requisicao.input('Email', mssql.NVarChar(100), Email)
        requisicao.input('Telefone', mssql.NVarChar(15), Telefone)
        await requisicao.query(`
            UPDATE Usuarios
                SET Nome = @Nome,
                Email = @Email,
                Telefone = @Telefone             
                WHERE ID=@ID
            `)
        return this.obterPeloID(ID)
    }
    static async remover(ID) {
        //await this.garantirTabelaDoApp()
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('ID', mssql.Int, ID)
        const resultado = await requisicao.query('DELETE FROM Usuarios WHERE ID = @ID')
        //return resultado.recordset[0].deleted > 0
    }

}

export default UsuarioModelo // Exporta o modelo para utilizar em outros modulos