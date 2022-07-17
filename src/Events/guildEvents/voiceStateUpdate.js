import { promisify } from 'util';
const delay = promisify(setTimeout);

export default {
  name: 'voiceStateUpdate',
  async exec(client, oldState, newState) {
    const channel = newState.guild.channels.cache.get(
      newState.channel?.id ?? newState.channelId
    );
    const player = client.music.players.get(newState.guild.id);

    if (player) {
      if (newState.id == client.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
        if (!oldState.guild.members.me.channelId) {
          if(!newState.requestToSpeakTimestamp) {
            await newState.guild.members.me.voice.setSuppressed(false).catch(() => {
              newState.guild.members.me.voice.setRequestToSpeak(true);
            });
          }
        }
      }

      if (!newState.guild.members.me.voice.channelId) return player.destroy();
      if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
        if (oldState.guild.members.me.voice?.channel && oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {

          await delay(180000);
          const vcMembers = oldState.guild.members.me.voice.channel?.members.filter((m) => !m.user.bot).size;
          if (!vcMembers) player.destroy();

        }
      }
    }
  }
};
