    <script setup lang="ts">
    import { ref, defineEmits, defineProps } from 'vue'
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'
    import { Search } from 'lucide-vue-next'

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    import { Button } from '@/components/ui/button'
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table'
    import {
        MoreHorizontal,
    } from 'lucide-vue-next'
    import type { BadgeVariants } from '../ui/badge'
    import Input from '../ui/input/Input.vue'
    type StatusKey = 'in-stock' | 'low-stock' | 'out-of-stock' | 'active' | 'inactive' | 'draft'
    const statusVariantMap: Record<StatusKey, string> = {
        'in-stock': 'success',
        'low-stock': 'warning',
        'out-of-stock': 'destructive',
        'active': 'success',
        'inactive': "destructive",
        'draft': 'warning',
    }
    interface Column {
        key: string
        label: string
        hiddenAt?: string
        render?: (row: any) => any
        isImage?: boolean
        className?: string
    }

    const props = defineProps<{
        columns: Column[]
        data: any[]
        title?: string
        description?: string
        pageInfo?: {
            showingFrom: number
            showingTo: number
            total: number
        }
        filters?: string[]
    }>()
    const activeFilter = ref('all')
    const searchQuery = ref('')

    const filteredData = computed(() => {
        let filtered = props.data

        if (props.filters && activeFilter.value !== 'all') {
            filtered = filtered.filter(
                (item) => item.status?.toLowerCase() === activeFilter.value.toLowerCase()
            )
        }

        if (searchQuery.value.trim()) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        return filtered
    })
    const emit = defineEmits<{
        (e: 'edit', row: any): void
        (e: 'delete', row: any): void
    }>()

    const onEdit = (row: any) => emit('edit', row)
    const onDelete = (row: any) => emit('delete', row)
</script>

    <template>
        <div class="w-full">
            <Tabs v-model:model-value="activeFilter" default-value="all">
                <div class="flex items-center justify-between mb-4 ">
                    <div class="relative w-64 max-w-full">
                        <Input v-model="searchQuery" type="search" placeholder="Search by name..."
                            class="pl-10 bg-card" />
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search class="h-4 w-4 text-muted-foreground" />
                        </span>
                    </div>

                    <div class="flex items-center ">
                        <TabsList class="bg-card">
                            <TabsTrigger class="hover:cursor-pointer" value="all">All</TabsTrigger>
                            <TabsTrigger class="hover:cursor-pointer" v-for="filter in props.filters?.slice(1)"
                                :key="filter" :value="filter">
                                {{ filter.replace(/-/g, ' ') }}
                            </TabsTrigger>
                        </TabsList>


                    </div>
                </div>
                <TabsContent :value="activeFilter">
                    <Card>
                        <CardHeader>
                            <CardTitle>{{ props.title ?? 'Table' }}</CardTitle>
                            <CardDescription v-if="props.description">{{ props.description }}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead v-for="col in props.columns" :key="col.key"
                                            :class="[col.hiddenAt ? `${col.hiddenAt}:table-cell hidden` : '', col.className]">
                                            {{ col.label }}
                                        </TableHead>
                                        <TableHead class="w-[100px]"><span class="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <TableRow v-for="row in filteredData" :key="row.id || JSON.stringify(row)">
                                        <TableCell v-for="col in props.columns" :key="col.key"
                                            :class="[col.hiddenAt ? `${col.hiddenAt}:table-cell hidden` : '', col.className]">
                                            <template v-if="col.key === 'status'">
                                                <Badge
                                                    :variant="statusVariantMap[row.status.toLowerCase() as StatusKey] as BadgeVariants['variant'] || 'default'">
                                                    {{ row.status }}
                                                </Badge>
                                            </template>
                                            <template v-else-if="col.render">
                                                <component :is="col.render(row)" />
                                            </template>
                                            <template v-else-if="col.isImage">
                                                <img :src="row[col.key]" alt="Image"
                                                    class="aspect-square rounded-md object-cover" width="64"
                                                    height="64" />
                                            </template>
                                            <template v-else>
                                                {{ row[col.key] }}
                                            </template>
                                        </TableCell>


                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger as-child>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal class="h-4 w-4" />
                                                        <span class="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem @click="onEdit(row)">Edit</DropdownMenuItem>
                                                    <DropdownMenuItem @click="onDelete(row)">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>

                        <CardFooter v-if="props.pageInfo">
                            <div class="text-xs text-muted-foreground">
                                Showing <strong>{{ props.pageInfo.showingFrom }}</strong> -
                                <strong>{{ props.pageInfo.showingTo }}</strong> of
                                <strong>{{ props.pageInfo.total }}</strong> items
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    </template>
