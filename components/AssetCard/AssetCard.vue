<script setup lang="ts">
import { defineProps } from 'vue'
import { formatCurrency } from '~/lib/utils';

const props = defineProps<{
    totalAssetValue: number
    title: string
}>()
const formattedTotalAssetValue = computed(() => formatCurrency(props.totalAssetValue))

</script>

<template>
    <Card class="w-[400px]">
        <CardHeader class="">
            <CardDescription class="text-lg">{{ title }}</CardDescription>
            <CardTitle class="text-4xl">{{ formattedTotalAssetValue }}</CardTitle>
        </CardHeader>
    </Card>
</template>