export default {
  "common": {
    "value": {

      "setting1": {
        "value": "Value 1",
        "type": "actual"
      },

      "setting2": {
        "value": "200",
        "type": "removed"
      },

      "setting3": {
        "value": true,
        "type": "actual"
      },

      "setting6": {
        "value": "complex value",
/*        "value": {

          "key": {
            "value": "value",
            "type": "removed"
          }

        },*/
        "type": "removed"
      },

      "setting4": {
        "value": "blah blah",
        "type": "added"
      },

      "setting5": {
        "value": "complex value",
/*        "value": {

          "key5": {
            "value": "value5",
            "type": "added"
          }

        },*/
        "type": "added"
      },


    },
    "type": "actual"
  },

  "group1": {
    "value": {

      "baz": {
        "oldValue": "bas",
        "value": "bars",
        "type": "updated"
      },

      "foo": {
        "value": "bar",
        "type": "actual"
      }

    },
    "type": "actual"
  },

  "group2": {
    "value": "complex value",
/*    "value": {
      "abc": {
        "value": 12345,
        "type": "removed"
      }
    },*/
    "type": "removed"
  },

  "group3": {
    "value": "complex value",
/*    "value": {
      "fee": {
        "value": 100500,
        "type": "added"
      }
    },*/
    "type": "added"
  }

}