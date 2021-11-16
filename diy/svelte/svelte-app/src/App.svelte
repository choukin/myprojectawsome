<script>
	import Nested from './Nested.svelte'
	let name = 'world';
	let src = ''
	let string = `this string contains some <strong>HTML</strong>`
</script>
<style>
	/* 样式是不会溢出的 */
p{
	color:purple;
	font-family: 'Comic Sans MS', cursive;
	font-size:2em;
}
</style>	
<h1>Hello {name.toUpperCase()}!</h1>
<img {src} alt="{name}a man">
<p>我是一个段落</p>
<p>{string}</p>
<p>{@html string}</p>
<Nested/>