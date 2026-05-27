import express from 'express';
import FuncionarioControle from '../controllers/funcionarioControle.mjs';
 
const rota = express.Router()
rota.get('/', FuncionarioControle.index)
rota.get('/novo', FuncionarioControle.novoFormulario)
rota.post('/', FuncionarioControle.criar)
rota.get('/:uid', FuncionarioControle.mostrar)
rota.get('/:uid/editar', FuncionarioControle.edicaoFormulario)
rota.post('/:uid', FuncionarioControle.atualizar)
rota.post('/:uid/deletar', FuncionarioControle.remover)
 
export default rota