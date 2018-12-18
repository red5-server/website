<template>
  <nav class="right">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      ><a v-bind:href="item.url">{{item.text}}</a></li>
    </ul>
  </nav>
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
        headers.forEach(h => h.insertAdjacentHTML('beforebegin', `<a name="${this.format(h.textContent)}"></a>`))
        this.items = headers.map(h => {
          return {
            text: h.textContent,
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

<style>
  nav.right > ul {
    overflow: auto;
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    position: sticky;
    top: 60px;
    height: calc(100vh - 80px);
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
</style>
