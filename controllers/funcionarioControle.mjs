import FuncionarioModelo from '../models/FuncionarioModelo.mjs'
const funcionarios = {
    async index(requisicao, resposta) {
        const funcionarios = await FuncionarioModelo.obterTodosOsDados()
        resposta.render('funcionarios/index', { funcionarios })
    },
    async novoFormulario(requisicao, resposta) {
        resposta.render('funcionarios/novo')
    },
    
    async criar(requisicao, resposta) {
        console.log('CHEGOU NO CRIAR')
        const { nomeUsuario, senha, nomeCompleto, cargo, email } = requisicao.body
        await FuncionarioModelo.criarFuncionario({ nomeUsuario, senha, nomeCompleto, cargo, email })
        resposta.redirect('funcionarios')
    },

    async mostrar(requisicao, resposta) {
        const funcionario = await FuncionarioModelo.obterPeloId(requisicao.params.id)
        if (!funcionario) {
            return resposta.status(404).send('Funcionário não encontrado')
        }
        resposta.render('funcionarios/mostrar', { funcionario })
    },

    async edicaoFormulario(requisicao, resposta) {
        const funcionario = await FuncionarioModelo.obterPeloId(requisicao.params.id)
        if (!funcionario) {
            return resposta.status(404).send('Funcionario não encontrado')
        }
        resposta.render('funcionarios/editar', { funcionario })
    },

    async atualizar(requisicao, resposta) {
        console.log('CHEGOU NO ATUALIZAR')
        const { nomeUsuario, nomeCompleto, cargo, email } = requisicao.body
        await FuncionarioModelo.editar(
            requisicao.params.id,
            { nomeUsuario, nomeCompleto, cargo, email }//dataCadastro
        )
        resposta.redirect('/funcionarios')
    },
    async remover(requisicao, resposta) {
        await FuncionarioModelo.remover(requisicao.params.id)
        resposta.redirect('/funcionarios')
    },
}
export default funcionarios