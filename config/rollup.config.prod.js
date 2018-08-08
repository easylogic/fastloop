import packageJSON from '../package.json'
import babel from 'rollup-plugin-babel'

// rollup.config.js
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.min.js',
    format: 'iife'
  },
  name: 'fastloop',  
  plugins : [
    //scss({output : 'dist/' + packageJSON.name + '.css'}),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd'
  },
  name: 'fastloop',
  plugins : [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}];