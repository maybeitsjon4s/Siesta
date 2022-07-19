import i18next from 'i18next';

export default {
  name: 'messageCreate',
  async exec(client, message) {
    if (!message.guild) return;

    const GUILD = await client.db.guild.findOne({
      _id: message.guild.id
    });
    if (!GUILD) return;

    if (GUILD.antiinvite.status && message.member) {
      if (message.member.permissions.has('ManageMessages')) return;

      let t = GUILD.lang || 0;

      switch (t) {
      case 1:
        t = i18next.getFixedT('pt-BR');
        break;
      case 0:
        t = i18next.getFixedT('en-US');
        break;
      }

      const isInvite = (str) => (/dis(?:board\.org\/(?:pl\/)?server\/join|cord(?:\.me\/server\/join|(?:app\.com\/invite|\.(?:com\/invite|gg\/))))/gi).test(str);

      const whitelist = GUILD.antiinvite.whitelist;

      if (isInvite(message.content) && !whitelist.some(x => x == message.channel.id)) {
        message.channel.send(`**${client.emotes.errado} › ${message.author} ` + t('events:autoModEvents.antiinvite') + '**');
        message.delete().catch(() => { });
      }
    }
  }
};
