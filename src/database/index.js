import { connect } from "mongoose"
import { red, gray } from "colors"

export function start() {
    try {
        connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (e) {
        console.log(red`Erro na database:`, gray(e))
    }
}
