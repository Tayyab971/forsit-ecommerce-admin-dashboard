<script setup lang="ts">
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    title: string
    items: Array<{
        name: string
        email: string
        amount: string
        avatar: string
        fallback: string
    }>
    viewAllUrl?: string
}>()

const router = useRouter()

function goToViewAll() {
    if (props.viewAllUrl) router.push(props.viewAllUrl)
}
</script>

<template>
    <Card class="min-w-[24.2%]">
        <CardHeader class="flex items-center justify-between">
            <CardTitle>{{ title }}</CardTitle>
            <Button size="sm" @click="goToViewAll" v-if="viewAllUrl">
                View All
            </Button>
        </CardHeader>
        <CardContent class="grid gap-8">
            <div v-for="item in items" :key="item.email" class="flex items-center gap-4">
                <Avatar class="hidden h-9 w-9 sm:flex">
                    <AvatarImage :src="item.avatar" :alt="`Avatar of ${item.name}`" />
                    <AvatarFallback>{{ item.fallback }}</AvatarFallback>
                </Avatar>
                <div class="grid gap-1">
                    <p class="text-sm font-medium leading-none">{{ item.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ item.email }}</p>
                </div>
                <div class="ml-auto font-medium">{{ item.amount }}</div>
            </div>
        </CardContent>
    </Card>
</template>
