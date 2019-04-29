function seila() {
    let promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            let deucerto = Math.random() < 0.9;
            if (deucerto) {
                resolve("oi");
            } else {
                reject("erro!");
            }
        }, 1000);
    });
    return promise;
}

seila()
.then(r => r.toUpperCase())
.then(d => console.log(d))
.catch(err => {
    console.log("ops! " + err);
});
