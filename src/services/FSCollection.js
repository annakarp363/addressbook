export default class FSCollection {
  /**
   * @constructor
   * @param db {firebase.firestore.Firestore}
   * @param name {string}
   */
  constructor(db, name) {
    this.collection = db.collection(name);
  }

  get Collection() {
    return this.collection;
  }

  /**
   * @param id {string}
   * @returns {Promise<{object}>}
   */
  getDoc = (id) => this.collection
    .doc(id)
    .get()
    .then((querySnapshot) => ({ id: querySnapshot.id, ...querySnapshot.data() }));

  /**
   * @param id {string}
   * @returns {Promise<void>}
   */
  deleteDoc = (id) => this.collection.doc(id).delete();

  /**
   * @param id {string}
   * @param updated {object}
   * @returns {Promise<void>}
   */
  editDoc = (id, updated) => this.collection.doc(id).set(updated);


  /**
   * @param document {object}
   * @returns {Promise<string | never>}
   */
  addDoc = (document) => this.collection
    .add(document)
    .then((querySnapshot) => querySnapshot.id);
}
