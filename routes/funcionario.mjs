import express from 'express';
import FuncionarioControle from '../controllers/funcionarioControle.mjs';
 
const rota = express.Router()
rota.get('/', FuncionarioControle.index)
rota.get('/novo', FuncionarioControle.novoFormulario)
rota.post('/', FuncionarioControle.criar)
rota.get('/:id', FuncionarioControle.mostrar)
rota.get('/:id/editar', FuncionarioControle.edicaoFormulario)
rota.post('/:id', FuncionarioControle.atualizar)
rota.post('/:id/deletar', FuncionarioControle.remover)
 
export default rota