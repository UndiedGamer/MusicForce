import type { Player } from 'discord-player';

export const registerPlayerEvents = (player: Player) => {
	player.on('error', (queue, error) => {
		console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
	});
	player.on('connectionError', (queue, error) => {
		console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
	});

	player.on('trackStart', (queue: any, track) => {
		queue.metadata.channel.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
	});

	player.on('trackAdd', (queue: any, track) => {
		queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`);
	});

	player.on('botDisconnect', (queue: any) => {
		queue.metadata.channel.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
	});

	player.on('channelEmpty', (queue: any) => {
		queue.metadata.channel.send('❌ | Nobody is in the voice channel, leaving...');
	});

	player.on('queueEnd', (queue: any) => {
		queue.metadata.channel.send('✅ | Queue finished!');
	});
};
