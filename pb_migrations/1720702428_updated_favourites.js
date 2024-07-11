/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zhy83cidaavi5va")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eqtvkgk6",
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
  const collection = dao.findCollectionByNameOrId("zhy83cidaavi5va")

  // remove
  collection.schema.removeField("eqtvkgk6")

  return dao.saveCollection(collection)
})
