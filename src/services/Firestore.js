import * as firebase from 'firebase';
import FirestoreConfig from 'config/firestore';
import FSCollection from 'services/FSCollection';

let singleton = Symbol();
let singletonEnforcer = Symbol();

class Firestore {
  /**
   * @private
   * @param enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer)
      throw new Error('Instantiation failed: use Singleton.getInstance() instead of new.');
    firebase.initializeApp(FirestoreConfig);

    /**
     * @type {firebase.firestore.Firestore}
     */
    this.db = firebase.firestore();
  }

  /**
   * @returns {Firestore}
   * @constructor
   */
  static get Instance() {
    if (!this[singleton])
      this[singleton] = new Firestore(singletonEnforcer);
    return this[singleton];
  }

  /**
   * @param collectionName {string}
   * @returns {Promise<Array>}
   */
  getCollection = (collectionName) => new FSCollection(this.db, collectionName).Collection
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      return data
    });

  /**
   * @param collection {string} - collection name
   * @param id {string}
   * @returns {Promise<{object}>}
   */
  getDoc = (collection, id) => new FSCollection(this.db, collection).getDoc(id);

  /**
   * @param collection {string}
   * @param doc {object}
   * @returns {Promise<string>}
   */
  addDoc = (collection, doc) => new FSCollection(this.db, collection).addDoc(doc);

  /**
   * @param collection {string} - collection name
   * @param id {string}
   * @returns {Promise<{object}>}
   */
  deleteDoc = (collection, id) => new FSCollection(this.db, collection).deleteDoc(id);

  /**
   * @param collection {string} - collection name
   * @param id {string}
   * @param doc {object}
   * @returns {Promise<{object}>}
   */
  editDoc = (collection, id, doc) => new FSCollection(this.db, collection).editDoc(id, doc);
}

export default Firestore;
