require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const LinkerClient = require("linker.js").Client;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("🔗 Create your link short!")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Enter your link to short...")
        .setRequired(true)
    ),

  async execute(interaction) {
    const url = interaction.options.getString("link");

    const client = new LinkerClient({
      token: process.env.API_KEY,
    });

    if (!url) {
      interaction.reply("**LINK IS REQUIRED**");
    } else {
      const newLink = client.create(url);

      newLink
        .then((link) => {
          const linkEmbed = new EmbedBuilder()
            .setColor(process.env.MAIN_COLOR)
            .setTitle("Created!")
            .setDescription(`\n✅ Your link was shorted successfully!`)
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
            )
            .setTimestamp()
            .setFooter({
              text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
              iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            });

          interaction.reply({ embeds: [linkEmbed] });
        })
        .catch((e) => {
          const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `❌ Your link is invalid... Please try agian with a valid link`
            );

          interaction.reply({ embeds: [errorEmbed] });
        });
    }
  },
};
