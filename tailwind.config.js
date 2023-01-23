module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      minHeight: {
        'default': '50%',
      },
      
      colors: {
        'celeste': '#00AEEE',
        'verde' : '#7ca157',
        'gris' : '#CACFD2',
      },
    },
  },
  mode: 'jit',
  plugins: [],
}
