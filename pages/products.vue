<script setup lang="ts">
import { ref } from 'vue'

import { addUpdateProduct, fetchProducts, getCategories } from '~/actions/products'

const productLength = ref(0)
const categories = ref<string[]>([])
const showAddModal = ref(false)
const loading = ref(false)
const statuses = ['active', 'inactive', 'draft']

onMounted(async () => {
    try {

        const products = await fetchProducts()
        categories.value = await getCategories()
        productLength.value = products.length
    } catch (error: any) {
        alert('Error fetching products: ' + error.message)
    } finally {
        loading.value = true
    }
})

async function handleSave(product: any) {
    try {
        const success = await addUpdateProduct(product)
        if (success) {
            showAddModal.value = false
            const products = await fetchProducts() // refresh products or update state
            productLength.value = products.length
        } else {
            alert('Failed to save product')
        }
    } catch (error: any) {
        alert('Error saving product: ' + error.message)
    }
}
</script>

<template>
    <div
        class="flex flex-1 items-center justify-center rounded-lg border  border-dashed shadow-sm bg-card min-h-[800px]">
        <div v-if="loading" class="flex flex-col items-center gap-1 text-center p-4">
            <h3 className="text-2xl font-bold tracking-tight">
                You have {{ productLength }} products in the inventory
            </h3>
            <p className="text-sm text-muted-foreground">
                You can add more products by clicking this button.
            </p>

            <ProductForm v-model="showAddModal" :categories="categories" :statuses="statuses" @save="handleSave">
                <template #trigger>
                    <Button>+ Add Product</Button>
                </template>
            </ProductForm>
        </div>
        <div v-else class="w-full ">
            <Spinner />
        </div>
    </div>
</template>