<template>
    <div class="output-container">
        <el-main>
            <el-result icon="success" title="Success!" sub-title="Please follow the instructions">
                <template #extra>
                    <el-descriptions :column="column" size="default" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">Long Url</div>
                            </template>
                            {{ long_url }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">Shortened URL</div>
                            </template>
                            {{ alias }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <br />
                    <br />
                    <el-button type="primary" @click="back">Shorten another URL</el-button>
                </template>
            </el-result>
        </el-main>
    </div>
</template>

<script>
export default {
    name: "outputPage",
    data() {
        return {
            long_url: this.$store.state.url_shortener.long_url,
            alias: this.$store.state.url_shortener.alias,
            column: 1
        };
    },
    methods: {
        async back() {
            await this.$store.dispatch("url_shortener/resetState");
            this.$router.push(`/`);
        }
    }
};
</script>

<style scoped>
.output-container {
    vertical-align: middle;
    border: 1px solid;
    border-radius: 50px;
}

.el-input {
    width: 90%;
}

h3 {
    text-align: left;
    padding: 0px 0px 0px 60px;
}
</style>
