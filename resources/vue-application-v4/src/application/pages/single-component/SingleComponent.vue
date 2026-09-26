<template>
    <div class="bg-surface-0 dark:bg-surface-950 px-12 py-20 md:px-20 xl:px-80">
       <div>Tac!!</div>
    </div>
</template>
<script setup>
import Button from 'primevue/button';
</script>

<script>
export default {
    methods: {
        goDashboard() {
            this.$router.push({ path: '/' });
        },
    },
};
</script>

<style scoped></style>
