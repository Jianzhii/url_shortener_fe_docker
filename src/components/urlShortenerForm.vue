<template>
    <div class="form-container">
        <el-header>
            <h1>Welcome to URL shortening service!</h1>
        </el-header>
        <el-main>
            <el-form ref="formRef" :model="urlShortenerForm" label-width="100px" class="url-shorterningForm" :rules="urlShortenerRules">
                <h3>Enter your URL to be shortened:</h3>
                <el-form-item label="URL" prop="url">
                    <el-input v-model="urlShortenerForm.url" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Alias" prop="alias">
                    <el-input v-model="urlShortenerForm.alias" type="text" autocomplete="off">
                        <template #prepend>http://localhost:8080/</template>
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
import { shortenUrl } from "../api/url_shortener.js";

export default {
    name: "urlShortenerForm",
    data() {
        const validateUrl = (rule, value, cb) => {
            const validUrl = (url) => {
                try {
                    return Boolean(new URL(url));
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
                url: "",
                alias: ""
            },
            urlShortenerRules: {
                url: [
                    {
                        required: true,
                        validator: validateUrl
                    }
                ]
            },
            loading: false,
            disabled: true,
            redirect: undefined
        };
    },
    props: {
        msg: String
    },
    methods: {
        async submitForm() {
            this.loading = true;
            let req = {
                long_url: this.urlShortenerForm.url
            };
            if (this.urlShortenerForm.alias) {
                req.alias = this.urlShortenerForm.alias;
            }
            const result = await shortenUrl(req);
            console.log(result);
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
