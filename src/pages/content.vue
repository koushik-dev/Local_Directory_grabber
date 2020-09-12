<template>
  <div>
      <div class="flex items-center my-5">
          <a href="javascript:void(0)" v-for="(folder, i) in location" :key="folder" class="hover:underline" @click="updateContents(getLocation(i + 1))">  
              <span class="flex">
                  <span class="material-icons pl-2 text-blue-500">folder</span>
                  {{folder}} /
                </span>
          </a>
      </div>
      <Video :src="getVideo" />
  </div>
</template>

<script>
import Video from "../components/video";
export default {
    components: {
        Video
    },
    computed: {
        getVideo() {
            return JSON.parse(sessionStorage.getItem('loc')).join('/')
        },
        location() {
            return JSON.parse(sessionStorage.getItem('loc'))
        }
    },
    methods: {
        updateContents(value) {
            sessionStorage.setItem('loc', JSON.stringify(value.split('/')));
            this.$router.push({ path: '/' })
        },
        getLocation(index) {
            return this.location.slice(0, index).join('/')
        },

        setLocation() {
            sessionStorage.setItem('loc', JSON.stringify(this.location))
        }
    }
}
</script>

<style>

</style>