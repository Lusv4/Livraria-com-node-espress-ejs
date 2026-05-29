import express, { Router } from 'express'
import usuarioControle from '../controllers/usuarioControle.mjs'

const rota = express.Router()

rota.get('/', usuarioControle.index) // Rota para a pagina inicial de usuarios
rota.get('/novo', usuarioControle.novoFormulario) // Rota para o formulario de preenchimento de um novo usuario
rota.post('/', usuarioControle.criar) // Rota para a criação de do novo usuario
rota.get('/:id', usuarioControle.mostrar)
rota.get('/:id/editar', usuarioControle.edicaoFormulario)
rota.post('/:id', usuarioControle.atualizar) // Espera uma resposta
rota.post('/:id/deletar', usuarioControle.remover)
export default rota