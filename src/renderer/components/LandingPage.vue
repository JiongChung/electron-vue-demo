<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <el-button>默认按钮</el-button>
    <news></news>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  import News from './News';

  export default {
    name: 'landing-page',
    components: { SystemInformation,
    News },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;

    #logo {
        height: auto;
        margin-bottom: 20px;
        width: 420px;
    }
  }

  

</style>
