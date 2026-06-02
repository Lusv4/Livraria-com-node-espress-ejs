import express, { Router } from 'express'
import usuarioControle from '../controllers/usuarioControle.mjs'

const rota = express.Router()

rota.get('/', usuarioControle.index) // Rota para a pagina inicial de usuarios
rota.get('/novo', usuarioControle.novoFormulario) // Rota para o formulario de preenchimento de um novo usuario
rota.post('/', usuarioControle.criar) // Rota para a criação de do novo usuario
rota.get('/:ID', usuarioControle.mostrar)
rota.get('/:ID/editar', usuarioControle.edicaoFormulario)
rota.post('/:ID', usuarioControle.atualizar) // Espera uma resposta
rota.post('/:ID/deletar', usuarioControle.remover)
export default rota