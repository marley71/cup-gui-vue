export default class CountryService {
    getCountries() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/countries.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
