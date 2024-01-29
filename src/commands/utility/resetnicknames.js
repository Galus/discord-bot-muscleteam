const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetnicknames')
		.setDescription('resets everyones nicknames to default'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		interaction.guild.members.cache.filter(i => !i.user.bot).map((value, key) => {
			value.setNickname(value.user.username, 'Reset user nickname');
		});
		await interaction.reply(`Reset user nicknames ran by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
