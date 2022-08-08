<template>
    <div class="form-container">
        <el-header>
            <h1>Come on</h1>
        </el-header>
        <el-main>
            <h1>Lets go</h1>
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
</style>
