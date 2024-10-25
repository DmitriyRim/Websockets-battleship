import path from 'path';
import { cwd } from 'process';
import Dotenv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals'

export default {
  entry: './src/ws_server/index.ts',
  target: 'node',
  output: {
    path: path.resolve(cwd(), 'dist'),
    filename: 'index.js'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new Dotenv()
  ]
};