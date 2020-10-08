const { join } = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@C': join(__dirname, '../server/src/config.ts')
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "@/assets/vars.sass"\n'
            }
        }
    }
}
