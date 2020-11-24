import app from './app'
import database from './database'

database.sync({ force: false }) // Destrói a tabela e recria !!APENAS PARA DEV
console.log('Database running')

app.listen(3000)

console.log('Server running at 3000 🚀')