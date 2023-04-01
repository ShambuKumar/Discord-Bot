/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption((option) =>
			option.setName('target').setDescription('The user\'s info you want to see'),
		),

	async execute(interaction) {
		const userEmbed = createEmbed();
		const user = interaction.options.getUser('target').fetch(true);

		function removeValue(value, index, arr) {
			// If the value at the current array index matches the specified value (2)
			if (value === '@everyone') {
				// Removes the value from the original array
				arr.splice(index, 1);
				return true;
			}
			return false;
		}
		user.filter(removeValue);
		const member = interaction.guild.members.cache.get(user.id);
		const roles = member.roles.cache.map((r) => `${r}`).join(' , ');
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		function createEmbed() {
			const embed = new EmbedBuilder()
				.setTitle('User Info')
				.setColor(user.hexAccentColor)
				.setThumbnail(user.displayAvatarURL())
				.addField('Username', user.username, true)
				.addField('ID', user.id, true)
				.addField('Created At', user.createdAt, true)
				.addField('Joined At', member.joinedAt, true)
				.addField('Roles', roles, true)
				.addField('Bot', user.bot, true)
				.setTimeStamp();
			return embed;
		}
		await interaction.reply(userEmbed);
	},
};
