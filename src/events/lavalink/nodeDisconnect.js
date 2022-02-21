const Emojis = require(`../../Structures/Utils/emojis`);
module.exports = async (client, node, reason) => {
  console.log(`Node ${node.options.id} desconectado \n ${String(reason)}`.gray);
};
