<script setup lang="ts">
import { ref } from 'vue'
import SearchScreen from './components/screens/SearchScreen.vue'

import { useCountriesStore } from '@/stores/countries'

const countryStore = useCountriesStore()
</script>

<template>
	<header>
		<h1>Onde no mundo?</h1>
		<button>Modo escuro</button>
	</header>
	<SearchScreen v-if="countryStore.screen === null" />
	<div v-else>
		{{ countryStore.screen.name.official }}
	</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Nunito Sans', sans-serif;
}

#app {
	width: 100vw;
	height: 100vh;
	background-color: #fafafa;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;

	> header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 8%;
		background: #ffff;
		-webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.25);
		box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.25);

		h1 {
			font-size: 1.5rem;
			font-weight: 800;
			color: #000;
		}
	}

	> main {
		padding: 0 8%;
	}
}
</style>
