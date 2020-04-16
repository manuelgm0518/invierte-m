<template>
	<div>
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<b-button-group size="sm">
				<b-button :pressed.sync="isActive.bold()" @click="commands.bold" variant="silver">
					<i class="fas fa-bold"></i>
				</b-button>
				<b-button :pressed.sync="isActive.italic()" @click="commands.italic" variant="silver">
					<i class="fas fa-italic"></i>
				</b-button>
				<b-button :pressed.sync="isActive.strike()" @click="commands.strike" variant="silver">
					<i class="fas fa-strikethrough"></i>
				</b-button>
				<b-button :pressed.sync="isActive.underline()" @click="commands.underline" variant="silver">
					<i class="fas fa-underline"></i>
				</b-button>
				<b-button :pressed.sync="isActive.heading()" @click="commands.heading()" variant="silver">
					<i class="fas fa-heading"></i>
				</b-button>
				<b-button :pressed.sync="isActive.code()" @click="commands.code" variant="silver">
					<i class="fas fa-code"></i>
				</b-button>
			</b-button-group>
		</editor-menu-bar>
		<editor-content :editor="editor" class="border rounded editor p-3" />
	</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
	Heading,
	Bold,
	Italic,
	Strike,
	Underline,
	Code,
	HardBreak
} from "tiptap-extensions";

export default {
	name: "ContentEditor",
	components: {
		EditorMenuBar,
		EditorContent
  },
  mounted() {
		this.editor.setContent(this.content);
    this.editor.on('update', ({ getHTML }) => {
      this.$emit('update', getHTML());
		});
	},
	props: {
		content: String
	},
	data: () => ({
		editor: new Editor({
			extensions: [
				new Heading(),
				new Bold(),
				new Italic(),
				new HardBreak(),
				new Strike(),
				new Underline(),
				new Code()
			]
		})
	}),
	beforeDestroy() {
		this.editor.destroy();
	}
};


</script>

<style>
.editor > *:focus {
	outline: none !important;
}

</style>