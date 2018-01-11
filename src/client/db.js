import idb from 'idb'
import { sortIdeas, sortCriterias } from '../common/helpers'

const dbName = 'goodidea'
const dbVersion = 2
const ideasStoreName = 'ideas'
const criteriaStoreName = 'criteria'

const init = dbUpgrade => {
  switch (dbUpgrade.oldVersion) {
    case 0:
      const ideasStore = dbUpgrade.createObjectStore(ideasStoreName, {
        keyPath: 'id'
      })

      ideasStore.createIndex('created', 'created')
    case 1:
      const criteriaStore = dbUpgrade.createObjectStore(criteriaStoreName, {
        keyPath: 'id'
      })

      criteriaStore.createIndex('weight', 'weight')
  }
}

const open = () => idb.open(dbName, dbVersion, init)

const criteriaAdd = (db, criteria) => {
  const tx = db.transaction(criteriaStoreName, 'readwrite')
  const criteriaStore = tx.objectStore(criteriaStoreName)
  criteriaStore.put(criteria)
  return tx.complete
}

const criteriaDelete = (db, criteria) => {
  const tx = db.transaction(criteriaStoreName, 'readwrite')
  const criteriaStore = tx.objectStore(criteriaStoreName)
  criteriaStore.delete(criteria.id)
  return tx.complete
}

const criteriaClear = db => {
  const tx = db.transaction(criteriaStoreName, 'readwrite')
  const criteriaStore = tx.objectStore(criteriaStoreName)
  criteriaStore.clear()
  return tx.complete
}

const criteriaGet = db => new Promise((resolve, reject) => {
  const tx = db.transaction(criteriaStoreName)
  const criteriaStore = tx.objectStore(criteriaStoreName)

  criteriaStore.getAll()
    .then(criterias => resolve(criterias.sort(sortCriterias)))
    .catch(reject)
})

const ideaAdd = (db, idea) => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  ideasStore.put(idea)
  return tx.complete
}

const ideaDelete = (db, idea) => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  ideasStore.delete(idea.id)
  return tx.complete
}

const ideasClear = db => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  ideasStore.clear()
  return tx.complete
}

const ideasGet = db => new Promise((resolve, reject) => {
  const tx = db.transaction(ideasStoreName)
  const ideasStore = tx.objectStore(ideasStoreName)

  ideasStore.getAll()
    .then(ideas => resolve(ideas.sort(sortIdeas)))
    .catch(reject)
})

export {
  open,
  criteriaAdd,
  criteriaDelete,
  criteriaClear,
  criteriaGet,
  ideaAdd,
  ideaDelete,
  ideasClear,
  ideasGet
}
