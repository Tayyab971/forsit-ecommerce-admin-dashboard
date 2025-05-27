<script lang="ts" setup>
import { addUpdateProduct, deleteProduct, fetchProducts } from '~/actions/products';
import FrositTable from '~/components/FrositTable/FrositTable.vue';
import { formatCurrency, parseCurrency } from '~/lib/utils';


interface Product {
    id: string
    name: string
    unitPrice: number
    quantity: number
    category: string
    status: string
    description?: string
}
const products = ref<any[]>([])

const totalAssetValue = ref(0)
const showForm = ref(false)
const loading = ref(false)
const totalProducts = ref(0)
const inStock = ref(0)
const lowStock = ref(0)
const outOfStock = ref(0)
const editingProduct = ref(null)
const deleteProductState = ref(false)
const productToDelete = ref<Product | null>(null)
const productsFilter = ["active", "inactive", "draft"]
const columns = [
    { key: 'img', label: 'Image', isImage: true, className: 'hidden sm:table-cell' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'unitPrice', label: 'Unit Price', className: 'hidden md:table-cell' },
    { key: 'quantity', label: 'Quantity', className: 'hidden md:table-cell' },
    { key: 'category', label: 'Category', className: 'hidden md:table-cell' },


]
const loadProducts = async () => {
    loading.value = true
    const someproducts = await fetchProducts()

    products.value = someproducts.map(product => ({
        id: product.id,
        description: product.description || '',
        img: product.img || 'https://images.pexels.com/photos/5007442/pexels-photo-5007442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name: product.name,
        status: product.status,
        unitPrice: formatCurrency(product.unitPrice),
        quantity: product.quantity,
        category: product.category,
    }))

    totalProducts.value = products.value.length
    inStock.value = products.value.filter(p => p.quantity > 50).length
    lowStock.value = products.value.filter(p => p.quantity <= 10 && p.quantity > 0).length
    outOfStock.value = products.value.filter(p => p.quantity === 0).length

    totalAssetValue.value = products.value.reduce((total, product) => {
        const quantity = product.quantity ?? 0
        let price = typeof product.unitPrice === 'number'
            ? product.unitPrice
            : parseCurrency(product.unitPrice)
        return total + quantity * price
    }, 0)

    loading.value = false
}

onMounted(async () => {
    loading.value = true
    await loadProducts()
    loading.value = false
})

const onEdit = (row: any) => {
    editingProduct.value = { ...row, unitPrice: parseCurrency(row.unitPrice) }
    showForm.value = true
}

const onDelete = (row: any) => {
    productToDelete.value = row
    deleteProductState.value = true
}

const handleSave = async (updatedProduct: any) => {
    const success = await addUpdateProduct(updatedProduct)

    if (success) {
        await loadProducts()
        showForm.value = false
        editingProduct.value = null
    } else {
        alert('Failed to save product. Please try again.')
    }
}
const handleDelete = async () => {
    if (!productToDelete.value) return

    const success = await deleteProduct(productToDelete.value.id)
    if (success) {
        await loadProducts()
    }
    productToDelete.value = null
    deleteProductState.value = false
}

</script>
<template>
    <div class="flex flex-col gap-8">
        <div class="flex w-full gap-4">
            <AssetCard title="Total asset value" :totalAssetValue="totalAssetValue" />
            <InventoryIndicator :products="totalProducts" :InStock="inStock" :lowStock="lowStock"
                :outOfStock="outOfStock" />
        </div>
        <FrositTable title="Manage Your Products" :data="products" :columns="columns" :filters="productsFilter"
            :pageInfo="{ showingFrom: 1, showingTo: 1, total: products.length }" @edit="onEdit" @delete="onDelete" />
        <ProductForm v-model="showForm" :product="editingProduct"
            :categories="['Arts & Crafts', 'Electronics', 'Men\'s Fashion', 'Kitchen Appliances', 'Women\'s Fashion']"
            :statuses="['active', 'inactive', 'draft']" @save="handleSave" />
        <Confirmation v-model="deleteProductState" :onConfirm="handleDelete" title="Delete Product"
            description="This will permanently remove the product. Are you sure?" />
    </div>
</template>