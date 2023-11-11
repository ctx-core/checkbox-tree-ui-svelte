import type { SvelteComponent } from 'svelte'
declare const Checkbox_Tree_Node:SvelteComponent<{
	id?:string
	title?:string
	checked?:boolean|null
	children?:Record<string, any>
	expanded?:boolean|null
	indeterminate?:boolean|null
	child_key_a?:string[]|null
}, {
	change:CustomEvent<InputEvent>
}>
export default Checkbox_Tree_Node
