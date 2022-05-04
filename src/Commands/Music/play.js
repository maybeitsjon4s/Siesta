const Emojis = require('../../Structures/Utils/emojis');

module.exports = {
  name: 'play',
  aliases: ['tocar', 'p', 'join'],
  ownerOnly: false,
  playerOnly: false,
  sameChannel: false,
  description: '[ 🎵 Music ] Add an song/playlist to the queue and plays it.',
  options: [
    {
      name: 'song',
      description: 'Song/Playlist URL/Name',
      type: 'STRING',
      required: true
    }
  ],
  async exec({ client, message, args, player, t }) {

    if (player) {
      if (message.member.voice.channel?.id != player.voiceChannelId) return message.reply(`**${Emojis.errado} › ${t('commands:play.wrongVoiceChannel')}**`);
    }

    if (!message.member.voice.channel) return message.reply(`**${Emojis.errado} › ${t('commands:play.noVoiceChannel')}**`);

    let music = args.join(' ');

    if(!music && message.attachments?.first() && message.attachments?.first()?.contentType == 'video/mp4' || message.attachments?.first()?.contentType == 'audio/mpeg') music = message.attachments?.first().proxyURL;

    if(!message.member.voice.channel.permissionsFor(client.user.id).has(['VIEW_CHANNEL', 'CONNECT', 'SPEAK'])) return message.reply(`**${Emojis.errado} › ${t('commands:play.noPerm')}**`);

    if (!music) return message.reply(`**${Emojis.errado} › ${t('commands:play.noArgs')}**`);

    const result = await client.music.search(music, message.author);

    if (result.loadType === 'LOAD_FAILED') return message.reply(`**${Emojis.errado} › ${t('commands:play.failedToPlay')}**`);
    
    if (result.loadType === 'NO_MATCHES') return message.reply(`**${Emojis.errado} › ${t('commands:play.noMatches')}.**`);

    player = client.music.createPlayer({
      guildId: message.guild.id,
      voiceChannelId: message.member.voice.channel.id,
      textChannelId: message.channel.id,
      selfDeaf: true,
    });
    player.filters.setVolume(50)

    if (player.state === 2) player.connect();

    if (result.loadType === 'PLAYLIST_LOADED') {

      for (const track of result.tracks) {
        track.setRequester(message.author);
        player.queue.push(track);
      }

      if (!player.playing) player.play();

      message.reply(`**${Emojis.music} › ${t('commands:play.playListLoaded', {
        name: result.playlistInfo?.name,
        length: result.tracks.length.toString(),
        time: client.utils.formatTime(result.playlistInfo.duration)
      })}**`);

    } else {

      const track = result.tracks[0];
      track.setRequester(message.author);
      player.queue.push(track);

      if (player) message.reply(`**${Emojis.music} › ${t('commands:play.musicLoaded', {
        track: track.title
      })}**`);
          

      if (!player.playing) player.play();
    }
  }
};
