<template>
    <div class="arrows-container">
        <div>
            <router-link :to="prevUrl">
                <base-button block size="sm" type="default" to="/home">
                <i size="sm" class="ni ni-bold-left"></i>
                ATRÁS
                </base-button>
            </router-link>
        </div>
        <div v-if="canContinue" class="right-container">
            <router-link :to="nextUrl">
                <base-button block size="sm" type="warning">
                SIGUIENTE
                <i size="sm" class="ni ni-bold-right"></i>
                </base-button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NavArrows',
    props: ['canContinue', 'prevUrl', 'nextUrl']
}
</script>
<style scoped>
.arrows-container {
    padding: 1em 0;
    display: flex;
    justify-content: center;
}
.right-container {
    margin-left: 2em;
}

@media screen and (max-width: 600px) {
    .arrows-container {
        padding: 2px 0;
    }
}
</style>