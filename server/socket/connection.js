/**
 * Singleton class for socket connection
 */

let instance = null;

class Cache{  
    constructor() {
        if(!instance){
              instance = this;
        }

        // to test whether we have singleton or not
        this.time = new Date()

        return instance;
      }
}