<template>
    <v-skeleton-loader
                       :loading="loading"
                       height="94"
                       type="list-item-two-line">
        <v-card>
            <v-card-title>Title</v-card-title>
            <v-card-text>Card Text</v-card-text>
        </v-card>
    </v-skeleton-loader>
</template>

<script>
    export default {
        name: "CardSkeletonLoader",
        props: ['loading']
    }
</script>

<style scoped>

</style>