import assert from "assert"
import { Token, Tokenizer } from "../index.js"

describe("tokenizer", () => {

	it("level", () => {

		assert.strictEqual(Tokenizer.tokenize(`032132`).length, 0)
		assert.strictEqual(Tokenizer.tokenize(`032132 `).length, 0)
		assert.strictEqual(Tokenizer.tokenize(`032132
	`).length, 0)
		assert.strictEqual(Tokenizer.tokenize(`032132
			1`).length, 0)
		assert.strictEqual(Tokenizer.tokenize(`032132
	1
			0`).length, 0)

	})

	it("identifier", () => {

		const tokens = Tokenizer.tokenize(`032132 HEAD`)

		assert.strictEqual(tokens.length, 3)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "032132")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 6)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "HEAD")
		assert.strictEqual(tokens[2].index, 7)

		const tokens_ = Tokenizer.tokenize(`032132 H`)

		assert.strictEqual(tokens_.length, 3)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "032132")
		assert.strictEqual(tokens_[0].index, 0)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 6)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "H")
		assert.strictEqual(tokens_[2].index, 7)

		const tokens__ = Tokenizer.tokenize(`032132 H `)

		assert.strictEqual(tokens__.length, 3)

		assert.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[0].buffer, "032132")
		assert.strictEqual(tokens__[0].index, 0)

		assert.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[1].buffer, " ")
		assert.strictEqual(tokens__[1].index, 6)

		assert.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[2].buffer, "H")
		assert.strictEqual(tokens__[2].index, 7)

	})

	it("information", () => {

		const tokens = Tokenizer.tokenize(`032132 HEAD TEST`)

		assert.strictEqual(tokens.length, 5)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "032132")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 6)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "HEAD")
		assert.strictEqual(tokens[2].index, 7)

		assert.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[3].buffer, " ")
		assert.strictEqual(tokens[3].index, 11)

		assert.strictEqual(tokens[4].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens[4].buffer, "TEST")
		assert.strictEqual(tokens[4].index, 12)

		const tokens_ = Tokenizer.tokenize(`1 SUBM @U1`)

		assert.strictEqual(tokens_.length, 5)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "1")
		assert.strictEqual(tokens_[0].index, 0)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 1)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "SUBM")
		assert.strictEqual(tokens_[2].index, 2)

		assert.strictEqual(tokens_[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[3].buffer, " ")
		assert.strictEqual(tokens_[3].index, 6)

		assert.strictEqual(tokens_[4].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens_[4].buffer, "@U1")
		assert.strictEqual(tokens_[4].index, 7)

		const tokens__ = Tokenizer.tokenize(`032132 HEAD TEST DSA SDADsa CXCXZ`)

		assert.strictEqual(tokens__.length, 5)

		assert.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[0].buffer, "032132")
		assert.strictEqual(tokens__[0].index, 0)

		assert.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[1].buffer, " ")
		assert.strictEqual(tokens__[1].index, 6)

		assert.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[2].buffer, "HEAD")
		assert.strictEqual(tokens__[2].index, 7)

		assert.strictEqual(tokens__[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[3].buffer, " ")
		assert.strictEqual(tokens__[3].index, 11)

		assert.strictEqual(tokens__[4].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens__[4].buffer, "TEST DSA SDADsa CXCXZ")
		assert.strictEqual(tokens__[4].index, 12)

		const tokens___ = Tokenizer.tokenize(`0 DATE  6 Mar 2004`)

		assert.strictEqual(tokens___.length, 5)

		assert.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens___[0].buffer, "0")
		assert.strictEqual(tokens___[0].index, 0)

		assert.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[1].buffer, " ")
		assert.strictEqual(tokens___[1].index, 1)

		assert.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens___[2].buffer, "DATE")
		assert.strictEqual(tokens___[2].index, 2)

		assert.strictEqual(tokens___[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[3].buffer, " ")
		assert.strictEqual(tokens___[3].index, 6)

		assert.strictEqual(tokens___[4].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens___[4].buffer, " 6 Mar 2004")
		assert.strictEqual(tokens___[4].index, 7)


	})

	it("reference", () => {

		const tokens = Tokenizer.tokenize(`032132 @UI@ MYIDENTIFIER`)

		assert.strictEqual(tokens.length, 5)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "032132")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 6)

		assert.strictEqual(tokens[2].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens[2].buffer, "@UI@")
		assert.strictEqual(tokens[2].index, 7)

		assert.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[3].buffer, " ")
		assert.strictEqual(tokens[3].index, 11)

		assert.strictEqual(tokens[4].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[4].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens[4].index, 12)

		const tokens_ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@`)

		assert.strictEqual(tokens_.length, 5)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "032132")
		assert.strictEqual(tokens_[0].index, 0)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 6)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens_[2].index, 7)

		assert.strictEqual(tokens_[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[3].buffer, " ")
		assert.strictEqual(tokens_[3].index, 19)

		assert.strictEqual(tokens_[4].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens_[4].buffer, "@UI@")
		assert.strictEqual(tokens_[4].index, 20)

		const tokens__ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ `)

		assert.strictEqual(tokens__.length, 5)

		assert.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[0].buffer, "032132")
		assert.strictEqual(tokens__[0].index, 0)

		assert.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[1].buffer, " ")
		assert.strictEqual(tokens__[1].index, 6)

		assert.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[2].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens__[2].index, 7)

		assert.strictEqual(tokens__[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[3].buffer, " ")
		assert.strictEqual(tokens__[3].index, 19)

		assert.strictEqual(tokens__[4].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens__[4].buffer, "@UI@")
		assert.strictEqual(tokens__[4].index, 20)

		const tokens___ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad`)

		assert.strictEqual(tokens___.length, 5)

		assert.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens___[0].buffer, "032132")
		assert.strictEqual(tokens___[0].index, 0)

		assert.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[1].buffer, " ")
		assert.strictEqual(tokens___[1].index, 6)

		assert.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens___[2].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens___[2].index, 7)

		assert.strictEqual(tokens___[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[3].buffer, " ")
		assert.strictEqual(tokens___[3].index, 19)

		assert.strictEqual(tokens___[4].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens___[4].buffer, "@UI@")
		assert.strictEqual(tokens___[4].index, 20)

		const tokens____ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad dsadsa`)

		assert.strictEqual(tokens____.length, 5)

		assert.strictEqual(tokens____[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens____[0].buffer, "032132")
		assert.strictEqual(tokens____[0].index, 0)

		assert.strictEqual(tokens____[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens____[1].buffer, " ")
		assert.strictEqual(tokens____[1].index, 6)

		assert.strictEqual(tokens____[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens____[2].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens____[2].index, 7)

		assert.strictEqual(tokens____[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens____[3].buffer, " ")
		assert.strictEqual(tokens____[3].index, 19)

		assert.strictEqual(tokens____[4].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens____[4].buffer, "@UI@")
		assert.strictEqual(tokens____[4].index, 20)

	})

	it("lineFeed", () => {

		const tokens = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@
1 GEDC
4 @UJ@ XS
2 FORM LINEAGE-LINKED`)

		assert.strictEqual(tokens.length, 21)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "032132")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 6)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "MYIDENTIFIER")
		assert.strictEqual(tokens[2].index, 7)

		assert.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[3].buffer, " ")
		assert.strictEqual(tokens[3].index, 19)

		assert.strictEqual(tokens[4].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens[4].buffer, "@UI@")
		assert.strictEqual(tokens[4].index, 20)

		assert.strictEqual(tokens[5].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens[5].buffer, "\n")
		assert.strictEqual(tokens[5].index, 24)

		assert.strictEqual(tokens[6].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[6].buffer, "1")
		assert.strictEqual(tokens[6].index, 25)

		assert.strictEqual(tokens[7].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[7].buffer, " ")
		assert.strictEqual(tokens[7].index, 26)

		assert.strictEqual(tokens[8].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[8].buffer, "GEDC")
		assert.strictEqual(tokens[8].index, 27)

		assert.strictEqual(tokens[9].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens[9].buffer, "\n")
		assert.strictEqual(tokens[9].index, 31)

		assert.strictEqual(tokens[10].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[10].buffer, "4")
		assert.strictEqual(tokens[10].index, 32)

		assert.strictEqual(tokens[11].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[11].buffer, " ")
		assert.strictEqual(tokens[11].index, 33)

		assert.strictEqual(tokens[12].name, Token.NAME_REFERENCE)
		assert.strictEqual(tokens[12].buffer, "@UJ@")
		assert.strictEqual(tokens[12].index, 34)

		assert.strictEqual(tokens[13].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[13].buffer, " ")
		assert.strictEqual(tokens[13].index, 38)

		assert.strictEqual(tokens[14].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[14].buffer, "XS")
		assert.strictEqual(tokens[14].index, 39)

		assert.strictEqual(tokens[15].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens[15].buffer, "\n")
		assert.strictEqual(tokens[15].index, 41)

		assert.strictEqual(tokens[16].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[16].buffer, "2")
		assert.strictEqual(tokens[16].index, 42)

		assert.strictEqual(tokens[17].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[17].buffer, " ")
		assert.strictEqual(tokens[17].index, 43)

		assert.strictEqual(tokens[18].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[18].buffer, "FORM")
		assert.strictEqual(tokens[18].index, 44)

		assert.strictEqual(tokens[19].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[19].buffer, " ")
		assert.strictEqual(tokens[19].index, 48)

		assert.strictEqual(tokens[20].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens[20].buffer, "LINEAGE-LINKED")
		assert.strictEqual(tokens[20].index, 49)

		const tokens_ = Tokenizer.tokenize(`1 GEDC



	2 FORM LINEAGE-LINKED

		`)

		assert.strictEqual(tokens_.length, 10)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "1")
		assert.strictEqual(tokens_[0].index, 0)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 1)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "GEDC")
		assert.strictEqual(tokens_[2].index, 2)

		assert.strictEqual(tokens_[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens_[3].buffer, "\n")
		assert.strictEqual(tokens_[3].index, 6)

		assert.strictEqual(tokens_[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[4].buffer, "2")
		assert.strictEqual(tokens_[4].index, 11)

		assert.strictEqual(tokens_[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[5].buffer, " ")
		assert.strictEqual(tokens_[5].index, 12)

		assert.strictEqual(tokens_[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[6].buffer, "FORM")
		assert.strictEqual(tokens_[6].index, 13)

		assert.strictEqual(tokens_[7].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[7].buffer, " ")
		assert.strictEqual(tokens_[7].index, 17)

		assert.strictEqual(tokens_[8].name, Token.NAME_INFORMATION)
		assert.strictEqual(tokens_[8].buffer, "LINEAGE-LINKED")
		assert.strictEqual(tokens_[8].index, 18)

		assert.strictEqual(tokens_[9].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens_[9].buffer, "\n")
		assert.strictEqual(tokens_[9].index, 32)

	})

	it("invalidRecords", () => {

		assert.strictEqual(Tokenizer.tokenize("@").length, 0)
		assert.strictEqual(Tokenizer.tokenize("@UI@ 01").length, 0)
		assert.strictEqual(Tokenizer.tokenize("UI@ 01").length, 0)

		const tokens = Tokenizer.tokenize(`0 HEAD
@UI@ 01
1 TEST`)

		assert.strictEqual(tokens.length, 7)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "0")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 1)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "HEAD")
		assert.strictEqual(tokens[2].index, 2)

		assert.strictEqual(tokens[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens[3].buffer, "\n")
		assert.strictEqual(tokens[3].index, 6)

		assert.strictEqual(tokens[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[4].buffer, "1")
		assert.strictEqual(tokens[4].index, 15)

		assert.strictEqual(tokens[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[5].buffer, " ")
		assert.strictEqual(tokens[5].index, 16)

		assert.strictEqual(tokens[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[6].buffer, "TEST")
		assert.strictEqual(tokens[6].index, 17)

		const tokens_ = Tokenizer.tokenize("0 HEAD\n2\n1 TEST")

		assert.strictEqual(tokens_.length, 7)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "0")
		assert.strictEqual(tokens_[0].index, 0)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 1)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "HEAD")
		assert.strictEqual(tokens_[2].index, 2)

		assert.strictEqual(tokens_[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens_[3].buffer, "\n")
		assert.strictEqual(tokens_[3].index, 6)

		assert.strictEqual(tokens_[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[4].buffer, "1")
		assert.strictEqual(tokens_[4].index, 9)

		assert.strictEqual(tokens_[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[5].buffer, " ")
		assert.strictEqual(tokens_[5].index, 10)

		assert.strictEqual(tokens_[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[6].buffer, "TEST")
		assert.strictEqual(tokens_[6].index, 11)

		const tokens__ = Tokenizer.tokenize("0 HEAD\n2 \n1 TEST")

		assert.strictEqual(tokens__.length, 7)

		assert.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[0].buffer, "0")
		assert.strictEqual(tokens__[0].index, 0)

		assert.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[1].buffer, " ")
		assert.strictEqual(tokens__[1].index, 1)

		assert.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[2].buffer, "HEAD")
		assert.strictEqual(tokens__[2].index, 2)

		assert.strictEqual(tokens__[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens__[3].buffer, "\n")
		assert.strictEqual(tokens__[3].index, 6)

		assert.strictEqual(tokens__[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[4].buffer, "1")
		assert.strictEqual(tokens__[4].index, 10)

		assert.strictEqual(tokens__[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[5].buffer, " ")
		assert.strictEqual(tokens__[5].index, 11)

		assert.strictEqual(tokens__[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[6].buffer, "TEST")
		assert.strictEqual(tokens__[6].index, 12)

	})

	it("trimStart", () => {

		const tokens = Tokenizer.tokenize(" 0 HEAD ")

		assert.strictEqual(tokens.length, 3)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "0")
		assert.strictEqual(tokens[0].index, 1)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 2)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "HEAD")
		assert.strictEqual(tokens[2].index, 3)

		const tokens_ = Tokenizer.tokenize(`
		0 HEAD `)

		assert.strictEqual(tokens_.length, 3)

		assert.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens_[0].buffer, "0")
		assert.strictEqual(tokens_[0].index, 3)

		assert.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens_[1].buffer, " ")
		assert.strictEqual(tokens_[1].index, 4)

		assert.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens_[2].buffer, "HEAD")
		assert.strictEqual(tokens_[2].index, 5)

		const tokens__ = Tokenizer.tokenize(`0 HEAD
		0 HEAD `)

		assert.strictEqual(tokens__.length, 7)

		assert.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[0].buffer, "0")
		assert.strictEqual(tokens__[0].index, 0)

		assert.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[1].buffer, " ")
		assert.strictEqual(tokens__[1].index, 1)

		assert.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[2].buffer, "HEAD")
		assert.strictEqual(tokens__[2].index, 2)

		assert.strictEqual(tokens__[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens__[3].buffer, "\n")
		assert.strictEqual(tokens__[3].index, 6)

		assert.strictEqual(tokens__[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens__[4].buffer, "0")
		assert.strictEqual(tokens__[4].index, 9)

		assert.strictEqual(tokens__[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens__[5].buffer, " ")
		assert.strictEqual(tokens__[5].index, 10)

		assert.strictEqual(tokens__[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens__[6].buffer, "HEAD")
		assert.strictEqual(tokens__[6].index, 11)

	const tokens___ = Tokenizer.tokenize(`0 HEAD
		0 HEAD
 1 TEST `)

		assert.strictEqual(tokens___.length, 11)

		assert.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens___[0].buffer, "0")
		assert.strictEqual(tokens___[0].index, 0)

		assert.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[1].buffer, " ")
		assert.strictEqual(tokens___[1].index, 1)

		assert.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens___[2].buffer, "HEAD")
		assert.strictEqual(tokens___[2].index, 2)

		assert.strictEqual(tokens___[3].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens___[3].buffer, "\n")
		assert.strictEqual(tokens___[3].index, 6)

		assert.strictEqual(tokens___[4].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens___[4].buffer, "0")
		assert.strictEqual(tokens___[4].index, 9)

		assert.strictEqual(tokens___[5].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[5].buffer, " ")
		assert.strictEqual(tokens___[5].index, 10)

		assert.strictEqual(tokens___[6].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens___[6].buffer, "HEAD")
		assert.strictEqual(tokens___[6].index, 11)

		assert.strictEqual(tokens___[7].name, Token.NAME_LINE_FEED)
		assert.strictEqual(tokens___[7].buffer, "\n")
		assert.strictEqual(tokens___[7].index, 15)

		assert.strictEqual(tokens___[8].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens___[8].buffer, "1")
		assert.strictEqual(tokens___[8].index, 17)

		assert.strictEqual(tokens___[9].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens___[9].buffer, " ")
		assert.strictEqual(tokens___[9].index, 18)

		assert.strictEqual(tokens___[10].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens___[10].buffer, "TEST")
		assert.strictEqual(tokens___[10].index, 19)

	})

	it("separator", () => {

		const tokens = Tokenizer.tokenize(`032132       H `)

		assert.strictEqual(tokens.length, 3)

		assert.strictEqual(tokens[0].name, Token.NAME_LEVEL)
		assert.strictEqual(tokens[0].buffer, "032132")
		assert.strictEqual(tokens[0].index, 0)

		assert.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
		assert.strictEqual(tokens[1].buffer, " ")
		assert.strictEqual(tokens[1].index, 6)

		assert.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
		assert.strictEqual(tokens[2].buffer, "H")
		assert.strictEqual(tokens[2].index, 13)

	})
})
