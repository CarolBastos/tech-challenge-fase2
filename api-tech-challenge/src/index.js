const Express = require('express')
const publicRoutes = require('./publicRoutes')
const routes = require('./routes')
const connectDB = require('./infra/mongoose/mongooseConect');
const app = new Express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocs =  require('./swagger')
const UserController = require('./controller/User')
const cors = require('cors')

app.use(Express.json())

app.use(cors({
    origin: '*',
    credentials: true,
}))

app.use(publicRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req, res, next) => {
    if (req.url.includes('/docs')) {
        return next();
    }
    const [_, token] = req.headers['authorization']?.split(' ') || []
    const user = UserController.getToken(token)
    if (!user) return res.status(401).json({ message: 'Token inválido' })
    req.user = user
    next()
})
app.use(routes)

connectDB().then(() => {
    // app.listen(8080, () => {
    //     console.log('Servidor rodando na porta 8080');
    // });
    app.listen(8080, '0.0.0.0', () => {
        console.log('API listening on port 8080');
    });
});


module.exports = app