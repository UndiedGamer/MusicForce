import { ApplyOptions } from '@sapphire/decorators';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { reply } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'Resumes a paused queue'
})
export class UserCommand extends SubCommandPluginCommand {
	public async run(message: Message) {
		if (!message.guild) return reply(message, 'You cannot use commands here');
		const queue = this.container.player.getQueue(message.guild.id);
		if (!queue || !queue.playing) return reply(message, { content: '❌ | No music is being played!' });
		const paused = queue.setPaused(false);
		return reply(message, { content: paused ? '▶ | Resumed!' : '❌ | Something went wrong!' });
	}
}
