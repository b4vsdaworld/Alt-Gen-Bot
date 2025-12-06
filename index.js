import fs from "fs/promises";
if (!hasAnyRole(member, ROLE_ADMIN_ALLOWED)) {
return replyEphemeral("You don't have permission to use /add.");
}


const service = interaction.options.getString("service", true);
const account = interaction.options.getString("account", true);


const data = await loadServices();
if (!data.services[service]) {
return replyEphemeral(`Service "${service}" doesn't exist.`);
}


data.services[service].accounts.push(account);
await saveServices(data);
return replyEphemeral(`Added account to "${service}". Current stock: ${data.services[service].accounts.length}`);
}


else if (name === "gen") {
if (interaction.channelId !== GEN_CHANNEL_ID) {
return replyEphemeral("You can only use /gen in the designated generation channel.");
}


const service = interaction.options.getString("service", true);
const data = await loadServices();
if (!data.services[service]) {
return replyEphemeral(`Service "${service}" doesn't exist.`);
}


const accounts = data.services[service].accounts;
if (!accounts || accounts.length === 0) {
return replyEphemeral(`No stock for "${service}".`);
}


const account = accounts.shift();
await saveServices(data);


await replyEphemeral(`Here is your account for **${service}**:\n\`\`\`\n${account}\n\`\`\``);


await interaction.channel.send({ content: `${interaction.user} generated an account from **${service}**. Remaining stock: ${data.services[service].accounts.length}` });
}


else if (name === "stock") {
if (interaction.channelId !== STOCK_CHANNEL_ID) {
return replyEphemeral("You can only use /stock in the designated stock channel.");
}


const data = await loadServices();
const services = data.services || {};
if (Object.keys(services).length === 0) {
return replyEphemeral("No services created yet.");
}


let lines = [];
for (const [sname, sdata] of Object.entries(services)) {
lines.push(`**${sname}** — ${ (sdata.accounts || []).length }`);
}


const embed = {
title: "Stock Overview",
description: lines.join("\n")
};


await interaction.channel.send({ embeds: [embed] });
return replyEphemeral("Stock sent to the channel (visible to everyone).");
}


});


client.login(TOKEN);
