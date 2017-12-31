import idb from 'idb'

const dbName = 'goodidea'
const dbVersion = 1
const ideasStoreName = 'ideas'

const init = dbUpgrade => {
  switch (dbUpgrade.oldVersion) {
    case 0:
      const ideasStore = dbUpgrade.createObjectStore(ideasStoreName, {
        keyPath: 'id'
      })

      ideasStore.createIndex('created', 'created')
  }
}

const open = () => idb.open(dbName, dbVersion, init)

const ideaAdd = (db, idea) => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  ideasStore.put(idea)
  return tx.complete
}

const ideaDelete = (db, idea) => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  return ideasStore.delete(idea.id)
}

const ideasClear = db => {
  const tx = db.transaction(ideasStoreName, 'readwrite')
  const ideasStore = tx.objectStore(ideasStoreName)
  return ideasStore.clear()
}

const ideasGet = db => {
  const tx = db.transaction(ideasStoreName)
  const ideasStore = tx.objectStore(ideasStoreName)
  const createdIndex = ideasStore.index('created')
  return createdIndex.getAll()
}

export { open, ideaAdd, ideaDelete, ideasClear, ideasGet }
