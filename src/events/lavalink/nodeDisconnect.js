module.exports = async (client, node, code, reason) => {
  console.log(`Node ${node.options.id} desconectado \n ${String(reason)}`.gray);
};
