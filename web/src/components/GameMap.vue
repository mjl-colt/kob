<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas"></canvas>
    </div>
</template>
 
<script>
// 这个组件的真正“绘图逻辑”其实不在这个 Vue 文件里，而是在下面引入的这个GameMap中
import { GameMap } from "../assets/scripts/GameMap.js";
import { ref, onMounted } from 'vue';
 
export default {
    setup() {
        let parent = ref(null);
        let canvas = ref(null);
 
        onMounted(() => {
            new GameMap(canvas.value.getContext('2d'), parent.value);
        });

        return {
            parent,
            canvas
        }
    }
}
 
</script>
 
<style scoped>
 
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>