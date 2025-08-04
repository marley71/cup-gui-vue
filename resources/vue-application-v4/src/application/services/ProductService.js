export default class ProductService {
    getProductsSmall() {
        return import('@/rome-vue-v4.0.0/assets/demo/data/products-small.json')
            .then((res) => {
                console.debug('res',res.default.data);
                return res.default.data
            })
            //.then((d) => d.data);
    }

    getProducts() {
        return import('@/rome-vue-v4.0.0/assets/demo/data/products.json')
            .then((res) => res.default.data)
            //.then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return import('@/rome-vue-v4.0.0/assets/demo/data/products-orders-small.json')
            .then((res) => res.default.data)
            //.then((d) => d.data);
    }
}
