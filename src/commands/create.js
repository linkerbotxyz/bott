require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const LinkerClient = require("linker.js").Client;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("🔗 Create your link short!")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Enter your url to short here...")
        .setRequired(true)
    ),

  async execute(interaction) {
    const url = interaction.options.getString("url");

    const client = new LinkerClient({
      token: process.env.API_KEY,
    });

    if (!url) {
      interaction.reply("Please enter a URL!");
    } else {
      const newLink = client.create(url);

      newLink.then((link) => {
        const linkEmbed = new EmbedBuilder()
          .setColor(process.env.MAIN_COLOR)
          .setTitle("Created!")
          .setDescription(`✅ Your link **${url}** was created successfully!`)
          .addFields(
            {
              name: "Original link",
              value: link.original,
              inline: true,
            },
            {
              name: "Shorted link",
              value: link.html_url,
              inline: true,
            }
          );

        interaction.reply({ embeds: [linkEmbed] });
      });
    }
  },
};
