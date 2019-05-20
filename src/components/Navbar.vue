<template lang="pug">
  nav.right
    ul
      li(v-for="(item, index) in items" :key="index")
        a(v-bind:data-depth="item.depth" v-bind:href="item.url") {{item.text}}
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    let main = document.body.querySelector('main')
    if (main) {
      let headers = Array.from(main.querySelectorAll("h1,h2,h3,h4,h5,h6"));
      headers.forEach(h => h.insertAdjacentHTML('beforebegin', `<a class="heading" name="${this.format(h.textContent)}"></a>`))
      this.items = headers.map(h => {
        return {
          text: h.textContent,
          depth: parseInt(h.tagName.replace(/^h/i, '')),
          url: '#' + this.format(h.textContent)
        }
      })
    }
  },
  methods: {
    format(val) {
      return val.replace(/\s/g, '-').toLowerCase()
    }
  }
};
</script>

<style lang="scss">
nav.right {
  position: relative;
  & > ul {
    overflow: auto;
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    max-height: calc(100vh - 80px);
    position: sticky;
    // z-index: -1;
    z-index: 0;
    top: 60px;
  }
}

main .content h1,
main .content h2,
main .content h3,
main .content h4,
main .content h5,
main .content h6 {
  padding-top: 60px;
  margin-top: -40px;
  margin-bottom: 0;
}

nav.right a {
  text-decoration: none;
  display: block;
}

nav.right li {
  line-height: 1.8rem;
}

nav.right a:hover {
  text-decoration: underline;
}

nav.right a[data-depth="1"] {
  padding-left: 0;
  font-size: 1rem;
}
nav.right a[data-depth="2"] {
  padding-left: 1rem;
  font-size: 0.95rem;
}
nav.right a[data-depth="3"] {
  padding-left: 2rem;
  font-size: 0.9rem;
}
nav.right a[data-depth="4"] {
  padding-left: 3rem;
  font-size: 0.85rem;
}
nav.right a[data-depth="5"] {
  padding-left: 4rem;
  font-size: 0.8rem;
}
nav.right a[data-depth="6"] {
  padding-left: 5rem;
  font-size: 0.75rem;
}
</style>
