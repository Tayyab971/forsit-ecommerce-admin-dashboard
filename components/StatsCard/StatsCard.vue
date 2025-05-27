<script setup lang="ts">
import { defineProps } from 'vue'
import { formatCurrency } from '~/lib/utils';

const props = defineProps<{
    value: number
    title: string
    amount?: number
    description: string
    message?: string
}>()


const formattedAmount = computed(() => formatCurrency(props.amount))

</script>

<template>
    <Card class="w-full ">
        <CardHeader>
            <CardDescription class="text-md">{{ title }}</CardDescription>
            <CardTitle class="text-2xl">{{ formattedAmount }}</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="text-lg text-muted-foreground">+{{ message }}</div>
        </CardContent>
        <CardFooter>
            <Progress :model-value="value" />
        </CardFooter>
    </Card>
</template>
