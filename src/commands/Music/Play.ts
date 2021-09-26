import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { reply, send } from '@sapphire/plugin-editable-commands';
import type { GuildChannelResolvable, Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'Play a song',
	aliases: ['p']
})
export class PlayCommand extends SubCommandPluginCommand {
	public async run(message: Message, args: Args) {
		if (!message.member || !message.guild) return message.reply('You cannot play music here!');
		if (!message.member.voice.channelId) return reply(message, 'You are not in a voice channel!');
		if (message.guild.me!.voice.channelId && message.member.voice.channelId !== message.guild.me!.voice.channelId)
			return reply(message, 'You are not in my voice channel!');
		if (args.finished) return reply(message, 'You have to specify the song!');
		const query = await args.rest('string');
		const queue = this.container.player.createQueue(message.guild, {
			metadata: {
				channel: message.channel
			}
		});

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel as GuildChannelResolvable);
		} catch {
			queue.destroy();
			return await reply(message, { content: 'Could not join your voice channel!' });
		}

		const track = await this.container.player
			.search(query, {
				requestedBy: message.author
			})
			.then((x) => x.tracks[0]);

		if (!track) return await send(message, { content: `❌ | Track **${query}** not found!` });

		return queue.play(track);
	}
}
