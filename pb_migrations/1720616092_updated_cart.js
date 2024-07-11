/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd9yy17va0i45hl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ckc8nmih",
    "name": "size",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd9yy17va0i45hl")

  // remove
  collection.schema.removeField("ckc8nmih")

  return dao.saveCollection(collection)
})
