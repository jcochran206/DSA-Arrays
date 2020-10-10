const Memory = require('./memory');
console.log(Memory);

const memory = new Memory();

class Array {
    // initial array and assigns size currently empty 
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }
    // push 
    // size_ratio is equal to 3
    push(value) {
        // checks if length is greater then capacity / memory size needs then multiples based on length + 1 X ratio size 
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        // sets the length of the array and increses by one based on value
        memory.set(this.ptr + this.length, value);
        this.length++;
    }
    // resize the size of the array allocating old
    _resize(size) {
        const oldPtr = this.ptr; // take pointer and set
        this.ptr = memory.allocate(size); // taking resized based on push above 3 times size
        if (this.ptr === null) { 
            throw new Error('Out of memory');
        } 
        memory.copy(this.ptr, oldPtr, this.length); //copy pointer, oldptr, and length
        memory.free(oldPtr); // free memory of old memory space 
        this._capacity = size; // capacity is now changed to new size
    }
    // get obtain index provided 
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error'); //check index is in the array
        }
        return memory.get(this.ptr + index);// moves to specific index based on pointer(this.length+1 and )
    }
    //pop 
    pop() {
        if (this.length == 0) { // checks array length 
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1); //reviews the pointer removing last items
        this.length--;
        return value; //returns the value after
    }
    // insert 
    insert(index, value) { //inserts the value into array 
        if (index < 0 || index >= this.length) { //checks if index is out of bounds
            throw new Error('Index error'); // return error
        }

        if (this.length >= this._capacity) { // resizes array if to small 
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        // copy the memory and adding the index point then adding 1 and 
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }
    //remove 
    remove(index) {
        if (index < 0 || index >= this.length) { //checks index in bounds of memory
            throw new Error('Index error');
        }
        // copy into memory and remove index based on index 
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

class myArray {
    constructor(){
        this.length = 0;
        this.ptr = memory.allocate(this.length);
    }
    
    _resize(size){
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if(this.ptr === null){
            throw new Error('out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
    }

}

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(15);

    console.log(arr);

}

main();

