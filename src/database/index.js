import pkg from "mongoose"
import colors from "colors"

const { connect } = pkg

export function start() {
    try {
        connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (e) {
        console.log(colors.red(`Erro na database:`), colors.gray(e))
    }
}
