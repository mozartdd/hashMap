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
  // Returns value assigned to key
  get(key) {
    let idx = this.hash(key);
    let current = this.hashTable[idx];
    
    // If bucket is empty return null
    if (current === undefined) {
      return null;
    }
    // While hasn't reached end of linked list of bucket
    while (current !== null) {
      if (current.key === key) {
        return current.data;
      }
      current = current.next;
    }
    return null;
  }
  // Takes key as argument and return true or false based on if key is in hash map
  has(key) {
    let idx = this.hash(key);
    let current = this.hashTable[idx];

    if (current === undefined) {
      return null;
    }
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  // Removes value based on key
  remove(key) {
    let idx = this.hash(key);
    let current = this.hashTable[idx];
    let previous = null;

    if (current === undefined) {
      return false;
    }
    while (current !== null) {
      if (current.key === key) {
        if (previous === null) {
          this.hashTable[idx] = current.next;
          if (this.hashTable[idx] === null) {
            this.buckets--;
          }
          return true;
        } else {
          previous.next = current.next
          if (this.hashTable[idx] === null) {
            this.buckets--;
          }
          return true;
        }
      }
      previous = current;
      current = current.next;
    }
    return false;
  }
}

let test = new HashMap();

test.set('0', 'Doggy');
test.set('1', 'Kitty');


console.log(test.remove('1'));
console.log(test.hashTable);

