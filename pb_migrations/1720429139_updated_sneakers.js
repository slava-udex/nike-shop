/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("upy3fnjx55pqtxe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twtowig8",
    "name": "benefits",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zukyefas",
    "name": "productDetails",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("upy3fnjx55pqtxe")

  // remove
  collection.schema.removeField("twtowig8")

  // remove
  collection.schema.removeField("zukyefas")

  return dao.saveCollection(collection)
})
