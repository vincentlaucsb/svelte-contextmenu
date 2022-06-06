import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.ts',
	output: [
		{ file: pkg.module, 'format': 'es', exports: "named" },
		{ file: pkg.main, 'format': 'umd', name, exports: "named" }
	],
	plugins: [
		svelte({
      preprocess: autoPreprocess()
    }),
		resolve(),
    typescript({ sourceMap: !production })
	]
};
