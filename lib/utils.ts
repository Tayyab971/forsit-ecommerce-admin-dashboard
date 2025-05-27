import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import macbook from '@/assets/macbook.jpg'
import hyperX from '@/assets/hyperX.jpg'
import nike from '@/assets/nike.jpg'
import chair from '@/assets/chair.jpg'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatCurrency(amount?: number, currency = 'USD', locale = 'en-US'): string {
  if (typeof amount !== 'number') return '$0.00'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function parseCurrency(value: string): number {
  if (!value) return 0


  const cleaned = value.replace(/[^0-9.-]+/g, '')
  const parsed = parseFloat(cleaned)

  return isNaN(parsed) ? 0 : parsed
}

export const InventoryData = [{
  id: 1,
  img: nike,
  name: 'Nike Air Max 270',
  status: 'In-stock',
  price: '$499.99',
  sales: 25,
  createdAt: '2023-07-12 10:42 AM',
},
{
  id: 2,
  img: chair,
  name: 'Wooden Chair',
  status: 'Out-of-stock',
  price: '$429.99',
  sales: 100,
  createdAt: '2023-10-18 03:21 PM',
}, {
  id: 3,
  img: macbook,
  name: 'Macbook Pro 16"',
  status: 'In-stock',
  price: '$1499.99',
  sales: 25,
  createdAt: '2022-07-12 10:42 AM',
},
{
  id: 4,
  img: hyperX,
  name: 'HyperX Headphones',
  status: 'Low-stock',
  price: '$129.99',
  sales: 100,
  createdAt: '2025-01-18 03:21 PM',
},
{
  id: 5,
  img: hyperX,
  name: 'Rolex Watch',
  status: 'In-stock',

  price: '$1179.99',
  sales: 100,
  createdAt: '2024-08-08 03:21 PM',
},
]

export const InventoryColumns = [
  { key: 'img', label: '', isImage: true, hiddenAt: 'sm', className: 'w-[100px]' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'price', label: 'Price', hiddenAt: 'md' },
  { key: 'sales', label: 'Total Sales', hiddenAt: 'md' },
  { key: 'createdAt', label: 'Created at', hiddenAt: 'md' },
]

export const InventoryFilters = ['all', 'in-stock', 'low-stock', 'out-of-stock'] 