setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve(1)
.then(function (d) {
    console.log(d);
    return 10101010;
})
.then(d => {
    console.log("dado: " + d);
})

console.log("log direto do main");
