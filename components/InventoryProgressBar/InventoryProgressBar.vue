<script setup lang="ts">
import Separator from '../ui/separator/Separator.vue';

const props = defineProps<{
    products: number
    InStock: number
    lowStock: number
    outOfStock: number
}>()

const inStockPercent = computed(() => (props.InStock / props.products) * 100)
const lowStockPercent = computed(() => (props.lowStock / props.products) * 100)
const outOfStockPercent = computed(() => (props.outOfStock / props.products) * 100)


</script>

<template>
    <Card class="w-full">
        <CardHeader>
            <CardTitle class="flex gap-2 items-end">
                <div class="text-4xl">{{ products }}</div>
                <div class="text-md text-muted-foreground leading-tight">Products</div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div class="w-full h-2 bg-muted rounded overflow-hidden flex">
                <div class="bg-green-500" :style="{ width: inStockPercent + '%' }" v-if="inStockPercent > 0" />
                <div class="bg-yellow-400" :style="{ width: lowStockPercent + '%' }" v-if="lowStockPercent > 0" />
                <div class="bg-red-500" :style="{ width: outOfStockPercent + '%' }" v-if="outOfStockPercent > 0" />
            </div>
            <div class="mt-2 text-xs text-muted-foreground flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>{{ props.InStock }} In stock > 50</span>
                </div>
                <Separator orientation="vertical" class="h-4" />
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span>{{ props.lowStock }} Low stock < 10</span>
                </div>
                <Separator orientation="vertical" class="h-4" />
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>{{ props.outOfStock }} Out of stock = 0 </span>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
