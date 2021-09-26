import type { Player } from 'discord-player';

declare module '@sapphire/pieces' {
	interface Container {
		player: Player;
	}
}
