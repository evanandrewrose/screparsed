<script lang="ts">
	import { ReplayParser, ParsedReplay } from 'screparsed';
	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';

	type File = Files['accepted'][number];

	let parsed: ParsedReplay | null;

	const parse = async (file: File) => {
		const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

		parsed = await ReplayParser.fromArrayBuffer(arrayBuffer).parse();
	};
</script>

<FileDrop on:filedrop={(e) => parse(e.detail.files.accepted[0])}>Upload files</FileDrop>

{#if parsed}
	<table>
		{#each Object.entries(parsed.gameInfo) as [key, value]}
			<tr>
				<td>{key}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</table>
	{#each parsed.chatMessages as message}
		<p>
			<span
				style="color: {message.sender.color.hexString}; text-shadow: 0 0 1px black;"
			>
				{message.sender.name}</span
			>: <span>{message.message}</span>
		</p>
	{/each}
{/if}
