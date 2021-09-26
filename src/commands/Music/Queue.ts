import { ApplyOptions } from '@sapphire/decorators';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'A basic command'
})
export class UserCommand extends SubCommandPluginCommand {
	public async run(message: Message, args: Args) {
		if (!message.guild) return;
		const queue = this.container.player.getQueue(message.guild.id);
		if (!queue || !queue.current) return reply(message, 'No music is being played');
		const page = await args.pick('integer').catch(() => 1);
		const start = 10 * (page - 1);
		const end = start + 10;
		const currentTrack = queue.current;
		const tracks = queue.tracks.slice(start, end).map((m, i) => {
			return `${i + start + 1}. **${m.title}** ([link](${m.url}))`;
		});

		const pagedMessage = new PaginatedMessage({
			template: new MessageEmbed().setColor('AQUA')
		});

		pagedMessage.addPageEmbed((embed) => {
			embed
				.setTitle('Server Queue')
				.setDescription(`${tracks.join('\n')} ${queue.tracks.length > end ? `\n...${queue.tracks.length - end} more track(s)` : ''}`)
				.addFields({ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` });
			return embed;
		});
		return await pagedMessage.run(await reply(message, 'Track'), message.author);
	}
}
