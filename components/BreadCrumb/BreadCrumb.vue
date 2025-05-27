<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb'

const route = useRoute()


function formatSegment(segment: string) {
    return segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
}

const breadcrumbSegments = computed(() => {
    if (route.path === '/') {
        return [
            {
                name: 'Revenue',
                path: '/revenue',
                isLast: true,
            }
        ]
    }


    const segments = route.path.split('/').filter(Boolean)
    let pathAcc = ''
    return segments.map((segment, index) => {
        pathAcc += '/' + segment
        return {
            name: formatSegment(segment),
            path: pathAcc,
            isLast: index === segments.length - 1,
        }
    })
})
</script>

<template>
    <header
        class="fixed top-0 w-full items-center bg-background  z-20  flex h-14  gap-4 border-b    sm:border-0  mb-2 ">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child>
                        <a class="text-lg font-semibold" href="/">Forsit Dashboard</a>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <template v-for="(segment, idx) in breadcrumbSegments" :key="segment.path">
                    <BreadcrumbItem v-if="!segment.isLast">
                        <BreadcrumbLink as-child>
                            <a class="text-lg font-semibold" :href="segment.path">{{ segment.name }}</a>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem v-else>
                        <BreadcrumbPage class="text-lg font-semibold"">{{ segment.name }}</BreadcrumbPage>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator v-if="idx < breadcrumbSegments.length - 1" />
                </template>
            </BreadcrumbList>
        </Breadcrumb>
    </header>
</template>
