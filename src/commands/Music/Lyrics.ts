import { ApplyOptions } from '@sapphire/decorators';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { Message, MessageEmbed } from 'discord.js';
import { Lyrics } from '@discord-player/extractor';
import type { Args } from '@sapphire/framework';
import { reply } from '@sapphire/plugin-editable-commands';
const lyricsClient = Lyrics.init("")

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'A basic command'
})
export class UserCommand extends SubCommandPluginCommand {
	public async run(message: Message, args: Args) {
		const song = await args.rest('string');
		const result = await lyricsClient.search(song);
		if (!result) return reply(message, "No lyrics found!")
		const embed = new MessageEmbed()
			.setTitle(result.title).setDescription(result.lyrics!).setURL(result.url).setColor('AQUA')
		return reply(message, {embeds: [embed]})
	}
}
