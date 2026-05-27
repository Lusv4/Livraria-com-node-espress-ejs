import express from "express" // Direto e rapido
import ejs from "ejs"
import livroRotas from './routes/livro.mjs'
import usuarioRotas from './routes/usuario.mjs'
import expressLayouts from 'express-ejs-layouts' // Importando o express-ejs-layouts para usar layouts com EJS

const app = express()
const PORTA = process.env.PORT || 3000

app.listen(PORTA, () => {
  console.log(`Servidor está na rede 127.0.0.1:${PORTA}`)
}) // Escuta na rede para acessar seu site
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', './views')
app.get("/", (requisicao, resposta) => {
  resposta.render('index')
})

app.set('layout', 'fragmento/layout')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use('/livros', livroRotas) // Usa as rotas definidas de livros
app.use('/usuario', usuarioRotas)