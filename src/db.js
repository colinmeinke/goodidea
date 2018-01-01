import idb from 'idb'

const dbName = 'goodidea'
const dbVersion = 2
const ideasStoreName = 'ideas'
const criteriaStoreName = 'criteria'

const init = dbUpgrade => {
  let ideasStore
  let criteriaStore

  switch (dbUpgrade.oldVersion) {
    case 0:
      ideasStore = dbUpgrade.createObjectStore(ideasStoreName, {
        keyPath: 'id'
      })

      ideasStore.createIndex('created', 'created')
    case 1:
      criteriaStore = dbUpgrade.createObjectStore(criteriaStoreName, {
        keyPath: 'id'
      })

      ideasStore = ideasStore || dbUpgrade.transaction.objectStore(ideasStoreName)

      criteriaStore.createIndex('weight', 'weight')

      ideasStore.createIndex('score', 'score')
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

const criteriaGet = db => {
  const tx = db.transaction(criteriaStoreName)
  const criteriaStore = tx.objectStore(criteriaStoreName)
  const weightIndex = criteriaStore.index('weight')
  return weightIndex.getAll()
}

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

const ideasGet = db => {
  const tx = db.transaction(ideasStoreName)
  const ideasStore = tx.objectStore(ideasStoreName)
  const createdIndex = ideasStore.index('created')
  return createdIndex.getAll()
}

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
