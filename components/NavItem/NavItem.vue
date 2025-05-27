<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { PropType } from 'vue'

interface NavItem {
    name: string
    path: string
    icon: any
}

const props = defineProps({
    items: {
        type: Array as PropType<NavItem[]>,
        required: true,
    },
})

const route = useRoute()
const isActive = (path: string) => {
    return route.path === path ? "bg-primary " : ""
}
</script>

<template>
    <TooltipProvider>
        <Tooltip v-for="item in items" :key="item.path">
            <TooltipTrigger as-child>
                <a :href="item.path"
                    class="group flex h-10 w-10 items-center  justify-center rounded-full transition-colors md:h-8 md:w-8"
                    :class="{
                        'bg-primary text-lg h-12 w-12 text-primary-foreground': route.path === item.path,
                        '': route.path !== item.path,
                    }">
                    <component class="h-5 w-5 transition-all group-hover:scale-125" :is="item.icon" />
                </a>
            </TooltipTrigger>
            <TooltipContent side="right">{{ item.name }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
