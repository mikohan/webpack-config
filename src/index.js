import './assets/css/style.css';
import './assets/css/aaa.css';
import './js/common';

// SCSS
//import './assets/scss/main.scss'

//import 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import Example from './components/Example.vue';
import store from '@/store';


let app = new Vue({
    el: '#app',
    store,
    components: {
      Example
    },
    data: {
      message: 'Hello Vue!'
    }
  })
