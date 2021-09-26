import { ApplyOptions } from '@sapphire/decorators';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { reply, send } from '@skyra/editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'Pauses a queue'
})
export class UserCommand extends SubCommandPluginCommand {
	public async run(message: Message) {
		if (!message.guild || !message.member) return message.reply('You cannot use commands in dms!');
		const queue = this.container.client.player.getQueue(message.guild);
		if (!queue || !queue.playing) return reply(message, 'No music is being played!');
		const paused = queue.setPaused(true);
		return send(message, { content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!' });
	}
}
