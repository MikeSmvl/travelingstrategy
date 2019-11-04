'use strict'

class googleStub {
  constructor() {
    this.google = {
        maps: {
          places: {
            Autocomplete: function () {
              return {
                addListener: function () { }
              };
            }
          }
        }
    };
  }
}

module.exports = googleStub;