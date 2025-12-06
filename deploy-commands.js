import { REST, Routes, SlashCommandBuilder } from "discord.js";
}


let serviceChoices = [];
try {
const raw = fs.readFileSync("./services.json", "utf8");
const data = JSON.parse(raw);
const names = Object.keys(data.services || {});
serviceChoices = names.slice(0, 25).map(n => ({ name: n, value: n }));
} catch (e) {
serviceChoices = [];
}


const commands = [
new SlashCommandBuilder()
.setName("embed")
.setDescription("Sends an embed (restricted to specific roles)")
.addStringOption(o => o.setName("title").setDescription("Embed title").setRequired(true))
.addStringOption(o => o.setName("description").setDescription("Embed description (supports line breaks)").setRequired(true))
.addStringOption(o => o.setName("image_url").setDescription("Optional image URL")),


new SlashCommandBuilder()
.setName("create-service")
.setDescription("Create a new service (admin roles only)")
.addStringOption(o => o.setName("name").setDescription("Service name").setRequired(true)),


new SlashCommandBuilder()
.setName("add")
.setDescription("Add an account to a service (admin roles only)")
.addStringOption(o => o.setName("service").setDescription("Service name").setRequired(true))
.addStringOption(o => o.setName("account").setDescription("Account string to add").setRequired(true)),


new SlashCommandBuilder()
.setName("gen")
.setDescription("Generate (take) an account from a service (locked channel)")
.addStringOption(o => {
const opt = o.setName("service").setDescription("Service name").setRequired(true);
for (const c of serviceChoices) opt.addChoices(c);
return opt;
}),


new SlashCommandBuilder()
.setName("stock")
.setDescription("Show stock of all services (locked channel)")
].map(cmd => cmd.toJSON());


const rest = new REST({ version: "10" }).setToken(TOKEN);


(async () => {
try {
console.log("Deploying commands...");
await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
console.log("✅ Commands deployed to guild.");
} catch (err) {
console.error("Failed to deploy commands", err);
}
})();
