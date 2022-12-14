require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const LinkerClient = require("linker.js").Client;
const Moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("š Check a link, to see if its valid...")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Enter the linkId to check...")
        .setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.options.getString("id");

    const client = new LinkerClient({
      token: process.env.API_KEY,
    });

    if (!id) {
      return;
    } else {
      const checkLink = client.getLink(id);

      checkLink
        .then((link) => {
          const linkEmbed = new EmbedBuilder()
            .setColor(process.env.MAIN_COLOR)
            .setTitle("Checked!")
            .setDescription(`\nā Your link was checked successfully!`)
            .addFields(
              {
                name: "Original link",
                value: link.original,
                inline: true,
              },
              {
                name: "id",
                value: link.short,
                inline: true,
              }
            )
            .setTimestamp()
            .setFooter({
              text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
              iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}`,
            });

          console.log(link);

          interaction.reply({ embeds: [linkEmbed] });
        })
        .catch((e) => {
          const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `ā The provided id is not valid... Please try agian with a valid id`
            );

          interaction.reply({ embeds: [errorEmbed] });
        });
    }
  },
};
