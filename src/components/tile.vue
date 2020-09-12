<template>
    <button class="shadow-sm border rounded max-w-xs m-2 p-4 flex bg-gray-200 p-2" @click="emitClk" @dblclick="vidPreview">
        <span class="material-icons px-2" :class="[isFolder ? 'text-blue-500' : 'text-red-600']">{{isFolder ? 'folder' : 'movie'}}</span>
        <span class="font-medium text-left break-all">{{content}}</span>
    </button> 
</template>

<script>
export default {
    props: ['isFolder', 'content'],
    methods: {
        emitClk() {
            this.$emit(this.isFolder ? 'folder-clk' : 'vid-preview', this.content);
        },
        vidPreview() {
            const loc = JSON.parse(sessionStorage.getItem('loc'));
            loc.push(this.content);
            sessionStorage.setItem('loc', JSON.stringify(loc));
            this.$router.push({ path: 'video' });
        }
    }
}
</script>

<style>

</style>