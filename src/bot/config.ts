export type Config =  {
	discord_token: string,
	minecraft_info: MinecraftInfo,
	default_prefix: string
}

export type MinecraftInfo = {
	username: string,
	password: string,
	host: string,
	port?: number
}