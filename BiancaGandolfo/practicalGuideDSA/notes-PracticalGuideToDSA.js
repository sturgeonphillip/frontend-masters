// const uniqSort = function(arr) {
// 	const breadcrumbs = {};
// 	const result = [arr[0]];

// 	for ( let i = 1; i < arr.length; i++ ) {
// 		if (!breadcrumbs[arr[i]]) {
// 			result.push(arr[i]);
// 			breadcrumbs[arr[i]] = true;
// 		}
// 	}
// 	return result.sort((a, b) => a - b);
// }

// console.log(uniqSort([4, 2, 2, 3, 2, 2, 2])) // [2, 3, 4 ]

// /**
//  *  - breadcrumbs vs memoization
//  * 
//  * 	the value we get to cache with the breadcrumbs method is not the result of a 			function.
//  * 	memoization is a type of cache - saving the result of a function
//  * 	==> difference is where the value comes from
//  * 
//  * - factorial
//  * n!
//  * 5! === 5 * 4 * 3 * 2 * 1
//  * factorial(35) === 35!
//  * factorial(36) === 35! * 36 
//  *
//  * 
//  */

// //* - *//
// 	//o//


// /** Exercise 1 */

// // Task 1: Write a function, times10, that takes an argument, n, and multiples n times 10
// // a simple multiplication fn
// const times10 = (n) => {return n * 10};

// console.log('~~~~~~~~~~~~~~TASK 1~~~~~~~~~~~~~~');
// console.log('times10 returns:', times10(9)); // 90


// // Task 2: Use an object to cache the results of your times10 function. 
// // protip 1: Create a function that checks if the value for n has been calculated before.
// // protip 2: If the value for n has not been calculated, calculate and then save the result in the cache object.

// const cache = {};

// const memoTimes10 = (n) => {
// if (n in cache) {
// 	console.log('Fetching from cache:', n);
// 	return cache[n];
// } else {
// 	console.log('Calculating result');
// 	let result = times10(n);
// 	cache[n] = result;
// 	return result;
// }
// }

// console.log('~~~~~~~~~~~~~~TASK 2~~~~~~~~~~~~~~');
// console.log('Task 2 calculated value:', memoTimes10(9));	// calculated
// console.log('Task 2 cached value:', memoTimes10(9));	// cached


// /** Exercise 2 */

// // const times10 = (n) => (n * 10);

// // Task 3: Clean up your global scope by moving your cache inside your function.
// // protip: Use a closure to return a function that you can call later.

// // const memoizedClosureTimes10 = () => {
// // 	let cache = {};
// // 	return (n) => {
// // 		if (n in cache) {
// // 			console.log('fetching from cache: ', n);
// // 			return cache[n];
// // 		} else {
// // 			console.log('calculating result...', );
// // 			let result = times10(n);
// // 			cache[n] = result;
// // 			return result;
// // 		}
// // 	} 
// // };

// // const memoClosureTimes10 = memoizedClosureTimes10();
// // console.log('~~~~~~~~~~~~~~TASK 3~~~~~~~~~~~~~~');
// // try {
// //   console.log('Task 3 calculated value:', memoClosureTimes10(9));	// calculated
// //   console.log('Task 3 cached value:', memoClosureTimes10(9));	// cached
// // } catch(e) {
// //   console.error('Task 3:', e);
// // }


// // const times10 = (n) => (n * 10);
// // Task 4: Make your memo function generic and accept the times10 function as a callback rather than defining the n * 10 logic inside the if/else or pulling it in from the global scope.

// // protip: Take advantage of the fact that parameters are saved in the closure as well, just like the cache from the previous example.
// 
// solutions: https://slides.com/bgando/intro-to-algorithms/#/2/10


// DRY --> 'DO NOT REPEAT'
// WET --> 'We Enjoy Typing' || 'Write Everything Twice'

function factorial(num) {
	if (num === 1) {
		return num;
	} else {
		return num *= factorial(num - 1);
	}
}
//console.log(factorial(5))

function wrapperFnLoop(start, end) {
	function recurse(i) {
		// console.log(`looping from ${start} until ${end}`);

		if (i < end) {
			recurse(i + 1);
		}
	}
	if (start < 99) {
		// console.log(`start is ${start} so it fits!`);
		recurse(start);
	} else {
		// console.log(`start is ${start}, which is too large.`);
	}
}

function MemoFnLoop(i, end) {
	console.log(`looping from ${i} until ${end}`);
	if (i < end) {
		MemoFnLoop(i + 1, end);
	}
}

// console.log('~~~ wrapperFnLoop ~~~');
wrapperFnLoop(101, 5);
// console.log('~~~ MemoFnLoop ~~~')
//MemoFnLoop(1, 6);

function joinElements(array, joinString) {
	// ['s', 'cr', 't cod', '!!']
	// 'e'
	function recurse(index, resultSoFar) {
		resultSoFar += array[index];

		if (index === array.length - 1) {
			return resultSoFar;
		} else {
			return recurse(index + 1, resultSoFar + joinString);
		}
	}
	return recurse(0, '');
}

// console.log(joinElements(['s', 'cr', 't cod', '!!'], 'e'));



function joinIterative(array, join) {
	let soFar = '';
	for (let i = 0; i < array.length - 1; i++) {
		soFar += array[i] + join;
		// if (i !== array.length - 1) {
		// 	soFar += join; 
		// }
	}
	return soFar + array[array.length - 1];
}

// console.log(joinIterative(['s', 'cr', 't cod', '!!'], 'e'));

const memoize = (cb) => {
	let cache = {};
	return function(n) {
		if (cache[n]) {
			return cache[n];
		} else {
			let result = cb(n);
			cache[n] = result;
			return result;
		}
	}
}


const factors = memoize((x) => {
	if (x === 0) {
		return 1;
	} else {
		return x * factors(x - 1);
	}
}
)
// console.log(factors(5));

const memoFib = () => {
	const cache = {};
	return function() {
		if (cache[n]) {
			return cache[n];
		}
	}

}
const fib = (n) => {
	if (n === 1) {
		return 0;
	} else if (n === 2) {
		return 1;
	}
	else {
		return fib(n - 1) + fib(n - 2);
	}
}
let f = 8;
// console.log(`fibonacci of ${f} is ${fib(f)}`)

// const fibsIterative = (n) => {
// 	let num = 1;
// 	let result = 2;
// 	let sum = 0;
// 	for (let i = 0; i < n; i++) {
// 		sum = num + result;
// 		num = result;
// 		result = sum;
// 	}
// 	return result;
// }

// console.log('fibs: ', fibsIterative(5))


/** Divide and Conquer */

// binary search => sorted array by cutting in half
function linearSort(list, item) {
	let index = -1;
	list.forEach((listItem, index) => {
		if (listItem === item) {
			index = index;
		}
	})
	return index;
}
// console.log(linearSort([2, 6, 7, 90, 103], 90))


function binarySearch(list, item) {
	let min = 0;
	let max = list.length - 1;
	let guess;

	while (min <= max) {
		guess = Math.floor((min + max)/ 2);
		console.log('guess: ', guess);
		if (list[guess] === item) {
			return guess;
		} else if (list[guess] < item) {
			min = guess + 1;
		} else {
			max = guess - 1;
		}
	}
	return -1;
}
// console.log('binary: ')
// console.log(binarySearch([2, 6, 7, 90, 103], 91))


/**		naive sorts - quadratic */
// n(log(n));

/** bubble sort compares adjacent -> loop through array, compare adjacent index, swapping greater values to the ends */
// also insertion sort, selection sort, mergesort, quicksort

// merge sort: break elements to sublists
// two pointers - look at two different index (both potentially look at 0 index of both arrays

/**
 * merge(Left, Right)
 * [3, 27] [9, 10]
 * // initialize empty array
 * compare 0 index of left and right array
 * [3, 9]
 * push lower value to empty array
 * shift array w/ lower value
 * repeat until both sub arrays are empty
 * is 10 less than 27?
 * [10, 27]
 */

// O(n * log(n));

/** bubbler sort */

// const bubbler = (arr) => {
// 	console.log(arr)
// for ( let i = 0; i < arr.length; i++ ) {
// 	let swap = false;
// 	// console.log(arr)
// 	for ( let j = 0; j < arr.length - 1; j++ ) {
// 		if (arr[j] > arr[j + 1]) {
// 			swap = true;
// 			let temp = arr[j];
// 			arr[j] = arr[j + 1];
// 			arr[j + 1] = temp;
// 			console.log(`indices: ${i}, ${j}, ${j + 1}, values: ${`${arr[j]}, ${arr[j + 1]}`}, swap? ${swap}`)
// 		} else {
// 			console.log(`indices: ${i}, ${j}, ${j + 1}, values: ${`${arr[j]}, ${arr[j + 1]}`}, swap? ${swap}`)
// 		}
// 		console.log(arr);
// 		swap = false;
// 	}
// }

// }
// console.log(bubbler([19, 3, 2, 1, 18, 11, 35, 17]))

// refactor bubbler
const bubbler = (arr) => {
	for ( let i = 0; i < arr.length; i++ ) {
		for ( let j = 0; j < arr.length - 1; j++ ) {
			if ( arr[j] > arr[j + 1] ) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	return arr;
}
// console.log(bubbler([19, 3, 2, 1, 18, 11, 35, 17]))

function mergeSort(list) {
	if (list.length === 1) return list;
let mid = Math.floor(list.length / 2);
	let left = list.slice(0, mid);
	let right = list.slice(mid)
	// console.log(mid, left, right)
	const sortedL = mergeSort(left);
	const sortedR = mergeSort(right);
	return merge(sortedL, sortedR)	
}
// console.log(mergeSort([7, 6, 12, 1, 81, 93]))
function merge(left, right) {
	const result = [];
	let indexLeft = 0;
	let indexRight = 0;

	while ( indexLeft < left.length && indexRight < right.length) {
		if ( left[indexLeft] < right[indexRight]) {
			result.push(left[indexLeft]);
			indexLeft++;
		} else {
			result.push(right[indexRight])
			indexRight++;
		}
	}
	 return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}
// console.log(merge([ 19, 3, 2, 1 ], [ 13, 18, 11, 35, 17 ]))

console.log(mergeSort([19, 3, 2, 1, 13, 18, 11, 35, 17]));

/**	Greedy Approach */

// Write a function, makeChange, that returns an integer that represents the least number of coins that add up to an amount where the amount is always divisible by 5.
// iterative
// function makeChange(coins, change) {
	function makeChange(coins, amount) {
		// 	coins = coins.sort((a, b) => a - b);
		coins.sort((a, b) => b - a);
		// 	let total = 0;
		let coinTotal = 0;
		// 	let i = 0;
		let i = 0;
		// 	while (change > 0) {
			while (amount > 0) {
			//  if (coins[i] <= change) {
				if (coins[i] <= amount) {
				// total++;
					amount -= coins[i];
				// change -= coins[i];
					coinTotal++;
				} else {
					i++;
					//i++;
				}
			}
			return coinTotal;
		// 	return total;
		
}
	

// coin values: 5, 10, 25
console.log(makeChange([10, 5, 25], 35));
// input amount: 40 , output # of coins: 3 (25, 10, 5)
// input amount: 35, output # of coins: 2 (25, 10) 


/** BROKEN  */
const recursiveChange = (amount) => {
	const coins = {};
	return (() => {

		if (amount === 0) return coins;
		if ( amount - 25 >= 0) {
			amount -= 25;
			if (!coins[twentyFive]) {
				coins[twentyFive] = 1;
			} else { coins[twentyFive] += 1}
			return recursiveChange(amount, coins);
		} else if ( amount - 10 >= 0) {
			amount -= 10;
			if (!coins[ten]) {
				coins[ten] = 1;
			} else { coins[twentyFive] += 1}
			return recursiveChange(amount, coins);
		} else {
			amount -= 5;
			if (!coins[five]) {
				coins[five] = 1;
			} else { coins[five] += 1}
			return recursiveChange(amount, coins);
		}
	})
	console.log(Object.values(coins));
}

// console.log(recursiveChange(40))
// input amount: 40 , output # of coins: 3 (25, 10, 5)

// input amount: 35, output # of coins: 2 (25, 10) 



/** greedy approach breaks down 
 * 
 * It can seem correct, but also hard to prove that it's correct.
 * Greedy you need to ask, "is this locally optimal solution also the global optimal solution."
 * 
 * Bianca says: go with a brute force solution to start
 * Calculate every single combo possible and keep track of the minimum # of points
 * 
 * 
*/

// depth of recursion for a decision tree is the number of decisions that must be made to find the solution.

const coins = [10, 6, 1];

const makeChange = (value, i) => {	// 12
	if (value === 0) return 0;
	let minCoins;
	coins.forEach((coin) => { 	
		if ( value - coin >= 0) {  
			let currMinCoin = makeChange( value - coin);
			if ( minCoins === undefined || currMinCoin < minCoins) {
				minCoins = currMinCoins;
			}
		}
	});
	return minCoins + 1;
}

/** Dynamic Programming	 */

// with the makeChange fx we have a lot of repeated calcs
// dynamic programming says, break it into sub problems which can be cached
// DP gets its name from people trying to convince a government grant agency to give them more money.
// but just think of it as caching -> we cache to recalculate something
// cache values to avoid repeated calculations


// anti patterns --> type something, hit play, change something, hit play, go on, etc


/**
 // brute force(?) w/ memoization and recursion 
 const cache = {};
 const coins = [10, 6, 1];

 const makeChange = (c) => {
	 // return the value if it's in the cache
	 if ( cache[c] ) return cache[c];

	 let minCoins = -1;

	 // find the best coin
	 coins.forEach( coin => {
		 if ( c - coin >= 0 ) {
			 let currMinCoins = makeChange(c - coin);
			 if ( minCoins === -1 || currMinCoins < minCoins ) {
				 minCoins = currMinCoins;
			 }
		 }
	 })
	 // save the value into the cache
	 cache[c] = minCoins - 1;
	 return cache[c];
 }

 console.log(makeChange(12));
 */













