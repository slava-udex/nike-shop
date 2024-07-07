/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("upy3fnjx55pqtxe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okgjgjps",
    "name": "colors",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "values": [
        "White",
        "Black",
        "Red",
        "Grey",
        "Brown",
        "Flat Pewter",
        "Light Bone"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nreddb9x",
    "name": "sizes",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 26,
      "values": [
        "7.0",
        "7.5",
        "8.0",
        "8.5",
        "9.0",
        "9.5",
        "10.0",
        "10.5",
        "11.0",
        "11.5",
        "12.0",
        "12.5",
        "13.0",
        "13.5",
        "14.0",
        "14.5",
        "15.0",
        "15.5",
        "16.0",
        "16.5",
        "17.0",
        "17.5",
        "18.0",
        "18.5",
        "19.0",
        "19.5",
        "20.0"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2znwjpz",
    "name": "sizesAvalaible",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 26,
      "values": [
        "7.0",
        "7.5",
        "8.0",
        "8.5",
        "9.0",
        "9.5",
        "10.0",
        "10.5",
        "11.0",
        "11.5",
        "12.0",
        "12.5",
        "13.0",
        "13.5",
        "14.0",
        "14.5",
        "15.0",
        "15.5",
        "16.0",
        "16.5",
        "17.0",
        "17.5",
        "18.0",
        "18.5",
        "19.0",
        "19.5",
        "20.0"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("upy3fnjx55pqtxe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okgjgjps",
    "name": "colors",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "values": [
        "White",
        "Black",
        "Red",
        "Grey",
        "Brown"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nreddb9x",
    "name": "sizes",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "values": [
        "7.0",
        "7.5",
        "8.0",
        "8.5",
        "9.0",
        "9.5",
        "10.0",
        "10.5",
        "11.0",
        "11.5",
        "12.0",
        "12.5",
        "13.0",
        "13.5",
        "14.0",
        "14.5",
        "15.0",
        "15.5",
        "16.0",
        "16.5",
        "17.0",
        "17.5",
        "18.0",
        "18.5",
        "19.0",
        "19.5",
        "20.0"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2znwjpz",
    "name": "sizesAvalaible",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "7.0",
        "7.5",
        "8.0",
        "8.5",
        "9.0",
        "9.5",
        "10.0",
        "10.5",
        "11.0",
        "11.5",
        "12.0",
        "12.5",
        "13.0",
        "13.5",
        "14.0",
        "14.5",
        "15.0",
        "15.5",
        "16.0",
        "16.5",
        "17.0",
        "17.5",
        "18.0",
        "18.5",
        "19.0",
        "19.5",
        "20.0"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
