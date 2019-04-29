let res;
let url;
console.log("iniciando");
let p1 = fetch('dados.json');
let p2 = p1.then(r => r.json());
let p3 = p2.then(dados => fetch(dados.sites[0]));
let p4 = p3.then(r => r.json());
let p5 = p4.then(numeros => { console.log(numeros); })
p4.catch(function (err) {
    console.log("ops!");
    console.log(err);
})
console.log("finalizada a execução");
