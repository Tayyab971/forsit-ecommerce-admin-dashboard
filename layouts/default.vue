<template>
    <div class=" ">
        <div class="">
            <Sidebar />
            <div class="pl-24 pr-12  py-4 w-full">
                <BreadCrumb />
                <div class="mt-12 ">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>