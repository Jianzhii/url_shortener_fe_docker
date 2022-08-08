<template>
    <div class="form-container">
        <el-header>
            <h1 v-if="!error">Redirecting to your URL...</h1>
            <el-result
                v-if="error"
                icon="error"
                title="Error"
                sub-title="Unable to find your url.. You will be redirected back to the main page shortly."
            >
                <template #extra>
                    <el-button type="primary" @click="back">Back</el-button>
                </template>
            </el-result>
        </el-header>
    </div>
</template>

<script>
import { retrieveLongUrl } from "../api/url_shortener.js";
import { ElLoading } from "element-plus";
export default {
    name: "redirectingPage",
    data() {
        return {
            error: false
        };
    },
    methods: {
        async retrieveLongUrl() {
            const alias = this.$route.path.slice(1);
            const res = await retrieveLongUrl(alias);
            return res.data.long_url;
        },
        async back() {
            await this.$store.dispatch("url_shortener/resetState");
            this.$router.push(`/`);
        }
    },
    async beforeMount() {
        const loading = ElLoading.service({ fullscreen: true, text: "Redirecting to your URL..." });
        try {
            const longUrl = await this.retrieveLongUrl();
            window.location.href = longUrl;
        } catch (err) {
            loading.close();
            this.error = true;
            setTimeout(() => {
                return this.$router.push({
                    path: "/"
                });
            }, 3000);
        }
    }
};
</script>

<style scoped>
.form-container .el-form {
    vertical-align: middle;
}
.el-input {
    width: 90%;
}
</style>
