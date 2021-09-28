import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'Change volume of music'
})
export class UserCommand extends SubCommandPluginCommand {
	public async run(message: Message, args: Args) {
		if (!message.guild) return reply(message, 'You cannot use commands here!');
		const queue = this.container.player.getQueue(message.guild.id);
		if (!queue || !queue.playing) return reply(message, { content: '❌ | No music is being played!' });
		const vol = await args.pick('number');
		if (!vol) return reply(message, { content: `🎧 | Current volume is **${queue.volume}**%!` });
		if (vol < 0 || vol > 100) return reply(message, { content: '❌ | Volume range must be 0-100' });
		const success = queue.setVolume(vol);
		return reply(message, {
			content: success ? `✅ | Volume set to **${vol}%**!` : '❌ | Something went wrong!'
		});
	}
}
