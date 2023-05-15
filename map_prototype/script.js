function customMap(func){

  try {
    func.call();
  } catch (e) {
    throw new Error ({ 
          name:        "Custom Map Error", 
          level:       "Show Stopper", 
          message:     "check __map method call", 
          htmlMessage: "check __map method call",
          toString:    function(){return this.name + ": " + this.message;} 
        })
  }

  let array = this;
  let result = [];

  for(let i = 0; i < array.length; i++) {
    let resultItem = func.call(null,array[i],i,array);
    result.push(resultItem); 
  }

  return result;
}

Array.prototype.__map = customMap;

let test =  [1,2,3];
console.log(test);

let result1 = test.__map(func);
console.log(result1);

let result2 = test.__map((item)=>item*item);
console.log(result2);

function func(item) {
  return item * 10;
}

let result3 = [].__map((item)=>item*item);
console.log(result3);

let result4 = [1,2,3].__map();
console.log(result4);