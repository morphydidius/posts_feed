<template>
    <PfHeaderBar />

    <router-view></router-view>
</template>

<script>
import PfHeaderBar from './components/HeaderBar';
import { actionTypes } from '@/store/modules/auth';

export default {
    name: 'HomePage',
    components: {
        PfHeaderBar,
    },
    mounted() {
        this.$store.dispatch(actionTypes.getCurrentUser);
    },
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
