export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.initialCapacity = capacity;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = 0;
    this.hashTable = [];
    this.tempArray = [];
  }
  // Repopulates all current hash nodes so they take space in new larger array
  #rePopulate() {
    for (let i = 0; i < this.capacity / 2; i++) {
      let curr = this.hashTable[i];
      // If i won't decrement buckets they will be incremented each set function call
      // and load factor would be reached before rePopulate function finish it's work
      if (curr !== undefined) {
        this.buckets--;
      }
      while (curr !== null & curr !== undefined) {
        this.set(curr.key, curr.data, this.tempArray);
        curr = curr.next;
      }
    }
  }
  // Has cypher algorithm
  hash(key) {
   let hashCode = 0;
   if (typeof key !== 'string') {
    throw new TypeError('Key must be a string');
   }
   const primeNumber = 31;
   for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i))  % this.capacity;;;
   }
   return hashCode;
  }
  // Adds key: value pair to hash table, at appropriate bucket idx
  set(key, value, arr = this.hashTable) {
    // Turns user input to valid hash table idx
    let idx = this.hash(key);
    let current = arr[idx];

    if (typeof key !== 'string') {
      return 'Please enter valid string type key.';
   }  else if (current === undefined) {
      arr[idx] = {key: key, data: value, next: null};
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
      this.#rePopulate();

      this.hashTable = this.tempArray;
      this.tempArray = [];
    }
    return arr;
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
  // Return number of stored keys in hash map
  length() {
    let keys = 0;
    
    for (let i = 0; i < this.capacity; i++) {
      let current = this.hashTable[i];
      while (current !== undefined && current !== null) {
        keys++;
        current = current.next;
      }
    }
    return keys;
  }
  // Removes all entries from hash table
  clear() {
    this.hashTable = [];
    this.buckets = 0;
    this.capacity = this.initialCapacity;
  }
  // Returns an array containing all the keys inside the hash map
  keys() {
    let container = [];

    for (let i = 0; i < this.capacity; i++) {
      let current = this.hashTable[i];
      while (current !== undefined && current !== null) {
        container.push(current.key);
        current = current.next
      }
    }
    return container;
  }
  // Returns an array containing all the values inside the hash map
  values() {
    let container = [];

    for (let i = 0; i < this.capacity; i++) {
      let current = this.hashTable[i];
      while (current !== undefined && current !== null) {
        container.push(current.data);
        current = current.next
      }
    }
    return container;
  }
  // Prints entire hash table data
  entries() {
    let result = '';
    for (let i = 0; i < this.capacity; i++) {
      let current = this.hashTable[i];
      result += `[${i}] `;
      while (current !== null && current !== undefined) {
        result += `[${current.data}] -> `;
        current = current.next;
      }
      result += 'null\n'
    }
    return result;
  }
}

