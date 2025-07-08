class HashMap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.hashTable = [];
  }
  // Produces a hash key/idx based on user input
  hash(key) {
   let hashCode = 0;
   if (typeof key !== 'string') {
    return 'Please enter valid string type key.'
   }
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
   }
   return hashCode;
  }
  // Sets default key value to hash function's outcome
  set(key = this.hash(key), value) {
    let tempHome = [];

    if (this.hashTable[key] !== undefined) {
      tempHome[0] = this.hashTable[key];
      this.hashTable[key] = {data: value, next: tempHome[0]}
    } else {
      this.hashTable[key] = {data: value, next: null};
    }
    return this.hashTable[key];
  }
}

let test = new HashMap();

test.set('0', 'Doggy');
test.set('1', 'Kitty');
test.set('1', 'Frog');
test.set('1', 'Bee');

console.log(test.hashTable[1]);
