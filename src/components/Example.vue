<template>
    <div class="pt-5">
        <div v-if="toggleImage">
            <img
                style="border: 1px solid magenta; width: 300px; max-height: 300px;"
                class="mh-50"
                src="/assets/img/flower.jpg"
                alt="Max-width 100%"
            />
        </div>
        <button @click="toggleImage = !toggleImage" class="mt-5 btn btn-outline-success">Toggle Image</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toggleImage: true,
            vue_component: "Hello from Component Vue js"
        };
    },
    created() {
        this.vue_component = this.$store.getters.getMessage;
    }
};
</script>

<style lang="scss">
.component-vue {
    color: blueviolet;
}
</style>