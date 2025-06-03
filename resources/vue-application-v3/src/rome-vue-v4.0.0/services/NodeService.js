export default class NodeService {
    getTreeTableNodes() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/treetablenodes.json')
            .then((res) => res.json())
            .then((d) => d.root);
    }

    getTreeNodes() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/treenodes.json')
            .then((res) => res.json())
            .then((d) => d.root);
    }
}
