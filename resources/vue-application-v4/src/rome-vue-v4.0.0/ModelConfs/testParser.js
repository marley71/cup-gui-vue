export default {
    name: "Esempio",
    version: 1.0,
    greet() {
        return "Ciao da" + this.name;
    },
    sum(a, b) {
        return a + b;
    }
};
