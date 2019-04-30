const model = {
    peso: null,
    altura: null,
    imc: function imc() {
        return this.peso / this.altura ** 2;
    }
};

export default model;
