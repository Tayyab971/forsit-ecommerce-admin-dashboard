<script setup lang="ts">
import InventoryProgressBar from '../InventoryProgressBar/InventoryProgressBar.vue';


const props = defineProps<{
    products: number
    InStock: number
    lowStock: number
    outOfStock: number
}>()
</script>

<template>
    <InventoryProgressBar :products="props.products" :InStock="props.InStock" :lowStock="props.lowStock"
        :outOfStock="props.outOfStock" />
</template>