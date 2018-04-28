import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

// Import the development configuration.
import config from './dev'

// Inject the production settings.
config.output.file = 'build/drop-easy.min.js'
config.plugins[0] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
config.plugins.push(uglify())

export default config
