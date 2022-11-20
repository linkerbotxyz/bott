const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const pingEmbed = new EmbedBuilder()
      .setDescription("**Ping!**")
      .setColor("White");

    interaction.reply({ embeds: [pingEmbed] });
  },
};
