<script lang="ts">
	import { ReplayParser } from 'screparsed';
	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';

	type File = Files['accepted'][number];
	let parsed: any;
	let players: any;

	const parse = async (file: File) => {
		const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

		parsed = await ReplayParser.fromArrayBuffer(arrayBuffer).parse();

		players = parsed.playerInfo.playerStructs;
	};
</script>

<FileDrop on:filedrop={(e) => parse(e.detail.files.accepted[0])}>Upload files</FileDrop>

{#if parsed}
	{#each parsed.frames as frame}
		{#each frame.commands as command}
			{#if command.type === 'TypeIDChat'}
				<p>{players.find((p) => p.slotID === command.data.sender).name}: {command.data.message}</p>
			{/if}
		{/each}
	{/each}
	{JSON.stringify(players)}
{/if}
