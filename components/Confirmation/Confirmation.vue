<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
    modelValue: boolean
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
}>()

const emit = defineEmits(['update:modelValue', 'cancel'])

const open = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    open.value = val
})

watch(open, (val) => {
    emit('update:modelValue', val)
})

function handleConfirm() {
    open.value = false
    props.onConfirm()
}

function handleCancel() {
    open.value = false
    emit('cancel')
}
</script>

<template>
    <AlertDialog v-model:open="open">


        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ props.title || 'Are you absolutely sure?' }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ props.description || 'This action cannot be undone.' }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="handleCancel">
                    {{ props.cancelText || 'Cancel' }}
                </AlertDialogCancel>
                <AlertDialogAction @click="handleConfirm">
                    {{ props.confirmText || 'Continue' }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
