export default async (client, node, reason) => {
  console.log(`Node ${node.options.id} desconectado \n ${String(reason)}`.gray);
};
