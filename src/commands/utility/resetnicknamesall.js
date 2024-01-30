const { SlashCommandBuilder } = require('discord.js');

function isAdmin(msg) {
  return msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR")
}

module.exports = {
	data: new SlashCommandBuilder()
	.setName('resetnicknamesall')
	.setDescription('resets everyones nicknames - adds username to nickname'),
	async execute(interaction) {
		if (isAdmin(interaction)) {
			let count = 0;
			let members = await interaction.guild.members.fetch();

			members.filter(i => !i.user.bot).map(
				(value, key) => {
					console.log(`\n\nprocessing username: ${value.user.username}\t nick: ${value.nickname}\t gName: ${value.user.globalName}`);
					if(interaction.guild.ownerId != value.id) { // dont try to change owners nickname
						let newname = '';

						// if the user is already going by their actual username...
						if (value.nickname == `${value.user.username} [${value.user.username}]`) {
							count = count + 1
							console.log(`Resetting ${value.nickname} back to ${value.user.username}`);
							newname = value.user.username
							value.setNickname(newname, 'Reset user nickname');
						}

						if (value.nickname == null) {
							if (value.user.globalName == null) {
								count = count + 1;
								newname = value.user.username;
								console.log(count + 'changing to newname: ' + newname);
								value.setNickname(newname, 'Reset user nickname');
							} else {
								count = count + 1;
								newname = `${value.user.globalName} [${value.user.username}]`;
								console.log(count + 'changing to newname: ' + newname);
								if (newname.length > 32) {
									console.log('too long.');
									usernamelen = value.user.username.length + 3
									difflen = 32 - usernamelen
									newname = value.user.globalName.substring(0,difflen) + ` [${value.user.username}]`;
								}
								value.setNickname(newname, 'Reset user nickname');
							}
						} else if (value.nickname != null) {


							// if the name has 'undefined [' in it
							if (value.nickname.includes('undefined [')) {
								count = count + 1
								if (value.user.globalName) {
									console.log(`Fixing undefined name to: ${value.user.globalName} [${value.user.username}]`);
									newname = `${value.user.globalName} [${value.user.username}]`;
									if (newname.length > 32) {
										console.log('too long.');
										usernamelen = value.user.username.length + 3
										difflen = 32 - usernamelen
										newname = value.user.globalName.substring(0,difflen) + ` [${value.user.username}]`;
									}
									value.setNickname(newname, 'Reset user nickname');
								} else {
									console.log(`Fixing undefined name to: ${value.user.username}`);
									newname = `${value.user.username}`;
									value.setNickname(newname, 'Reset user nickname');
								}
							}

							if (!value.nickname.endsWith(`[${value.user.username}]`)) {
								if (value.nickname == value.user.username) {
									// do nothing
								} else {
									count = count + 1;
									newname = `${value.nickname} [${value.user.username}]`;
									// value.setNickname(`${value.nickname} [${value.user.username}]`, 'Reset user nickname');
									// console.log(`2 ${value.nickname} [${value.user.username}]`);
									if (newname.length > 32) {
										console.log('too long.');
										usernamelen = value.user.username.length + 3
										difflen = 32 - usernamelen
										newname = value.nickname.substring(0,difflen) + ` [${value.user.username}]`;
									}
									console.log(count + 'changing to newname: ' + newname);
									value.setNickname(newname, 'Reset user nickname');
								}
							}
						}
					}
				});
			await interaction.reply(`Reset ${count} user nicknames ran by ${interaction.user.username}`);
		} else {
			await interaction.reply(`only 4 Admins. ${interaction.user.username}, is not an admin.`);
		}
	},
};

