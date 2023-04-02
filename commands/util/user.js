/* eslint-disable no-mixed-spaces-and-tabs */
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption((option) =>
			option.setName('target').setDescription('The user\'s info to show'),
		),

	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const member = interaction.guild.members.cache.get(user.id);
		// Exclue the @everyone role
		const roles = member.roles.cache
			.map((r) => r)
			.join(' ')
			.replace(/@everyone/g, '');
		const userEmbed = createEmbed();
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		function createEmbed() {
			const embed = {
				title: `${user.username}`,
				color: member.displayColor,
				thumbnail: {
					url: `${user.displayAvatarURL()}`,
				},
				fields: [
					{
						name: 'User ID',
						value: `${user.id}`,
					},
					{
						name: 'Nickname',
						value: `${member.nickname || 'None'}`,
					},
					{
						name: 'Joined',
						value: `${member.joinedAt}`,
					},
					{
						name: 'Registered',
						value: `${user.createdAt}`,
					},
					{
						name: 'Roles',
						value: `${roles}`,
					},
					{
						name: 'Status',
						value: `${member.presence?.status}`,
					},
				],
				timestamp: new Date(),
			};
			return embed;
		}
		await interaction.reply({ embeds: [userEmbed] });
	},
};
