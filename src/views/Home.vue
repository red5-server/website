<template lang="pug">
  .welcome.section
    h1 #[span Red]5 Http Server
</template>

<style>
.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-wrapper > .section {
  padding: 10rem 15rem;
}

.welcome > h1 {
  margin: 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2rem;
  font-size: 4rem;
}

.welcome > h1 > span {
  color: #f44336;
}
</style>
