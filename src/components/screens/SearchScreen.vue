<script setup lang="ts">
import { useCountriesStore } from '@/stores/countries'

const countryStore = useCountriesStore()

countryStore.getAll()

function translateRegion(region: string): string {
	switch (region) {
		case 'Africa':
			return 'África'
		case 'Americas':
			return 'América'
		case 'Asia':
			return 'Ásia'
		case 'Europe':
			return 'Europa'
		case 'Oceania':
			return 'Oceania'
		default:
			return region
	}
}

function formatNumber(number: number): string {
	return new Intl.NumberFormat('pt-BR').format(number)
}
</script>

<template>
	<main id="SearchScreen">
		<header>
			<input type="text" v-model="countryStore.searchText" placeholder="Pesquise um país..." />
		</header>
		<main>
			<div v-for="country in countryStore.filtered" class="Country" @click="countryStore.setScreen(country.name.common)">
				<header>
					<img :src="country.flags.svg" alt="" />
				</header>
				<main>
					<h4>{{ country.translations.por.common }}</h4>
					<p>
						População: <span>{{ formatNumber(country.population) }}</span>
					</p>
					<p>
						Região: <span>{{ translateRegion(country.region) }}</span>
					</p>
					<p>
						Capital: <span>{{ country.capital?.[0] }}</span>
					</p>
				</main>
			</div>
		</main>
	</main>
</template>

<style scoped lang="scss">
#SearchScreen {
	width: 100vw;
	height: 100%;

	> header {
		margin: 48px 0;

		input {
			width: 100%;
			border: none;
			outline: none;
			padding: 16px 8px;
			border-radius: 4px;
			-webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.25);
			box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.25);
		}
	}

	> main {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 64px;
	}
}

.Country {
	width: 240px;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	background-color: #fff;

	&:hover {
		transform: scale(1.05);
	}

	header {
		height: 160px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	main {
		padding: 16px;
	}

	h4 {
		margin-bottom: 16px;
		font-size: 18px;
	}

	p {
		font-weight: 600;
	}

	span {
		font-weight: 300;
	}
}
</style>
