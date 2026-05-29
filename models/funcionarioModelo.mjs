import mssql from 'mssql'
import { conectar } from '../config/db.mjs'
class FuncionarioModelo {
    static async obterTodosOsDados() {
        await conectar()
        const resultado = await mssql.query('SELECT id, nomeUsuario, nomeCompleto, cargo, email FROM Funcionario')
        return resultado.recordset
    }
    static async criarFuncionario({ nomeUsuario, senha, nomeCompleto, cargo, email }) {
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('nomeUsuario', mssql.VarChar(127), nomeUsuario)
        requisicao.input('senha', mssql.VarChar(255), senha)
        requisicao.input('nomeCompleto', mssql.VarChar(255), nomeCompleto)
        requisicao.input('cargo', mssql.VarChar, cargo)
        requisicao.input('email', mssql.VarChar(255), email)
        const resultado = await requisicao.query('EXEC inserirNovo @nomeUsuario, @senha, @nomeCompleto, @cargo, @email')
        return { nomeUsuario, senha, nomeCompleto, cargo, email }
    }
    static async obterPeloId(id) {
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('id', mssql.Int, id)
        const resultado = await requisicao.query('SELECT * FROM Funcionario WHERE id = @id')
        return resultado.recordset[0]
    }
    static async editar(id, { nomeUsuario, nomeCompleto, cargo, email }) {
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('id', mssql.Int, id)
        requisicao.input('nomeUsuario', mssql.VarChar(127), nomeUsuario)
        requisicao.input('nomeCompleto', mssql.VarChar(255), nomeCompleto)
        requisicao.input('cargo', mssql.VarChar(127), cargo)
        requisicao.input('email', mssql.VarChar(255), email)
        await requisicao.query('UPDATE Funcionario SET nomeUsuario = @nomeUsuario, nomeCompleto = @nomeCompleto, cargo = @cargo, email = @email WHERE id = @id')
    }
    static async remover(id) {
        await conectar()
        const requisicao = new mssql.Request()
        requisicao.input('id', mssql.Int, id)
        await requisicao.query('DELETE FROM Funcionario WHERE id = @id')
    }
}
export default FuncionarioModelo