import { defineStore } from 'pinia'
import type { ICountry } from '../Types'

export const useCountriesStore = defineStore({
	id: 'countries',
	state: () => ({
		all: [] as ICountry[],
		searchText: '',
		screen: null as ICountry | null,
	}),
	getters: {
		filtered(state) {
			if (state.searchText.length === 0) return state.all

			console.log(state.searchText)

			return state.all.filter(country => {
				const name = country.translations.por.common

				return name.toLowerCase().includes(state.searchText.toLowerCase())
			})
		},
	},
	actions: {
		async getAll() {
			const countries = (await fetch('https://restcountries.com/v3.1/all').then(response => response.json())) as ICountry[]
			this.all = countries.sort((a, b) => a.translations.por.common.localeCompare(b.name.common))
		},

		async setScreen(CountryName: string) {
			const country = (await fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`).then(response =>
				response.json()
			)) as ICountry
			// https://restcountries.com/v3.1/alpha?codes=col,pe,at
			const borderCountries = (await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`).then(
				response => response.json()
			)) as ICountry[]

			this.screen = {
				...country,
				borderCountries,
			}
		},
	},
})
