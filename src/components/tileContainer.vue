<template>
<div>
    <div class="grid grid-cols-5">
        <Tile
            :isFolder="true"
            :content="value"
            v-for="value in contents['folders']"
            :key="value"
            @folder-clk="folderClick" />
        <Tile
            :isFolder="false"
            :content="value"
            v-for="value in contents['files']"
            :key="value"
            @vid-preview="videoPreview" />
    </div>
    <div class="fixed top-0 w-full" v-if="isVidPreview">
       <span class="material-icons bg-gray-300 p-4 rounded-full m-2 cursor-pointer" @click="closeVid">close</span>
       <Video class="flex justify-center" :src="vidSrc" @close="closeVid" /> 
    </div>    
</div>
    
</template>

<script>
import Tile from "./tile";
import Video from "../components/video";
export default {
    components: {
        Tile,
        Video
    },
    props: ['contents'],
    data() {
        return {
            isVidPreview: false,
            vidSrc: ''
        }
    },
    methods: {
        folderClick(name) {
            this.$emit('loc-update', name);
        },
        videoPreview(name) {
            this.isVidPreview = true;
            this.vidSrc = JSON.parse(sessionStorage.getItem('loc')).join('/') + '/' +  name;
        },
        closeVid() {
            this.isVidPreview = false;
        }
    }
}
</script>

<style>

</style>