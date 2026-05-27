import express, { Router } from 'express'
import livroControle from '../controllers/livroControle.mjs'

const rota = express.Router()

rota.get('/', livroControle.index) // Rota para a pagina inicial de livros
rota.get('/novo', livroControle.novoFormulario) // Rota para o formulario de preenchimento de um novo livro
rota.post('/', livroControle.criar) // Rota para a criação de do novo livro
rota.get('/:uid', livroControle.mostrar)
rota.get('/:uid/editar', livroControle.edicaoFormulario)
rota.post('/:uid', livroControle.atualizar) // Espera uma resposta
rota.post('/:uid/deletar', livroControle.remover)
export default rota