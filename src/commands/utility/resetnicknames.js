const { SlashCommandBuilder } = require('discord.js');

function isAdmin(msg) {
  return msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR")
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetnicknames')
		.setDescription('resets everyones nicknames to default'),
	async execute(interaction) {
		if (isAdmin(interaction)) {
			// interaction.user is the object representing the User who ran the command
			// interaction.member is the GuildMember object, which represents the user in the specific guild
			interaction.guild.members.cache.filter(i => !i.user.bot).map((value, key) => {

				if(interaction.guild.ownerId != value.id) {
					if(!value.nickname.includes(`[${value.user.username}]`)){
						// console.log(value)
						value.setNickname(`${value.nickname} [${value.user.username}]`, 'Reset user nickname');
					}
				}
			});
			await interaction.reply(`Reset user nicknames ran by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
		} else {
			await interaction.reply(`This is only available for Administrators. ${interaction.user.username}, is not an admin.`);
			}
		},
	};
