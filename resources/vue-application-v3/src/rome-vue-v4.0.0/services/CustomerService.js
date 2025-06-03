export default class CustomerService {
    getCustomersSmall() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/customers-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersMedium() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/customers-medium.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersLarge() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/customers-large.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getCustomersXLarge() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/customers-xlarge.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
