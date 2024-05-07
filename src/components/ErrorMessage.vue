<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
    name: "PfErrorMessage",
    props: {
        message: {
            type: String,
            default: 'Something went wrong',
        }
    }
}
</script>