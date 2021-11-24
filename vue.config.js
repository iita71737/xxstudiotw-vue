module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/xxstudiotw-vue/'
        : '/',

    chainWebpack: config => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            });
    },

}