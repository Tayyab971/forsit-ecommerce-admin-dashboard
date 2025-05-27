<script setup lang="ts">
import { getCategories } from '~/actions/products'



const recentSales = [
    {
        name: 'Tayyab Ejaz',
        email: 'tayyabejaz971@gmail.com',
        amount: '+$1,999.00',
        avatar: '/avatars/01.png',
        fallback: 'TE',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        amount: '+$39.00',
        avatar: '/avatars/02.png',
        fallback: 'JL',
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        amount: '+$299.00',
        avatar: '/avatars/03.png',
        fallback: 'IN',
    },
    {
        name: 'Kimerly will',
        email: 'will@email.com',
        amount: '+$99.00',
        avatar: '/avatars/04.png',
        fallback: 'KW',
    },
    {
        name: 'Watson Davis',
        email: 'watson.davis@email.com',
        amount: '+$39.00',
        avatar: '/avatars/05.png',
        fallback: 'WD',
    },
    {
        name: 'John Doe',
        email: 'john.doe@email.com',
        amount: '+$39.00',
        avatar: '/avatars/05.png',
        fallback: 'JD',
    },
]


onMounted(async () => {
    const categories = await getCategories()
    console.log('Fetched categories:', categories)
})
</script>

<template>
    <div>
        <div class="flex gap-2 mb-4 ">
            <StatsCard :value="45" title="Today" description="Revenue today" message="4% increase" :amount="120.00" />
            <StatsCard :value="65" title="This week" description="Revenue in the last 7 days" message="10% increase"
                :amount="840.00" />
            <StatsCard :value="70" title="This month" description="Revenue in this month" message="8% increase"
                :amount="3650.00" />
            <StatsCard :value="85" title="This Year" description="Total revenue this year" message="20% increase"
                :amount="43800.00" />
        </div>
        <div class="flex gap-2 w-full flex-wrap ">
            <RevenueBarChart />
            <RecentList title="Recent Sales" :items="recentSales" viewAllUrl="/sales" />

        </div>
    </div>
</template>
