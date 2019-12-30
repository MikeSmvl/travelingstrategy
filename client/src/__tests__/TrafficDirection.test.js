const {getOtherTrafficSide} = require('../utils/parsingTools')

describe('Testing traffic direction ', () => {
	it('opposite traffic difference', () => {
        expect(getOtherTrafficSide("left")).toBe("right");
      })

});