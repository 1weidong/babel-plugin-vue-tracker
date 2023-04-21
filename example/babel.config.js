module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "babel-plugin-vue-tracker",
      {
        trackerName: 'save'
      }
    ]
  ]
}
