const delay = require('util').promisify(setTimeout);

export default async (client, oldState, newState) => {
  const channel = newState.guild.channels.cache.get(
    newState.channel?.id ?? newState.channelId
  );
  const player = client.music?.players.get(newState.guild.id);

  if (!player) return;
  if (!newState.guild.members.cache.get(client.user.id).voice.channelId)
    player.destroy();

  if (newState.id == client.user.id && channel?.type == `GUILD_STAGE_VOICE`) {
    if (!oldState.channelId) {
      try {
        await newState.guild.me.voice.setSuppressed(false);
      } catch (err) {
        player.pause(true);
      }
    } else if (oldState.suppress !== newState.suppress) {
      player.pause(newState.suppress);
    }
  }

  if (oldState.id === client.user.id) return;
  if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

  if (
    oldState.guild.members.cache.get(client.user.id).voice.channelId ===
    oldState.channelId
  ) {
    if (oldState.guild.me.voice?.channel && oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {
      await delay(180000);

      const vcMembers = oldState.guild.me.voice.channel?.members.filter(
        (m) => !m.user.bot
      ).size;
      if (!vcMembers) {
        player.destroy();
      }
    }
  }
};
