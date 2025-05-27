<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChartOptions } from 'chart.js'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { getCategories } from '~/actions/products'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const primaryColor = typeof window !== 'undefined'
    ? window.getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
    : 'blue'

const categories = await getCategories()

const selectedCategory = ref(categories[0])
const timeRange = ref("90d")

// Generate mock chart data with categories
const chartDataRaw = categories.flatMap(category => {
    const dates = [
        "2025-04-01", "2025-05-16", "2025-05-12", "2025-05-04", "2025-05-07",
        "2025-05-08", "2025-05-13", "2025-05-17", "2024-08-22", "2024-09-23", "2025-05-27", "2025-05-29",
        "2025-03-02", "2025-02-16", "2025-01-12", "2025-04-04", "2025-03-07",
        "2025-03-08", "2025-05-13", "2025-03-17", "2025-01-22", "2024-10-23", "2025-01-27", "2025-01-29"
    ]
    return dates.map(date => ({
        date,
        category,
        revenue: Math.floor(Math.random() * 500) + 100 
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const filteredData = computed(() => {
    const referenceDate = new Date()
    let daysToSubtract = 90

    if (timeRange.value === "30d") daysToSubtract = 30
    else if (timeRange.value === "7d") daysToSubtract = 7
    else if (timeRange.value === "90d") daysToSubtract = 90
    else if (timeRange.value === "180d") daysToSubtract = 180
    else if (timeRange.value === "365d") daysToSubtract = 365


    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return chartDataRaw.filter((item) => {
        const itemDate = new Date(item.date)
        return item.category === selectedCategory.value && itemDate >= startDate
    })
})

const chartData = computed(() => ({
    labels: filteredData.value.map(d =>
        new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
        {
            label: `${selectedCategory.value} Revenue`,
            data: filteredData.value.map(d => d.revenue),
            backgroundColor: primaryColor,
            barThickness: 35,
            borderRadius: 4,
            borderCoolor: "red",
            borderSkipped: false,
            borderWidth: 2,
        }
    ]
}))

const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: false },
    },
    maintainAspectRatio: false,
    scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true },
    },
}
</script>

<template>
    <Card class="w-[75%] h-[400px] sm:h-[500px]">
        <CardHeader class="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row sm:items-center">
            <div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>Showing total sales for the selected period</CardDescription>
            </div>
            <div class="flex justify-end mt-4 mr-2 gap-2">
                <Select v-model="selectedCategory" class="w-[200px] rounded-lg">
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Select v-model="timeRange" class="w-[160px] rounded-lg">
                    <SelectTrigger>
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="365d">Last 12 months</SelectItem>
                        <SelectItem value="180d">Last 6 months</SelectItem>
                        <SelectItem value="90d">Last 3 months</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>

        <CardContent class="px-2 sm:p-6 h-full">
            <div class="h-full">
                <Bar :data="chartData" :options="chartOptions" />
            </div>
        </CardContent>
    </Card>
</template>
