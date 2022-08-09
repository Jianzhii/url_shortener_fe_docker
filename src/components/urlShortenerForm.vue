<template>
    <div class="form-container">
        <el-main>
            <el-form ref="formRef" :model="urlShortenerForm" label-width="100px" class="url-shorterningForm" :rules="urlShortenerRules">
                <h3>Enter your URL to be shortened:</h3>
                <el-form-item label="URL" prop="long_url">
                    <el-input v-model="urlShortenerForm.long_url" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Alias" prop="alias">
                    <el-input v-model="urlShortenerForm.alias" type="text" autocomplete="off">
                        <template #prepend>{{ domainName }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm" @keyup.enter="submitForm" :loading="loading" :disabled="disabled">
                        Submit
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </div>
</template>

<script>
// import { shortenUrl } from "../api/url_shortener.js";

export default {
    name: "urlShortenerForm",
    data() {
        const validateUrl = (rule, value, cb) => {
            const validUrl = (long_url) => {
                try {
                    return Boolean(new URL(long_url));
                } catch (err) {
                    return false;
                }
            };
            if (!validUrl(value)) {
                this.disabled = true;
                cb(new Error(`Please enter a valid URL!`));
            } else {
                this.disabled = false;
                cb();
            }
        };
        return {
            urlShortenerForm: {
                long_url: "",
                alias: ""
            },
            urlShortenerRules: {
                long_url: [
                    {
                        required: true,
                        validator: validateUrl
                    }
                ]
            },
            loading: false,
            disabled: true,
            domainName: process.env.VUE_APP_DOMAIN_NAME
        };
    },
    props: {
        msg: String
    },
    methods: {
        async submitForm() {
            try {
                this.loading = true;
                return this.$store
                    .dispatch("url_shortener/shortenUrl", this.urlShortenerForm)
                    .then(() => {
                        this.loading = false;
                        return this.$router.push({
                            path: "/result"
                        });
                    })
                    .catch(() => {
                        this.loading = false;
                        return false;
                    });
            } catch (err) {
                this.loading = false;
            }
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

h3 {
    text-align: left;
    padding: 0px 0px 0px 60px;
}

.el-main {
    border: 1px solid;
    border-radius: 50px;
}
</style>
