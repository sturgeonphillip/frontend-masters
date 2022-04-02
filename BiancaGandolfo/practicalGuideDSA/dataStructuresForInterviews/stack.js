class Stack {
	constructor() {
		this._storage = {};
		this._length = 0;
	}

	// add new value at end of stack
	// @param {*} value - the value to push
	push(value) {
		// todo: add typechecking and check arguments
		this._storage[this._length] = value;
		this._length++;
	}

	// removes the value at the end of the stack and returns it
	// @return {*} the last and newest value in the stack
	pop() {
		// what if it's empty?
		if (this._length) {
			// lastVal stores/makes reference to the property that we'll delete
			const lastVal = this._storage[this._length - 1];
			// remove 
			this._storage[this.length - 1] = undefined;
			this._length--;
			return lastVal
		} 
	}


	// return value at end of the stack without removing it
	// @param{*} return the last and newest value in the stack
	peek() {
		if (this._length) {
			return this._storage[this.length - 1];
		}
	}
}


const myStack = new Stack();
// console.log(myStack)
myStack.push(2);
// console.log(myStack)
myStack.push(3);
// console.log(myStack)
myStack.peek();
// console.log(myStack)
myStack.pop();
// console.log(myStack)
