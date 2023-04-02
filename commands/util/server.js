const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		const guild = interaction.guild;
		function createEmbed() {
			const embed = {
				title: `${guild.name}`,
				color: 0x0099ff,
				thumbnail: {
					url: `${guild.iconURL()}`,
				},
				fields: [
					{
						name: 'Server ID',
						value: `${guild.id}`,
					},
					{
						name: 'Owner',
						value: `${guild.members.cache.get(guild.ownerId)}`,
					},
					{
						name: 'Created',
						value: `${guild.createdAt}`,
					},
					{
						name: 'Members',
						value: `${guild.members.cache.map((m) => m).join(' ')}`,
					},
					{
						name: 'Roles',
						value: `${guild.roles.cache
							.map((r) => r)
							.join(' ')
							.replace(/@everyone/g, '')}`,
					},
					{
						name: 'Channels',
						// Only get ThreadChannel objects
						value: `${guild.channels.cache
							.filter((c) => c.type != 4)
							.map((c) => c)
							.join(' ')}`,
					},
					{
						name: 'Boosts',
						value: `${guild.premiumSubscriptionCount}`,
					},
					{
						name: 'Bots',
						value: `${guild.members.cache.filter((m) => m.user.bot).size}`,
					},
					{
						name: 'Online Members',
						value: `${
							interaction.guild.members.cache.filter(
								(member) => member.presence?.status == 'online',
							).size
						}`,
					},
				],
				timestamp: new Date(),
			};
			return embed;
		}
		return interaction.reply({ embeds: [createEmbed()] });
	},
};
