module.exports = {
    name: "pt-BR",
    events: {
        messageCreate: {
            mention: "Olá, eu sou a **Siesta**! Meu prefixo neste servidor é **{}** se quiser saber os meus comandos use **{}help**!",
            error: "Ocorreu um erro ao usar o comando {}, se puderes vai ate ao servidor de suporte do bot através do botão abaixo e reporta-o para ser corrigido o mais rapido possivel!",
            cooldown: "Espere \`{}\` segundos para executar um comando novamente!"
        },
        autoModEvents: {
            antiinvite: "Você não pode mandar links de servidores aqui!"
        },
        musicEvents: {
          trackStart: "Agora tocando: \`{track}\`, pedido por \`{user}\`",
          trackStuck: "A Musica ficou presa então vou pular ela...",
          queueEnd: "A Musica acabou estou saindo do canal..."
        }
    },
    commands: {
        antiinvite: {
            errorPerm: "Você precisa da permissão \`Gerenciar servidor\` para executar este comando!",
            firstField: {
                title: "Oque é o Anti-invite?",
                value: "Antiinvite e um dos meus modulos de moderação automatica, quando alguem mandar um link de convite para algum servidor que não seja este e se essa pessoa não tiver alguma permissão de moderador essa mensagem será apagada."
            },
            secondField: {
              title: "E como o configuro?",
              value: "Para configurar o modulo de antiinvite e muito simples basta você inserir uma dessas opções apos o comando: \n> \`ativar\` » Ativa o modulo\n> \`desativar\` » Desativa o modulo\n**Mas como eu configuro um canal em que os invites serão ignorados? Basta usar uma das opções de whitelist abaixo:**\n> \`whitelist add\` » Adiciona um canal a lista de canais que o bot irá ignorar convites\n> \`whitelist remove\` » Remove um canal da lista de canais que o bot ignora"
            },
            enabled: "Modulo anti-convites ativado com sucesso!",
            disabled: "Modulo anti-convites desativado com sucesso!",
            errorWhitleList: "Você precisa colocar oque deseja fazer dentro do subcomando whitelist\n> \`whitelist add\` » Adiciona um canal a lista de canais bloqueados\n> \`whitelist remove\ » Remove um canal da lista de canais bloqueados",
            channelAltereadySet: "Esse canal ja está na whitelist",
            addedChannel: "Adicionei o canal a lista de canais ignorados com sucesso!",
            removeError: "Esse canal não está na minha whitelist por isso você não o pode bloquear!",
            removed: "Removi o canal da lista de canais ignorados com sucesso!",
        },
        language: {
            errorPerm: "Você precisa da permissão \`Gerenciar servidor\` para executar este comando!",
            message: "vejo que você quer alterar a linguagem que eu uso aqui!**\n> **Para a alterar basta utilizar os botões que estão nesta mensagem!**\n\n> 🇵🇹 Português » 100%\n> 🇺🇸 Inglês » 100%\n\n> \`As traduções podem não estar 100% corretas caso você encontre algum problema nelas reporte-o a minha equipe!\`",
            onlyAuthor: "Voce nao pode utulizar este botoes",
            portugueseSeted: "Portugues setado com sucesso!",
            englishSeted: "English set successfully",
        },
        prefix: {
            errorPerm: "Você precisa da permissão \`Gerenciar servidor\` para executar este comando!",
            noPrefix: "Você precisa inserir o novo prefixo!",
            sevenLenght: "O prefixo não pode conter mais de 7 caracteres!",
            seted: "Novo prefix setado com sucesso!",
        },
        welcome: {
            errorPerm: "Você precisa da permissão \`Gerenciar servidor\` para executar este comando!",
            argsError: "Você não usou o comando da forma certa utilize \`<welcome on/off [canal] [mensagem de entrada]\` se quiser saber algums placeholders confira esta pequena lista: \n \`{guild}\` - Exibe o nome do servidor. \n \`{member}\` - Menciona o usuario que entrou \n \`{membertag}\` - Exibe o nome e a tag do usuario.\n \`{count}\` - Mostra a quantidade de membros do servidor.",
            seted: "Sistema de entrada configurado com sucesso!",
            disabled: "Sistema de entrada destivado com sucesso!"
        },
        atm: {
            neverUsedTheBot: "Este usuario nunca me usou por isso tem __0__ diamantes!",
            message: "Atualmente {user} tem **{value}** diamate(s)"
        },
        coinflip: {
            noValue: "Por favor insira o valor da aposta!",
            dontHave: "Voce não tem esse(s) diamante(s)!",
            invalidValue: "Você tem que colocar um valor maior que \`0\` para realizar a aposta!",
            win: "Cara!! Você ganhou",
            lose: "Coroa!! Você perdeu"
        },
        cooldowns: {
            canUse: "Já pode utilizar o comando novamente!",
        },
        daily: {
            cooldown: "Tente novamente em",
            won: "ganhou no seu daily \`{amount}\` diamantes!"
        },
        mine: {
            noPickaxe: "Você precisa de um picareta para minerar!",
            noEmeralds: "Você não tem nenhuma esmeralda!",
            sold: "Você vendeu \`{emeralds}\` esmeraldas por \`value\` diamantes!",
            maxLevel: "A sua picareta ja esta no nivel maximo \`(6)\`",
            needMoreExp: "Você ainda não tem experiencia suficiente para subir o nivel da sua picareta",
            up: "Você subiu de nivel com sucesso!",
            help: "**mine up** » Eleva o seu nivel assim conseguindo ver as esmeraldas de forma mais cara;\n" +
                "**mine** »  Voce minera para tentar ganhar o maximo de esmeraldas possiveis;\n" +
                "**mine sell** » Vende todas as suas esmeraldas;\n" +
                "**mine info** » Mostra as suas informaçoes sobre xp, esmeraldas e nivel!",
            emeralds: "Esmeraldas",
            level: "Nivel",
            exp: "Experiencia",
            cooldown: "Tente novamente em",
            mined: "você minerou e conseguiu \`{amount}\` esmeraldas e \`100\` de experiencia!"
        },
        pay: {
            noMention: "Você tem que mencionar alguem para pagar!",
            payYourSelf: "Não podes pagar a ti proprio!",
            validValue: "Coloque um valor válido para o pagamento!",
            noDiamonds: "Você não possui diamantes suficiente para realizar o pagamento!",
            neverUsed: "Esse usuario nunca me usou por isso voce não lhe pode pagar!",
            payed: "você pagou o {user} com \`{value}\` diamantes!",
        },
        shop: {
            embed: "**Compras: \n> {Emojis.picareta} » Comprar Picareta: 50.000 {Emojis.dima} \n> {Emojis.vip} » Comprar Vip: 250.000 {Emojis.dima} \nStatus: **\n> **» Picareta:** {picareta}**/1** \n> **» Vip:** {vip}**/1**",
            pickaxe: "Picareta",
            menuLabel: "Clique aqui",
            onlyAuthor: "Apenas o author da mensagem pode usar o menu!",
            noDiamonds: "Você não tem diamantes suficientes!",
            havePickaxe: "Você ja tem uma picareta!",
            buyedPickaxe: "Você comprou uma picareta com sucesso!",
            haveVip: "Você ja tem vip!",
            buyedVip: "Você comprou vip com sucesso!"
        },
        work: {
            cooldown: "Tente novamente em",
            sucess: "trabalhou e ganhou {} diamantes"
        },
        vip: {
            info: ['Vantagens', '**»** Dobro de diamantes no **daily e work ** \n **»** Cargo exclusivo no [Servidor da Siesta](https://discord.gg/BRQccw7HhZ)\n**»** Saber as novidades da Siesta antes de qualquer um!'],
            price: ['Preço', '**»** Custa 250.000 diamantes para mais informações utilize o comando de loja!']
        },
        ban: {
            myPermission: "Eu preciso da permissão de \`Banir Membros\` para este comando",
            userPermission: "Você precisa da permissão de \`Banir Membros\` para este comando",
            noMention: "Você precisa mencionar alguem ou me dar um id",
            invalidUser: "Não foi possivel achar este usuario",
            banned: "Este Usuario ja foi banido do servidor",
            targetYourSelf: "Você não pode se banir",
            maxLength: "Seu motivo não pode ultrapassar 1000 caracteres",
            user: "Usuario",
            reason: "Motivo",
            invalidReason: "Sem Motivo fornecido",
            higherRole: "O cargo do membro é mais alto que o seu ou o mesmo",
            higherRoleThanMine: "O cargo do membro é maior que o meu ou o mesmo"
        },
        clear: {
            myPermission: "Eu preciso da permissão \`Gerenciar mensagens\`",
            userPermission: "Você precisa da permissão \`Gerenciar mensagens\`",
            invalidCount: "Forneça um número de até \`99 mensagens\` a serem excluídas**",
            finalMessage: "Limpei \`{}\` mensagens!"
        },
        kick: {
            userPermission: "Você precisa da permissão de \`Expulsar Membros\` para executar este comando",
            myPermission: "Eu preciso da permissão de \`Expulsar Membros\` para executar este comando",
            noMention: "Mencione o usuario que deseja expulsar!",
            notFound: "Usuario não encontrado!",
            higherRole: "O Cargo dele e mais alto que o teu ou o mesmo!",
            higherRoleThanMine: "O cargo dele e mais alto que o meu!",
            user: "Usuario",
            reason: "Motivo",
            noReason: "Nao especificado"
        },
        lock: {
            userPermission: "Eu não tenho a Permissão \`Gerenciar Canais\`",
            myPermission: "Você não tem a Permissão \`Gerenciar Canais\`",
            sucess: "Chat trancado com sucesso!"
        },
        mute: {
            userPermission: "Você precisas da permissão \`Moderar Membros\` para executar este comando!",
            myPermission: "Eu preciso da permissão de \`Moderar Membros\` para executar este comando!",
            noArgs: "Mencione Alguem!",
            notFound: "Usuario não encontrado!",
            noTime: "Você se esqueceu de especificar o tempo!",
            muteYourSelf: "Não podes te punir a ti proprio!",
            punishMe: "Não podes me punir!",
            higherRole: "O Cargo dele e mais alto que o teu ou o mesmo!",
            higherRoleThanMine: "O cargo dele e mais alto que o meu!",
            invalidTime: "Por favor coloque um tempo valido!",
            higherThan28Days: "O tempo não pode ser acima de 28 dias ou o mesmo!",
            user: "Usuário Punido",
            reason: "Motivo",
            during: "Durante"
        },
        unlock: {
            userPermission: "Eu não tenho a Permissão \`Gerenciar Canais\`.",
            myPermission: "Você não tem a Permissão \`Gerenciar Canais\`.",
            sucess: "Chat destrancado com sucesso!"
        },
        disconnect: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            sucess: "Disconectei-me do canal de voz com sucesso"
        },
        loop: {
            noPlayer: "Não estou a tocar música neste servidor!",
            channelError: "Você precisa de estar em um canal de voz!",
            channelError2: "Você não esta no mesmo canal de voz que eu!",
            trackSucess: "a repetição da Musica Atual!",
            queueSucess: "a repetição do queue!",
            enable: "Ativei",
            disable: "Desativei"
        },
       filters: {
            noPlayer: "Não estou a tocar música neste servidor!",
            onlyAuthor: "Apenas o autor da mensagem pode interagir!",
            channelError: "Você precisa de estar em um canal de voz!",
            channelError2: "Você não esta no mesmo canal de voz que eu!",
            firstMessage: "Voce pode ativar/retirar os filtros usando a mensagem abaixo!",
            changedMessage: "Limpei todos os filtros e adicionei o filtro {}!",
            clearFiltersMessage: "Removi todos os filtros!",
            clearLabel: "Remover Filtros"
       },
        nowplaying: {
            noPlayer: "Não estou a tocar música neste servidor!",
            info: "Informações",
            name: "Nome",
            duration: "Duração",
            enabled: "Ativado",
            disabled: "Desativado",
            playing: "Tocando",
            paused: "Pausado"
        },
        pause: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            alteradyPause: "A musica ja esta pausado atualmente!",
            sucess: "Musica pausada com sucesso!"
        },
        play: {
            wrongVoiceChannel: "Você precisa estar no mesmo canal de voz que eu.",
            noVoiceChannel: "Você precisa estar em um canal de voz.",
            noArgs: "Você precisa colocar uma musica ou url para eu tocar!",
            failedToPlay: "Não consegui tocar essa música",
            noMatches: "Não encontrei essa música",
            playListLoaded: "Playlist \`{name}\` com \`{length}\` musicas adicionadas ao queue",
            musicLoaded: "Música \`{}\` adicionada ao queue"
        },
        queue: {
            noPlayer: "Não estou tocando música neste servidor.",
            page: "Pagina",
            current: "Atualmente",
            noTracks: "Sem musicas na",
            queue: "na queue"
        },
        resume: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            alteradyPause: "A musica nao esta pausada atualmente!",
            sucess: "Musica retomada com sucesso!"
        },
        seek: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            invalidTime: "Insira o tempo para eu pular e que seja valido.",
            goingTo: "Avançando para",
            backingTo: "Rebobinando para",
            exceeds: "Esse tempo excede o tempo da música",
        },
        skip: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            sucess: "Musica pulada!"
        },
        volume: {
            noPlayer: "Não estou tocando música neste servidor.",
            channelError: "Você não está em um canal de voz ou não está no mesmo canal que eu",
            bettewnOneAnd500: "O Volume deve ser entre 1 a 500",
            sucess: "Volume alterado para"
        },
        about: {
            noArgs: "Insira algo para colocar no sobre-mim",
            sucess: "Sobre-mim alterado com sucesso!"
        },
        avatar: {
            sucess: "Avatar de  {} **Clique [aqui]({URL}) para baixar a imagem!"
        },
            help: {
        moderation: "Moderação",
        config: "Configuraçao",
        economy: "Economia",
        utils: "Utils/Info",
        music: "Musica",
        filters: "Filtros",
        inviteMe: "Me Adicione",
        support: "Servidor de Suporte",
        message: "estes são todos os meus comandos, atualmente eu tenho {} comandos!"
    },
    hug: {
        noMention: "Mencione alguém para abraçar",
        message: "abraçou",
    },
    kiss: {
        noMention: "Mencione alguém para beijar",
        message: "beijou",
    },
    slap: {
        noMention: "Mencione alguém para bater",
        message: "bateu em",
    },
    invite: {
        buttonLabel: "Clique Aqui",
        message: "Você pode me adicionar ao seu servidor usando o botão abaixo",
    },
    profile: {
        noDocument: "Este usuario nunca usou um comando meu logo não tem um perfil!",
        defaultAboutMe: "`Utilize {}about para alterar esta mensagem!"
    },
    serverinfo: {
        name: "Nome",
        owner: "Dono(a)",
        channels: "Canais",
        text: "Texto",
        voice: "Voz",
        category: "Categoria",
        createdAt: "Criado em"
    },
    stats: {
        message: "o meu nome e Siesta e sou o bot multifuncional feito pra ajudar o teu servidor e entreter os seus membros com varias utilidades desde música até moderação",
        stats: "Estatísticas",
        inviteMe: "Me Adicione",
        createdBy: "Fui criada pelo"
    },
    userinfo: {
        createdAccount: "Criou a Conta",
        joinedAt: "Entrou em",
        boosterSince: "Booster Desde"
    },
    vote: {
        message: "Você pode votar em mim usando o botão abaixo!",
        label: "Clique Aqui"
    }
    }
}
