<script>
import { createEventDispatcher } from 'svelte'
import { clone } from '@ctx-core/object'
import Checkbox_Tree_Knob from './Checkbox_Tree_Knob.svelte'
import Checkbox_Tree_Input from './Checkbox_Tree_Input.svelte'
const dispatch = createEventDispatcher()
export let id = ''
export let title = ''
export let checked = null
export let children = null
export let expanded = null
export let indeterminate = null
export let child_key_a = null
$: {
	if (children) {
		let has_true
		let has_false
		for (const child_key of child_key_a||[]) {
			const child = children[child_key]
			has_true = has_true || !!child
			has_false = has_false || !child
		}
		checked = has_true && !has_false
		indeterminate = has_true && has_false
	}
}
/**
 * @param {InputEvent} event
 */
function onclick_knob(event) {
	event.preventDefault()
	expanded = !expanded
}
/**
 * @param {InputEvent} event
 */
function onchange_input(event) {
	const { target } = event
	const { checked } = target
	const i_children = clone(children)
	if (checked) {
		expanded = true
	}
	if (i_children && child_key_a) {
		for	(const child_key of child_key_a||[]) {
			i_children[child_key] = checked
		}
		indeterminate = false
	}
	dispatch('change', event)
}
</script>

{#if children}
	<Checkbox_Tree_Knob
		{expanded}
		on:click="{onclick_knob}"
	></Checkbox_Tree_Knob>
{/if}
<Checkbox_Tree_Input
	{id}
	{title}
	bind:indeterminate
	bind:checked
	on:change={onchange_input}
></Checkbox_Tree_Input>
{#if expanded}
	<slot></slot>
{/if}
