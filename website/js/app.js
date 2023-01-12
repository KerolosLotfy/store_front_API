async function app(value = false, name) {
    try {
            let pro = new Promise((resolve, reject) => {
            let connect = value;
            if (connect) {
              resolve("hi " + name);
            } else {
              reject("error");
            }
            
            pro.then(async(res)=> await res)
        });  
    } catch {
        return error
      }
    
}

function re() {
    return app(true, "kero");
}


console.log(re());

