class HashMap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = 0;
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
  // Adds key: value pair to hash table, at appropriate bucket idx
  set(key, value) {
    // Turns user input to valid hash table idx
    let idx = this.hash(key);
    let current = this.hashTable[idx];
    if (typeof key !== 'string') {
      return 'Please enter valid string type key.';
   }  else if (current === undefined) {
      this.hashTable[idx] = {key: key, data: value, next: null};
      // Increase filled bucket count
      this.buckets++;
    } else { // If hash table bucket is not empty
      while (current !== null) {
        if (current.key === key) {
          current.data = value;
        } else if (current.next === null) { // If next link is last
          // Set lists head to be current variable and set it's pointer to current list's head
          current.next = {key: key, data: value, next: null};
        }
        current = current.next;
      }
    }
    // If loadFactor is exceeded increase capacity by two
    if (this.loadFactor <= this.buckets / this.capacity) {
      this.capacity *= 2;
    }
    return this.hashTable;
  }
  get(key) {
    let idx = this.hash(key);
    let result = [];
    while (this.hashTable[idx] !== null) {
      if (this.hashTable[idx].key === key) {
        result.push(this.hashTable[idx].data);
      }
      this.hashTable[idx] = this.hashTable[idx].next;
    }
    if (result == false) {
      return null;
    }
    return result;
  }
}

let test = new HashMap();

test.set('0', 'Doggy');
test.set('1', 'Kitty');
test.set('0', 'Cat');
test.set('0', 'mouse');
test.set('12', 'elephant');
test.set('23', 'egg');
test.set('34', 'boy');

console.log(test.buckets);

