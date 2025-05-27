<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

const props = defineProps({
    modelValue: Boolean,
    product: Object as () => any,
    categories: {
        type: Array as () => string[],
        default: () => [],
    },
    statuses: {
        type: Array as () => string[],
        default: () => [],
    },
})

const emit = defineEmits(['update:modelValue', 'save'])

const show = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    show.value = val
})

watch(show, (val) => {
    emit('update:modelValue', val)
})



const productName = ref('')
const description = ref('')
const status = ref('')
const price = ref('')
const stock = ref('')
const category = ref('')


const errors = ref<{ [key: string]: string }>({})
watch(() => props.product, (product) => {

    if (product) {
        productName.value = product.name || ''
        description.value = product.description || ''
        price.value = product.unitPrice || 0,
            stock.value = product.quantity || ''
        category.value = product.category || ''
        status.value = product.status || ''
    } else {
        resetForm()
    }
}, { immediate: true })


function validate() {
    errors.value = {}
    if (!productName.value.trim()) errors.value.productName = 'Product name is required'
    if (!price.value || isNaN(Number(price.value)) || Number(price.value) < 0)
        errors.value.price = 'Valid price required'
    if (!stock.value || isNaN(Number(stock.value)) || Number(stock.value) < -1)
        errors.value.stock = 'Valid stock number required'
    if (!category.value) errors.value.category = 'Category is required'
    if (!status.value) errors.value.status = 'Status is required'
    return Object.keys(errors.value).length === 0
}

function resetForm() {
    productName.value = ''
    description.value = ''
    status.value = ''
    price.value = ''
    stock.value = ''
    category.value = ''

    errors.value = {}
}

async function onSubmit() {
    if (!validate()) return

    const product = {
        id: props.product?.id || null,
        name: productName.value.trim(),
        description: description.value.trim(),
        unitPrice: Number(price.value),
        quantity: Number(stock.value),
        category: category.value,
        status: status.value,

    }
    emit('save', product)
    resetForm()
    show.value = false
}
const isEditMode = computed(() => !!props.product)
const dialogTitle = computed(() => (isEditMode.value ? 'Edit Product' : 'Add New Product'))
const dialogDescription = computed(() =>
    isEditMode.value
        ? 'Update the product details below.'
        : 'Fill in the details below to add a new product.'
)
const buttonText = computed(() => (isEditMode.value ? 'Update Product' : 'Add  Product'))
</script>

<template>
    <Dialog v-model:open="show" class="bg-card">
        <DialogTrigger asChild>
            <slot name="trigger" />
        </DialogTrigger>

        <DialogContent class="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{{ dialogTitle }}</DialogTitle>
                <DialogDescription>
                    {{ dialogDescription }}
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-4">
                <div>
                    <Label for="name">Product Name</Label>
                    <Input id="name" v-model="productName" placeholder="Enter product name" class="mt-1" />
                    <p v-if="errors.productName" class="text-destructive text-sm mt-1">{{ errors.productName }}</p>
                </div>

                <div>
                    <Label for="description">Description</Label>
                    <Textarea id="description" v-model="description" placeholder="Enter product description" rows="3"
                        class="mt-1" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <Label for="price">Price (USD)</Label>
                        <Input id="price" v-model="price" type="number" min="0" step="0.01" placeholder="0.00"
                            class="mt-1" />
                        <p v-if="errors.price" class="text-destructive text-sm mt-1">{{ errors.price }}</p>
                    </div>

                    <div>
                        <Label for="stock">Initial Stock</Label>
                        <Input id="stock" v-model="stock" type="number" min="0" placeholder="0" class="mt-1" />
                        <p v-if="errors.stock" class="text-destructive text-sm mt-1">{{ errors.stock }}</p>
                    </div>
                </div>

                <div>
                    <Label for="category">Category</Label>
                    <Select v-model="category" id="category" aria-label="Select product category" class="mt-1">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="cat in props.categories" :key="cat" :value="cat">
                                {{ cat }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p v-if="errors.category" class="text-destructive text-sm mt-1">{{ errors.category }}</p>
                </div>

                <div>
                    <Label for="status">Status</Label>
                    <Select v-model="status" id="status" aria-label="Select status" class="mt-1">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="stat in props.statuses" :key="stat" :value="stat">
                                {{ stat }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p v-if="errors.status" class="text-destructive text-sm mt-1">{{ errors.status }}</p>
                </div>


                <DialogFooter>
                    <Button type="submit" class="w-full">{{ buttonText }}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
