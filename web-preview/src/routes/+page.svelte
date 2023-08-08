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
	<!-- create table from all keys + values in paresd.gameInfo -->
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
				style="color: #{message.sender.color.rgb
					.toString(16)
					.padStart(6, '0')}; font-weight: bold; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);"
			>
				{message.sender.name}</span
			>: <span>{message.message}</span>
		</p>
	{/each}
{/if}
