<template>
    <div>
        <web-view :src="url"></web-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
            url: ''
        }
    },
    onLoad(options) {
        this.url = options.url
        uni.setNavigationBarTitle({
            title: options.title
        })
    }
}
</script>

<style>

</style>
