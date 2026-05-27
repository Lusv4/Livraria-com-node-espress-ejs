import UsuarioModelo from '../models/usuarioModelo.mjs'
const usuario = { // Com base na modelagem, vamos utilizar nas nossas rotas
    async index(requisicao, resposta) { // Página inicial de usuario
        const usuario = await UsuarioModelo.obterTodosOsDados() // Obtem usuario
        resposta.render('usuario/index', { usuario }) // Renderiza a página com os usuario
    },
    async criar(requisicao, resposta) {
        const { Nome, Email, Telefone } = requisicao.body
        await UsuarioModelo.criarUsuario({ Nome, Email, Telefone })
        resposta.redirect('/usuario')
    },
    novoFormulario(requisicao, resposta) {
        resposta.render('usuario/novo')
    },
    async mostrar(requisicao, resposta) {
        const usuario  = await UsuarioModelo.obterPeloID(requisicao.params.ID)
        if (!usuario ) return resposta.status(404).send('usuario  não encontrado')
        resposta.render('usuario/mostrar', { usuario  })
    },
    async edicaoFormulario(requisicao, resposta) {
        const usuario  = await UsuarioModelo.obterPeloID(requisicao.params.ID)
        if (!usuario ) return resposta.status(404).send('usuario  não encontrado')
        resposta.render('usuario/editar', { usuario  })
    },
    async atualizar(requisicao, resposta) {
        const { Nome, Email, Telefone } = requisicao.body
        await UsuarioModelo.editar(requisicao.params.ID,
            { Nome, Email, Telefone })
        resposta.redirect('/usuario')
    },
    async remover(requisicao, resposta) {
        await UsuarioModelo.remover(requisicao.params.ID)
        resposta.redirect('/usuario')
    }
}

export default usuario