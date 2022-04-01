const { Vulkava } = require('vulkava');
const Emojis = require('./Utils/emojis.js');

module.exports = async (client) => {

	client.music = new Vulkava({
		nodes: global.config.lavalinkNodes,
		unresolvedSearchSource: 'youtube',
		sendWS: (guildId, payload) => {
			client.guilds.cache.get(guildId)?.shard.send(payload);
		},
		spotify: {
			clientId: global.config.spotifyId,
			clientSecret: global.config.spotifyToken,
		},
	})
		.on('nodeConnect', async (node) => {
			client.logger.sucess(`[ ${node.options.id} ] Node Conectado`);
			setInterval(() => {
				node.send({
					op: 'pong'
				});
			}, 45000);
		})
		.on('error', (node, error) => {

			if(error.message.includes('503') || error.message.includes('1006')) return;
			client.logger.error(`[ ${node.identifier} ] Erro`);
			client.logger.stack(error.message);
		})
		.on('nodeDisconnect', (node) => {
			client.logger.error(`[ ${node.options.id} ] Node desconectado.`);
		})
		.on('queueEnd', async (player) => {
			const doc = await client.db.guild.findOne({ _id: player.guildId });
  
			let lang = doc.lang || 0;
  
			switch(lang) {
			case 1:
				lang = client.langs.pt;
				break;
			case 0:
				lang = client.langs.en;
				break;
			}

			if(player.autoplay) {
				const mixURL = `https://www.youtube.com/watch?v=${player.current.identifier}&list=RD${player.current.identifier}`;
				const results = await client.music.search(mixURL);
				if(!results.tracks.length) return player.destroy();
				const tracks = results.tracks.filter((track) => track.title !== player.current.title);
				const track = tracks[Math.floor(Math.random() * tracks.length)];
				track.setRequester({
					tag: 'AUTOPLAY#0000',
					id: client.user.id
				});
				player.queue.push(track);
				player.play().catch(() => {});
			} else {
				client.channels.cache.get(player.textChannelId).send(`**${Emojis.music} › ${lang.events.musicEvents.queueEnd}**`);
				player.destroy();
			}
		})

		.on('trackStart', async (player, track) => {

			const channel = client.channels.cache.get(player.textChannelId);
  
			const doc = await client.db.guild.findOne({ _id: channel.guild.id });
  
			if (player.lastPlayingMsgID) channel.messages.forge(player.lastPlayingMsgID).delete().catch(() => {});

			let lang = doc.lang || 0;
  
			switch(lang) {
			case 1:
				lang = client.langs.pt;
				break;
			case 0:
				lang = client.langs.en;
				break;
			}
  
			channel.send(`**${Emojis.music} › ${lang.events.musicEvents.trackStart.replace('{track}', track.title).replace('{user}', track.requester.tag)}**`).then(msg => {
				player.lastPlayingMsgID = msg.id;
			});
		})

		.on('trackStuck', async (player) => player.skip())

		.on('trackException', async({ player, exception }) => {
			player.skip();

			const doc = await client.db.guild.findOne({ _id: player.guildId });

			let lang = doc.lang || 0;

			switch(lang) {
			case 1:
				lang = client.langs.pt;
				break;
			case 0:
				lang = client.langs.en;
				break;
			}

			client.channels.cache.get(player.textChannelId).send({ content: `**${Emojis.music} › ${lang.musicEvents.trackException} **` + '```\n' + exception.message + '```' });

		});
};
