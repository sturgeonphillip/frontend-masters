/* don't be afraid to debug -- show the interviewer that you know what you expected and can comfortably talk through the error
what do you think is causing this?
*/

// spend an hour struggling before reviewing an answer

// JS doesn't have many built in data structures
// at the core, it's all objects/arrays in a structured format

/** --- Stacks/Queues --- */
/*
if asked about time complexity of a queue shift/unshift, it will do work for each item in the s/q. grows in a linear fashion - don't really multiply
S/Q super fast, optimized in modern browser
( no manual shift of each element required)

common interview question is to implement a back button/undo an action

/**
 * how she started learning DSA
 * MOOC - college classes on DSA
 * https://www.mooc.org/
 * cracking the coding interview
 * https://www.crackingthecodinginterview.com/
 * interviewBit
 * https://www.interviewbit.com/
 * geeksforgeeks
 * https://www.geeksforgeeks.org/
 * leetcode
 * https://leetcode.com/
 * ^^ went through all the problems for the data structure she wanted to learn
 * 
 * 
 * 
 * // --=-- Stack and Queue Questions --=-- //
 * 1. Use an array to implement 3 stacks
 *   prompt: https://replit.com/@bgando/k-stacks-one-array-prompt
 *   solution: https://replit.com/@bgando/k-stacks-one-array-solution
 *    naive:
 *      adapt the stack class (with a constructor),
 *      divide your array in 3 sizes
 *    better:
 *      hold pointers to elements with an interleaving approach(a)
 *        array[0] - first stack's 1st element
 *        array[1] - second stack's 1st element
 *        array[2] - third stack's 1st element
 *        array[3] - first stack's 2nd element
 *        array[4] - second stack's 2nd element and on and on
 *      a. interleaving approach is a theme for ordered data structures.
 *          It combines multiple lists one by one in order.
 
 * 
 * 
 * 2. Implement a getMin() or getMax() method on your stack
 *  prompt: https://replit.com/@bgando/min-stack-prompt
 *  solution: https://replit.com/@bgando/min-stack-solution
 *    - to do in constant time, it requires an auxiliary data structure
 *    like a stack. can also just keep track of min inside of the node.
 *    - basically any time you push a value into your stack, you want
 *    to  push to your min stack that will always be the minimum.
 *    - not space efficient but will return the min.
 *    every time you pop off or peek the min stack it'll be constant time.
 * 
 * 
 * 3. Create a queue using 2 stacks
 * prompt: https://replit.com/@bgando/queue-two-stacks-prompt
 * solution: https://replit.com/@bgando/queue-two-stacks-solution
 *  - queue and unqueue and shift over.
 *  - if you're enqueueing, enqueueing, enqueueing, you have 3 items in your queue. 
 *  - but if you need to take an item off the bottom you're stuck.
 *  - pop and push to other stack to get to the bottom and remove that first item.
 * 
 * 
 * 4. Sort a stack with the min values in order, on top.
 * prompt: https://replit.com/@bgando/sort-stack-prompt
 * solution: https://replit.com/@bgando/sort-stack-solution
 *    - Use another stack as a buffer
 *    - simplified version of Tower of Hamoi.
 *    - need to rearrange the discs/levels to make it a perfect pyramid.
 * 
 * 
 * 5. Write a function that returns true if a string of brackets is valid/balanced
 * prompt: https://replit.com/@bgando/bracket-validator-prompt
 * solution: https://replit.com/@bgando/bracket-validator-solution
 *    - two stacks, push opening brackets until you find a closing one.
 *    - once you find a closing bracket, make sure that it matches the opening one.
 *    - if a bracket opens, you push. if it closes and it matches the opening, you pop.
 *    - if the closing doesn't match, then the string of brackets are not valid.
*/




// --=-- Linked List Questions --=-- //
/**
 * 1. Delete the following:
 *  i. a node in the middle of the linked list
 *      prompt: https://replit.com/@bgando/ll-delete-mid-node-prompt
 *      solution: https://www.geeksforgeeks.org/delete-middle-of-linked-list/
 *      - how do you find the middle of the linked list?
 *      - get the length of the linked list as you add nodes, keep track of length.
 *      - OR, loop through it with the while loop shown (earlier).
 *        keep track of length, divide by two, loop again to get to the middle.
 *  ii. a node with only a variable pointing at that node
 *      prompt: https://replit.com/@bgando/ll-delete-node-no-pointers-prompt
 *      solution: https://www.geeksforgeeks.org/given-only-a-pointer-to-a-node-to-be-deleted-in-a-singly-linked-list-how-do-you-delete-it/
 *  iii. a duplicate
 *       prompt: https://replit.com/@bgando/ll-delete-dupe-node-prompt
 *       solution: https://www.geeksforgeeks.org/remove-duplicates-from-an-unsorted-linked-list/
 *        - use an auxiliary data structure like a hash table (rule of thumb)
 *        - if it's already saved in a hash table, you've already seen it
 *        - could also sort it, but LL are hard to sort (but it's possible)
 *        -* also ask if it's already sorted (sorting on average is O(n log n))
 *        
 * 
 * 2. Partition a linked list around a value;
 * * prompt: https://replit.com/@bgando/ll-partition-prompt
 * solution: https://replit.com/@bgando/ll-partition-solution
 * 
 * 
 * 3. Write a function for reversing a linked list. Can you do it in place?
 * * prompt: https://replit.com/@bgando/ll-reverse-prompt
 * solution: https://replit.com/@bgando/ll-reverse-solution
 *    - technique is similar to deleting the second to last node
 *    - get the one before each one
 *    - or get two pointers and swap
 *    - one is a slow pointer, one is fast (twice as fast as slow)
 * 
 * 
 * 4. Check if a linked list contains a cycle
 * * prompt: https://replit.com/@bgando/ll-cycle-detect-prompt
 * solution: https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/
 * (classic problems for two pointer linked list)
 *  start pointers: slow moves 1, fast moves 2
 *    if slow and fast pointer are ever in the same node, you have a cycle
 * 
 * 
 * 5. Find the Kth to the last node.
 * (classic problems for two pointer linked list)
 * * prompt: https://replit.com/@bgando/ll-kth-to-last-node-prompt
 * solution: https://replit.com/@bgando/ll-kth-to-last-node-solution
 * you don't know kth to last:
 *  assuming you don't already know the length, have first pointer be at head. second pointer is head + k. loop both at same pace, but when 2nd pointer gets to last one, that means the first pointer is at the kth node.
 */




/** --- Hash Table --- */
/**
 * All about counting occurences, deleting duplicates, finding unique values, etc. Bianca thinks about them in terms of optimization steps. When done with a solution or starts thinking about time complexity. Hash tables are great for increasing speed on algorithms.
 * Consider when to use maps and sets.
 * 1. Count the number of occurrences of all characters or words in a body of text or string.
 * prompt: https://replit.com/@bgando/ht-unique-string-prompt
 * solution: https://www.geeksforgeeks.org/determine-string-unique-characters/
 * 
 * 
 * 2. Delete duplicates in a list.
 * prompt: https://replit.com/@bgando/ht-remove-dups-prompt
 * solution: https://www.geeksforgeeks.org/remove-duplicates-from-a-given-string/
 * 
 * 
 * 3. Find a unique value in a list.
 * prompt: https://replit.com/@bgando/ht-find-unique-list-prompt
 * solution: https://www.geeksforgeeks.org/non-repeating-element/
 * 
 * 
 * 4. Find if two integers in a list add up to k (twoSum)
 * prompt: https://replit.com/@bgando/ht-two-items-sum
 * solution: https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/
 * 
 */


/** --- Array & String --- */
/**
 * 1. Rotate a matrix, string, or an array
 * prompt: https://replit.com/@bgando/rotate-array-prompt
 * solution: https://www.geeksforgeeks.org/array-rotation/
 * 
 * 
 * 2. Given an m x n boolean matrix, if an element is 0, set its entire row and column to 0
 * prompt: https://replit.com/@bgando/boolean-matrix-prompt
 * solution: https://www.geeksforgeeks.org/a-boolean-matrix-question/
 *    example:
 *        [1, 1, 1, 1]
 *        [1, 1, 1, 1]
 *        [0, 1, 1, 1]
 *    (similar to games like chess, checkers, tic-tac-toe)
 *    if you had a rook at 3 line of matrix:
 *      to represent where you could not move another piece on the chess board without being killed by the rook, we would 0 it out.
 *      this would make the example:
 *        [0, 1, 1, 1]
 *        [0, 1, 1, 1]
 *        [0, 0, 0, 0]
 * with prompts that sound like gameboards, start thinking 2D matrices.
 * then, can you simplify or distill it down to 1 array?
 * 
 * 
 * 3. Search for a value
 * prompt: https://replit.com/@bgando/search-for-value-prompt
 * solution: https://www.geeksforgeeks.org/linear-search/
 * loop through and find it
 * sort it and do a binary search
 * 
 * 4. Write a function that encodes a string by turning all spaces into `%20`
 * prompt: https://www.geeksforgeeks.org/urlify-given-string-replace-spaces/
 * solution: same as prompt
 * - often helpful it you can split into an array
 * - edge cases: punctuation, other language characters, etc
 * 
 * 5. Merge two sorted lists into one list.
 * prompt:
 * solution: 
 * - subroutine of merge sort
 * - use two pointers in linear time
 * - go through and compare conditions, swap them
 * example:
 * [2, 5, 6]
 * [1, 4, 7]
 * compare which less:
 * 1 is less than 2   [ 1 ]
 * 2 is less than 4   [ 1, 2 ]
 * 4 is less than 5   [ 1, 2, 4 ]
 * 5 is less than 7   [ 1, 2, 4, 5 ]
 * 6 is less than 7   [ 1, 2, 4, 5, 6 ]
 * 7                  [ 1, 2, 4, 5, 6, 7 ]
 * 
 * 
 * 
 * 
 */

// be sure to try permutations, anagrams, substrings, dynamic programming problems

// other considerations to discuss with the interviewer:
// in-place / side effects
// preserving original order
// Set vs Map vs Object
// lengths of 0 and 1
// off-by-ones
// optimizations vs readability
// what additional information can you ask for?


// addtional resources:
// Front End Masters: Brian Holt's CS in 5 hrs, Interview Prep Course
// https://github.com/jwasham/coding-interview-university
// interviewing.io && Pramp




























































































































































































































































































































































































	ze]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
}



var myQ = new Queue();
myQ.enqueue('zero');
myQ.enqueue('one');






/** --- Linked Lists --- */
/*
shallow copy only copies top level, deep copy recursively copies each child down to lowest level.

LL are sequential DS which has constraints for how it can be used.
- dynamic size
- js has built in, but not all languages do
- we don't need to worry about deleting an item in the middle because each item simply points to the next one (still need to loop to search)

if we change a value in a node nothing breaks
you can simply redirect the pointers to change the 
node:
value, next, previous

const singlylinkedlist = {
  head: {
    value: 1
    next: {
      value: 2
      next: {
        value: 3
        next: null
      }
    }
  }
}

doubly linked pseudo
{
	value: 1,
	next: {POINTER},
	PREVIOUS: {POINTER}
}



*/

/** --- Hash Tables --- */
/**
 * constant time
 * hash table is fast for looking up information
 * not sorted, if you need something with order, don't use this
 * depending on interface, keys can be strings
 * with new es6 data structures, maps and sets allow your keys to be functions and objects as keys --> makes your hash table much more flexible
 * implementation: hash table is a map, is a set
 * 
 * 
 * constant time lookup, just points to a specific value
 * hashing function takes a key and gives the same output every single time
 * 
 * range is size of hash table 
 * when hash table becomes 50%, double it --> initial values are reredistributed across the new keys
 * By doubling the size, we can better manage the table for collisions
 * 
 * turn string into number in a specified range
 * you can loop through the string, adding each unicode value of the characters and mod (modulous) it to fit the range of the hash table
 * 
 * hash table is reliable because it is always saved to the same place and can be directly referenced to by its key
 * 
 *  */

/** --- Sets and Maps --- */
/**
 * hash tables in real life (under the hood)
 * Maps and Sets are es6 implementations of hash tables
 * Set doesn't save value, just property name
 * key could be string, function, object, anything
 * 
 * Map is a combo of a set and an object because you still have a key:val pair, and any data type can be stored 
 * 
 * use different methods --> .has, .set, etc
 */


/** --- Array/String --- */
/**
 * strings are immutable
 * think of strings like arrays of characters
 * when you change a string, you're copying to a new string
 * they take up more space, so constant space isn't possible
 * 
 * Arrays
 * good for lookup by keys - searching in constant time
 * fast appends, but slow deletes
 * 
 * 
 */