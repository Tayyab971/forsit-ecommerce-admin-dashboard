import { defineNuxtPlugin } from '#app'
import * as icons from 'lucide-vue-next'
import type { Component } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
    for (const [name, component] of Object.entries(icons)) {
        if (typeof component === 'function' && 'displayName' in component) {
            nuxtApp.vueApp.component(name, component as Component)
        }
    }
})