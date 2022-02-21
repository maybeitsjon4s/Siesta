const mongoose = require("mongoose")
const c = require("colors")
module.exports = {
    start() {
        try{
            mongoose.connect(process.env.DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        } catch(e) {
            console.log(c.red`Erro na database:`, c.gray(e))
        }
        //console.log(c.red"Database conectada com sucesso")
    }
};
