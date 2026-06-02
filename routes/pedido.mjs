import express, { Router } from 'express'
import pedidoControle from '../controllers/pedidoControle.mjs'
const rota = express.Router()
rota.get('/', pedidoControle.index)
rota.post('/:id/deletar', pedidoControle.remover)
rota.post('/novo', pedidoControle.criar)

export default rota