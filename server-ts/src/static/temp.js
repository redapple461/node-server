function sequence(start = 0, step = 1) {
	let nextStep = start;
	return function() {
	  var returnValue = nextStep;
	  nextStep += step;
	  return returnValue;
	}
}

function take(gen, x){
	let arr = [];
	for (let i = 0 ;i <= x; i++){
		arr.push(gen());
	}
	return arr;
}

function square(x){
	return x*x;
}

function map(fn, array){
	let newArr = array;
	for(i = 0 ; i < newArr.length ; i++){
		newArr[i] = fn(newArr[i]);
	}
	return newArr;
}

function fmap(a,gen){
	let nextStep = a(gen());
	return function(){
		let returnV = nextStep;
		nextStep = a(gen());
		return returnV;
	}
}
// generator
let generator = sequence(10, 3);
console.log(take(generator,6));

// map
let arr = [1,2,3,4];
console.log(map(square,arr));

// generator with agr. function
let squareGenerator = fmap(square,generator);
console.log(squareGenerator());


  