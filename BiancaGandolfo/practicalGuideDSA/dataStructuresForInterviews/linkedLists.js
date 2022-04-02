class LinkedList {
	constructor(value) {
		// es6 syntax value:value is the same as value in this case (if key  === value, write it once) 
		this.head = {value, next: null};
		this.tail = this.head;
	}

	// head: {value: 1, next: {3}}
	// tail: {value: 1, next: {3}}

	insert(value) {
		// update tail as needed
		// don't need to update head (except for initialization)
		const node = {value, next: null};
		this.tail.next = node;
		this.tail = node;
		
	}

	remove(value) {
		if(this.isEmpty()) {
			return undefined;
		}
		
		let prevNode = null;
		let currNode = this.head;

		while(currNode) {
			if (currNode.value === value) {
				break;
			}
			prevNode = currNode;
			currNode = currNode.next;
		}

		if (currNode === null) {
			return undefined;
		}

		if (this.head === currNode) {
			this.head = currNode.next;
		} else {
			previousNode.next = currNode.next;
		}

		this.length--;
		return currNode;

	}

	removeTail() { 
		// loop to find node before tail
		// node.next === this.tail
		let currentNode = this.head;
		// while loop: loop until these two values are not the same, at which we've found the last ( it will be null because there's no value/node for it to point to in its tail property )
		while(currentNode.next !== this.tail) {
			currentNode = currentNode.next;
		}
		currentNode.next = null;
		this.tail = currentNode;
	}

	// contains(contain) {
	// 	console.log(contain)
	// 	let currentNode = this.head;
	// 	let check = currentNode.value;
	// 	while (check !== null && currentNode.value !== contain) {
	// 		currentNode = currentNode.next;
	// 	}
	// 	return currentNode.value === contain;
	// 	// while (currentNode) {
	// 	// 	if(currentNode.value === contain) {
	// 	// 		return currentNode;
	// 	// 	} else if (currentNode.next === null) {
	// 	// 		return false;
	// 	// 	}
	// 	// 	currentNode = currentNode.next;
	// 	// }
	// 	// return !!currentNode.next;
	// 	// return !!currentNode.contain
	// }



	// /** -*- */
	// contains(head, value) {
	// 	// head is head node of list
	// 	// value is value to search for

	// 	// item is either in the LL or not (returns boolean)
	// 	n = head
	// 	while n !== 0 and n.value !== value
	// 		n = n.next
	// 		// end while
	// 		if (n === 0) return false;
	// 		return true
	// }
// THIS ONE!
	// contains(val) {
	// 	if (!this.head) {
	// 		return null;
	// 	}
	// 	let currentNode = this.head;
	// 	while (currentNode) {
	// 		if (!currentNode.next  || currentNode.value === null) {}
	// 			if (currentNode.value !== val) {
	// 				currentNode = currentNode.next;
	// 		} else if ( currentNode.value === val) {
	// 			return true;
	// 		}
	// 	} 

	// 	return false;
	// }


	contains(val) {
		if (!this.head) {
			return null;
		}
		let currentNode = this.head;
		
		while (currentNode) {
			// if (!currentNode.next  || currentNode.value === null) { return false };
				
			if (currentNode.value !== val) {
					currentNode = currentNode.next;
				} else if (currentNode.value === val) {
					return true;
				}
			}
			return false;
	} 





	/** -*- */

	isHead(node) {
		return node === this.head;
	}

	isTail(node) {
		return node === this.tail;
	}

	isEmpty() {
		return !!this.length === 0;
	}
}



const myList = new LinkedList(1);
// console.log(myList);
// how should I initiate? with a value or as an empty list?

// {	
// 	// head, not _head because it needs to accessible
// 	head: { value: 1, next: {2} },
// 	tail: { value: 1, next: null }
// }

/**
 * {
 * head: { value: 1, next: null }
 * tail: { value: 1, next: null }
 * }
 */
myList.insert(2)

/**
 * {
 * head: { value: 1, next: { value: 2, next: null }} // this next is this tail
 * tail: { value: 2, next: null }
 * }
 */
 

myList.insert(3)

/**
 * {
 * head: { value: 1, next: { value: 2, next: {value: 3, next:null }}}
 * tail: { value: 3, next: null }
 * }
 */

// console.log(myList);
// console.log('remove tail: ')
// myList.removeTail();
// console.log(myList);


	// we want to reassign the tail, give that tail's next a null value
// {
// 	head: {value: 1, next: {value: 2, next: null}}
// 	tail: {value: 2, next: null}
// }

// ask interviewer: is this what you had in mind? i assumed we started off with a singly linked list because: we're not really presented with a problem a doubly linked list would solve and that would just take up twice the space.


// core of her debug strategy is to figure out ahead of time what she expects her code output to be, and if it's not meeting the expectation then go back and figure out what went wrong.


// writing a function outside a class has (situational) benefits
// constant time easy way alternative
// myList.removeNext(prevNode) -> it just moves the pointer from prevNode.next
/**
 * function removeNext(list, prevNode) {
 * 
 * }
 */

myList.insert(5);
// console.log(myList.contains(98));
// console.log(myList.contains(5));

// console.log(myList)




const CircularLinkedListExample = 'https://github.com/ShubhangiRaj/LinkedLists/blob/master/CircularLinkedList.js';

class Node {
	constructor(data, next = null) {
		this.data = data,
		this.next = next
	}
}

class CircularLinkedList{
	constructor() {
		this.head = null;
	}
	insertAtFirst(data) {
		let newNode = new Node(data);
	
		if (!this.head) {
			newNode.next = newNode;
			this.head = newNode; 
		}
	
		let curr = this.head;
		while ( curr.next !== this.head ) {
			curr = curr.next;
		}
		curr.next = newNode;
		newNode.next = this.head;
		this.head = newNode;
	}
	
	insertAtLast(data) {
		let newNode = new Node(data);
	
		if (!this.head) {
			newNode.next = newNode;
			this.head = newNode;
		}

		let curr = this.head;
		while(curr.next !== this.head) {
			curr = curr.next;
		}
		curr.next = newNode;
		newNode.next = this.head;
	}

	print() {
		if(!this.head){
			return;
		}

		let curr = this.head;
		while(curr.next !== this.head) {
			console.log(curr.data);
			curr = curr.next;
		}
		console.log(curr.data);
	}

	count() {
		if (!this.head) {
			return;
		}
		let curr = this.head;
		let count = 0; // doesn't include head
		let countWithHead = count + 1;
		while (curr.next !== this.head) {
			curr = curr.next;
			count++;
		}
		// return count;
		return `count: ${count}, with head: ${countWithHead}`
	}

	removeFirst(){
		if (!this.head) {
			return;
		}

		let curr = this.head;
		while (curr.next !== this.head ) {
			curr = curr.next;			
		}
		curr.next = this.head.next;
		this.head = this.head.next;
	
		return this.head;
	}
	
	removeLast() {
		if ( !this.head) {
			return;
		}
		let curr = this.head.next;
		let prev = null;
		while ( curr.next !== this.head ) {
			prev = curr;
			curr = curr.next;
		}
		prev.next = this.head;
	
		return this.head;
	}
}




let circle = new CircularLinkedList();
console.log(`first`);
circle.insertAtFirst(4);
circle.insertAtFirst(3);
console.log(`count: ${circle.count()}`)
circle.insertAtFirst(55);
circle.insertAtFirst(37);
circle.insertAtLast(109);
console.log(`count: ${circle.count()}`)
// circle.count();
circle.print();

console.log(`
second`);
circle.removeFirst();
circle.print();
circle.removeLast();
circle.print();
console.log(`count: ${circle.count()}`)