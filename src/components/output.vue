<template>
    <div class="output-container">
        <el-main>
            <el-result icon="success" title="Success!" sub-title="You may click on the icon to copy shortened link.">
                <template #extra>
                    <el-descriptions :column="column" size="default" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">Long Url</div>
                            </template>
                            {{ long_url }}
                        </el-descriptions-item>
                        <el-descriptions-item ref="shortenedURL">
                            <template #label>
                                <div class="cell-item">Shortened URL</div>
                            </template>
                            {{ alias }}
                            <el-tooltip class="box-item" effect="light" :content="tooltip" placement="right">
                                <el-button @click="copy" link>
                                    <el-icon style="vertical-align: middle">
                                        <DocumentCopy />
                                    </el-icon>
                                    <span style="vertical-align: middle"> </span>
                                </el-button>
                            </el-tooltip>
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
            column: 1,
            tooltip: "Copy Link:"
        };
    },
    methods: {
        async back() {
            await this.$store.dispatch("url_shortener/resetState");
            this.$router.push(`/`);
        },
        copy() {
            this.tooltip = "Copied!";

            const tmpTextField = document.createElement("textarea");
            tmpTextField.textContent = this.alias;
            tmpTextField.setAttribute("style", "position:absolute; right:200%;");
            document.body.appendChild(tmpTextField);
            tmpTextField.select();
            tmpTextField.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
            tmpTextField.remove();
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
.icon {
    pointer-events: all;
    curser: pointer;
}
</style>
