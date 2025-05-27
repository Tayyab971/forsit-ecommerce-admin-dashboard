<script lang="ts" setup>
import {
    Package2,
    Settings,
    CircleDollarSign,
    ShoppingBasket,
    PackageSearch
} from 'lucide-vue-next'



import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'



const route = useRoute()

const navItems = [
    { name: 'Revenue', path: '/', icon: CircleDollarSign },
    { name: 'Inventory', path: '/inventory', icon: PackageSearch },
    { name: 'Products', path: '/products', icon: ShoppingBasket },
]

</script>

<template>
    <aside class="h-screen fixed inset-y-0 w-16 flex flex-col border-r bg-card ">
        <nav class="flex flex-col items-center gap-4 px-2 py-4">
            <div href="#"
                class="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-xs bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                <Package2 class="h-5 w-5 transition-all group-hover:scale-125" />
                <span class="sr-only">Acme Inc</span>
            </div>
            <NavItem :items="navItems" />
        </nav>
        <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <a href="#"
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            <Settings class="h-5 w-5" />
                            <span class="sr-only">Settings</span>
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Settings
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </nav>
    </aside>
</template>