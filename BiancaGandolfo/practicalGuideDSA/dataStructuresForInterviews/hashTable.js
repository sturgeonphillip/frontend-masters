// https://replit.com/@bgando/hash-table-prompt#index.js

/** Class representing a Hash Table */

class HashTable {
  constructor(size) {
    this._storage = [];
    this._tableSize = size;
    this.inputSize = 0;
  }
  // if inputSize is 50% than tableSize, double the size of your tableSize
  /*
  * Inserts a new key-value pair
  * @param {string} key - the key associated with the value
  * @param {*} value - the value to insert
  */
  insert(key, value) {
    // key is hashed to size (0 to 25, for instance)
    const index = this._hash(key, this._tableSize);
    // if the index doesn't exist, initialize it
    if (!this._storage[index]) {
      this._storage[index] = [];
    }
    // TODO: loop through array and find if key was already inserted   
    this._storage[index].push([key, value]);
   
  }
  // without handling a collision you'll lose data when the new value overrides it (as oppose to adding it)


  /*
  * Deletes a key-value pair
  * @param {string} key - the key associated with the value
  * @return {*} value - the deleted value
  */
  remove(key) {
     
  }
  /*
  * Returns the value associated with a key
  * @param {string} key - the key to search for
  * @return {*} - the value associated with the key
  */
  retrieve(key) {
    const index = this._hash(key, this._tableSize);
    const arrayAtIndex = this._storage[index];

    if (arrayAtIndex) {
      for ( let i = 0; i < arrayAtIndex.length; i++) {
        const keyValueArray = arrayAtIndex[i];
        if (keyValueArray[0] === key) {
          return keyValueArray[1];
        }
      }
    }
  }  
  /*
  * Hashes string value into an integer that can be mapped to an array index
  * @param {string} str - the string to be hashed
  * @param {number} n - the size of the storage array
  * @return {number} - an integer between 0 and n
  */
  _hash(str, n) {
    let sum = 0;
    for (let i = 0; i < str.length; i++)
        sum += str.charCodeAt(i) * 3

    return sum % n;
  }
}

const myHT = new HashTable(25);


console.log(myHT)

myHT.insert('a', 1);
myHT.insert('b', 2);

// HashTable { _storage: [0, 0, 0, [[a'1'], ['b', 2]],0, 0, 0]}

console.log('values?')
console.log(myHT);

// things to think about: 
// hash functions require a size
// resizing
// collisions
// only option with constant time is that we need a numerical index for our array

// if we have two items with the same space ( collision ) -> create a tuple

// amortized analysis: a method for analyzing a given algorithm's complexity, or how much of a resource(especially time or memory), it takes to execute. The motivation is that looking at the worst-case run time can be too pessimistic.
// "Given that the worst case is so unlikely that it's not useful to think about it. So if we have a rare case in which we have a large quantity of key/values that are all in the same index, we'll be looping through. But this is a linear operation that is so rare."
