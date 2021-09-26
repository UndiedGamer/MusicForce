import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { Player } from 'discord-player';
import { registerPlayerEvents } from './events';

const client = new SapphireClient({
	defaultPrefix: 'm!',
	regexPrefix: /^(hey +)?oxygen[,! ]/i,
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS',
		'GUILD_VOICE_STATES'
	]
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
client.player = new Player(client);
registerPlayerEvents(client.player);
