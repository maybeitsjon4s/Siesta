const delay = require('util').promisify(setTimeout);

module.exports = {
  name: 'voiceStateUpdate',
  async exec(client, oldState, newState) {
    const channel = newState.guild.channels.cache.get(
      newState.channel?.id ?? newState.channelId
    );
    const player = client.music.players.get(newState.guild.id);

    if (player) {
      if (newState.id == client.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
        if (!oldState.guild.me.channelId) {
          if(!newState.requestToSpeakTimestamp) {
            await newState.guild.me.voice.setSuppressed(false).catch(() => {
              newState.guild.me.voice.setRequestToSpeak(true);
            });
          }
        }
      }

      if (!newState.guild.me.voice.channelId) return player.destroy();
      if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
        if (oldState.guild.me.voice?.channel && oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {

          await delay(180000);
          const vcMembers = oldState.guild.me.voice.channel?.members.filter((m) => !m.user.bot).size;
          if (!vcMembers) player.destroy();

        }
      }
    }
  }
};
