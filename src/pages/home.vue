<template>
  <div>
        <!-- Search new location -->
        <form @submit.prevent="getFiles" class="text-center m-3">
            <input type="text" name="folder" class="border m-2 p-2" placeholder="Folder location..." />
            <button type="submit" class="border p-2 bg-red-300 rounded">submit</button>
        </form>
        <button class="border p-2 bg-red-400 rounded font-bold" @click="saveCurrent">Save Current Path</button>
      
        <!-- Saved locations -->
        <div class="flex items-center justify-center">
            <span class="material-icons mx-2">save</span>
            <select name="location" id="location" class="border rounded p-1 border-gray-300 my-2" @change="navigate">
                <option value="-1" default>...</option>
                <option :value="index" v-for="(item, index) in history" :key="item">
                    {{item}}
                </option>
            </select>            
        </div>
        
        <p class="inline"><span class="font-bold">{{contents['files'] ? contents['files'].length : 0}}</span> file(s), <span class="font-bold">{{contents['folders'] ? contents['folders'].length : 0}}</span> folder(s)</p>
        <div class="flex items-center my-5">
            <a href="javascript:void(0)" v-for="(folder, i) in location" :key="folder" class="hover:underline" @click="updateContents(getLocation(i + 1))">  
                <span class="flex">
                    <span class="material-icons pl-2 text-blue-500">folder_open</span>
                    {{folder}} /
                    </span>
            </a>
        </div>
        <TileContainer :contents="contents" @loc-update="locUpdate" />
  </div>
</template>

<script>
import TileContainer from "../components/tileContainer";
export default {
    components: {
        TileContainer
    },
    data() {
        return {
            contents: {},
            location: [],
            history: JSON.parse(localStorage.getItem('locHistory'))
        }
    },
    mounted() {
        let loc = sessionStorage.getItem('loc')
        if (loc) {
            this.updateContents(JSON.parse(loc).join('/'));
        }
    },
    methods: {
        saveCurrent() {
            let hist = JSON.parse(localStorage.getItem('locHistory')) || [];
            hist.push(this.getLocation())
            localStorage.setItem('locHistory', JSON.stringify(hist));
            this.history = hist
        },
        locUpdate(name) {
            this.updateContents(`${this.getLocation()}/` + name)
        },
        getFiles() {
            const fileLoc = document.querySelector("[name='folder']");
            this.updateContents(fileLoc.value);
            fileLoc.value = '';
        },

        updateContents(value) {
            this.setLocation(value);
            fetch(`http://localhost:3000/contents?path=${value}`).then(async resp => {
                this.contents = await resp.json();
            })
        },

        folderClick({ target }) {
            this.updateContents(`${this.getLocation()}/${target.children[1].textContent}`);
        },

        getLocation(index) {
            return this.location.slice(0, index).join('/')
        },

        setLocation(value) {
            this.location = value.split(/[\\|/]/g);
            sessionStorage.setItem('loc', JSON.stringify(this.location))
        },

        navigate({ target: { value } }) {
            +value > -1 && this.updateContents(JSON.parse(localStorage.getItem('locHistory'))[+value]);
        }

    }
}
</script>

<style>

</style>