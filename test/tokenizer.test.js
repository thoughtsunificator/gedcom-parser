import { Token, Tokenizer } from "../index.js"

export function level(test) {
	test.expect(5)

	test.strictEqual(Tokenizer.tokenize(`032132`).length, 0)
	test.strictEqual(Tokenizer.tokenize(`032132 `).length, 0)
	test.strictEqual(Tokenizer.tokenize(`032132
`).length, 0)
	test.strictEqual(Tokenizer.tokenize(`032132
		1`).length, 0)
	test.strictEqual(Tokenizer.tokenize(`032132
1
		0`).length, 0)

	test.done()
}

export function identifier(test) {
	test.expect(30)

	const tokens = Tokenizer.tokenize(`032132 HEAD`)

	test.strictEqual(tokens.length, 3)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "032132")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 6)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "HEAD")
	test.strictEqual(tokens[2].index, 7)

	const tokens_ = Tokenizer.tokenize(`032132 H`)

	test.strictEqual(tokens_.length, 3)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "032132")
	test.strictEqual(tokens_[0].index, 0)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 6)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "H")
	test.strictEqual(tokens_[2].index, 7)

	const tokens__ = Tokenizer.tokenize(`032132 H `)

	test.strictEqual(tokens__.length, 3)

	test.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[0].buffer, "032132")
	test.strictEqual(tokens__[0].index, 0)

	test.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[1].buffer, " ")
	test.strictEqual(tokens__[1].index, 6)

	test.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[2].buffer, "H")
	test.strictEqual(tokens__[2].index, 7)

	test.done()
}

export function information(test) {
	test.expect(64)

	const tokens = Tokenizer.tokenize(`032132 HEAD TEST`)

	test.strictEqual(tokens.length, 5)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "032132")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 6)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "HEAD")
	test.strictEqual(tokens[2].index, 7)

	test.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[3].buffer, " ")
	test.strictEqual(tokens[3].index, 11)

	test.strictEqual(tokens[4].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens[4].buffer, "TEST")
	test.strictEqual(tokens[4].index, 12)

	const tokens_ = Tokenizer.tokenize(`1 SUBM @U1`)

	test.strictEqual(tokens_.length, 5)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "1")
	test.strictEqual(tokens_[0].index, 0)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 1)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "SUBM")
	test.strictEqual(tokens_[2].index, 2)

	test.strictEqual(tokens_[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[3].buffer, " ")
	test.strictEqual(tokens_[3].index, 6)

	test.strictEqual(tokens_[4].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens_[4].buffer, "@U1")
	test.strictEqual(tokens_[4].index, 7)

	const tokens__ = Tokenizer.tokenize(`032132 HEAD TEST DSA SDADsa CXCXZ`)

	test.strictEqual(tokens__.length, 5)

	test.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[0].buffer, "032132")
	test.strictEqual(tokens__[0].index, 0)

	test.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[1].buffer, " ")
	test.strictEqual(tokens__[1].index, 6)

	test.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[2].buffer, "HEAD")
	test.strictEqual(tokens__[2].index, 7)

	test.strictEqual(tokens__[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[3].buffer, " ")
	test.strictEqual(tokens__[3].index, 11)

	test.strictEqual(tokens__[4].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens__[4].buffer, "TEST DSA SDADsa CXCXZ")
	test.strictEqual(tokens__[4].index, 12)

	const tokens___ = Tokenizer.tokenize(`0 DATE  6 Mar 2004`)

	test.strictEqual(tokens___.length, 5)

	test.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens___[0].buffer, "0")
	test.strictEqual(tokens___[0].index, 0)

	test.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[1].buffer, " ")
	test.strictEqual(tokens___[1].index, 1)

	test.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens___[2].buffer, "DATE")
	test.strictEqual(tokens___[2].index, 2)

	test.strictEqual(tokens___[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[3].buffer, " ")
	test.strictEqual(tokens___[3].index, 6)

	test.strictEqual(tokens___[4].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens___[4].buffer, " 6 Mar 2004")
	test.strictEqual(tokens___[4].index, 7)


	test.done()
}

export function reference(test) {
	test.expect(80)

	const tokens = Tokenizer.tokenize(`032132 @UI@ MYIDENTIFIER`)

	test.strictEqual(tokens.length, 5)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "032132")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 6)

	test.strictEqual(tokens[2].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens[2].buffer, "@UI@")
	test.strictEqual(tokens[2].index, 7)

	test.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[3].buffer, " ")
	test.strictEqual(tokens[3].index, 11)

	test.strictEqual(tokens[4].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[4].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens[4].index, 12)

	const tokens_ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@`)

	test.strictEqual(tokens_.length, 5)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "032132")
	test.strictEqual(tokens_[0].index, 0)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 6)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens_[2].index, 7)

	test.strictEqual(tokens_[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[3].buffer, " ")
	test.strictEqual(tokens_[3].index, 19)

	test.strictEqual(tokens_[4].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens_[4].buffer, "@UI@")
	test.strictEqual(tokens_[4].index, 20)

	const tokens__ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ `)

	test.strictEqual(tokens__.length, 5)

	test.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[0].buffer, "032132")
	test.strictEqual(tokens__[0].index, 0)

	test.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[1].buffer, " ")
	test.strictEqual(tokens__[1].index, 6)

	test.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[2].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens__[2].index, 7)

	test.strictEqual(tokens__[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[3].buffer, " ")
	test.strictEqual(tokens__[3].index, 19)

	test.strictEqual(tokens__[4].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens__[4].buffer, "@UI@")
	test.strictEqual(tokens__[4].index, 20)

	const tokens___ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad`)

	test.strictEqual(tokens___.length, 5)

	test.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens___[0].buffer, "032132")
	test.strictEqual(tokens___[0].index, 0)

	test.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[1].buffer, " ")
	test.strictEqual(tokens___[1].index, 6)

	test.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens___[2].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens___[2].index, 7)

	test.strictEqual(tokens___[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[3].buffer, " ")
	test.strictEqual(tokens___[3].index, 19)

	test.strictEqual(tokens___[4].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens___[4].buffer, "@UI@")
	test.strictEqual(tokens___[4].index, 20)

	const tokens____ = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@ dsadsad dsadsa`)

	test.strictEqual(tokens____.length, 5)

	test.strictEqual(tokens____[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens____[0].buffer, "032132")
	test.strictEqual(tokens____[0].index, 0)

	test.strictEqual(tokens____[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens____[1].buffer, " ")
	test.strictEqual(tokens____[1].index, 6)

	test.strictEqual(tokens____[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens____[2].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens____[2].index, 7)

	test.strictEqual(tokens____[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens____[3].buffer, " ")
	test.strictEqual(tokens____[3].index, 19)

	test.strictEqual(tokens____[4].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens____[4].buffer, "@UI@")
	test.strictEqual(tokens____[4].index, 20)

	test.done()
}

export function lineFeed(test) {
	test.expect(95)

	const tokens = Tokenizer.tokenize(`032132 MYIDENTIFIER @UI@
1 GEDC
4 @UJ@ XS
2 FORM LINEAGE-LINKED`)

	test.strictEqual(tokens.length, 21)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "032132")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 6)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "MYIDENTIFIER")
	test.strictEqual(tokens[2].index, 7)

	test.strictEqual(tokens[3].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[3].buffer, " ")
	test.strictEqual(tokens[3].index, 19)

	test.strictEqual(tokens[4].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens[4].buffer, "@UI@")
	test.strictEqual(tokens[4].index, 20)

	test.strictEqual(tokens[5].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens[5].buffer, "\n")
	test.strictEqual(tokens[5].index, 24)

	test.strictEqual(tokens[6].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[6].buffer, "1")
	test.strictEqual(tokens[6].index, 25)

	test.strictEqual(tokens[7].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[7].buffer, " ")
	test.strictEqual(tokens[7].index, 26)

	test.strictEqual(tokens[8].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[8].buffer, "GEDC")
	test.strictEqual(tokens[8].index, 27)

	test.strictEqual(tokens[9].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens[9].buffer, "\n")
	test.strictEqual(tokens[9].index, 31)

	test.strictEqual(tokens[10].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[10].buffer, "4")
	test.strictEqual(tokens[10].index, 32)

	test.strictEqual(tokens[11].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[11].buffer, " ")
	test.strictEqual(tokens[11].index, 33)

	test.strictEqual(tokens[12].name, Token.NAME_REFERENCE)
	test.strictEqual(tokens[12].buffer, "@UJ@")
	test.strictEqual(tokens[12].index, 34)

	test.strictEqual(tokens[13].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[13].buffer, " ")
	test.strictEqual(tokens[13].index, 38)

	test.strictEqual(tokens[14].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[14].buffer, "XS")
	test.strictEqual(tokens[14].index, 39)

	test.strictEqual(tokens[15].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens[15].buffer, "\n")
	test.strictEqual(tokens[15].index, 41)

	test.strictEqual(tokens[16].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[16].buffer, "2")
	test.strictEqual(tokens[16].index, 42)

	test.strictEqual(tokens[17].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[17].buffer, " ")
	test.strictEqual(tokens[17].index, 43)

	test.strictEqual(tokens[18].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[18].buffer, "FORM")
	test.strictEqual(tokens[18].index, 44)

	test.strictEqual(tokens[19].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[19].buffer, " ")
	test.strictEqual(tokens[19].index, 48)

	test.strictEqual(tokens[20].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens[20].buffer, "LINEAGE-LINKED")
	test.strictEqual(tokens[20].index, 49)

	const tokens_ = Tokenizer.tokenize(`1 GEDC



	2 FORM LINEAGE-LINKED

	`)

	test.strictEqual(tokens_.length, 10)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "1")
	test.strictEqual(tokens_[0].index, 0)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 1)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "GEDC")
	test.strictEqual(tokens_[2].index, 2)

	test.strictEqual(tokens_[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens_[3].buffer, "\n")
	test.strictEqual(tokens_[3].index, 6)

	test.strictEqual(tokens_[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[4].buffer, "2")
	test.strictEqual(tokens_[4].index, 11)

	test.strictEqual(tokens_[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[5].buffer, " ")
	test.strictEqual(tokens_[5].index, 12)

	test.strictEqual(tokens_[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[6].buffer, "FORM")
	test.strictEqual(tokens_[6].index, 13)

	test.strictEqual(tokens_[7].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[7].buffer, " ")
	test.strictEqual(tokens_[7].index, 17)

	test.strictEqual(tokens_[8].name, Token.NAME_INFORMATION)
	test.strictEqual(tokens_[8].buffer, "LINEAGE-LINKED")
	test.strictEqual(tokens_[8].index, 18)

	test.strictEqual(tokens_[9].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens_[9].buffer, "\n")
	test.strictEqual(tokens_[9].index, 32)

	test.done()
}

export function invalidRecords(test) {
	test.expect(69)

	test.strictEqual(Tokenizer.tokenize("@").length, 0)
	test.strictEqual(Tokenizer.tokenize("@UI@ 01").length, 0)
	test.strictEqual(Tokenizer.tokenize("UI@ 01").length, 0)

	const tokens = Tokenizer.tokenize(`0 HEAD
@UI@ 01
1 TEST`)

	test.strictEqual(tokens.length, 7)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "0")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 1)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "HEAD")
	test.strictEqual(tokens[2].index, 2)

	test.strictEqual(tokens[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens[3].buffer, "\n")
	test.strictEqual(tokens[3].index, 6)

	test.strictEqual(tokens[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[4].buffer, "1")
	test.strictEqual(tokens[4].index, 15)

	test.strictEqual(tokens[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[5].buffer, " ")
	test.strictEqual(tokens[5].index, 16)

	test.strictEqual(tokens[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[6].buffer, "TEST")
	test.strictEqual(tokens[6].index, 17)

	const tokens_ = Tokenizer.tokenize("0 HEAD\n2\n1 TEST")

	test.strictEqual(tokens_.length, 7)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "0")
	test.strictEqual(tokens_[0].index, 0)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 1)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "HEAD")
	test.strictEqual(tokens_[2].index, 2)

	test.strictEqual(tokens_[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens_[3].buffer, "\n")
	test.strictEqual(tokens_[3].index, 6)

	test.strictEqual(tokens_[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[4].buffer, "1")
	test.strictEqual(tokens_[4].index, 9)

	test.strictEqual(tokens_[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[5].buffer, " ")
	test.strictEqual(tokens_[5].index, 10)

	test.strictEqual(tokens_[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[6].buffer, "TEST")
	test.strictEqual(tokens_[6].index, 11)

	const tokens__ = Tokenizer.tokenize("0 HEAD\n2 \n1 TEST")

	test.strictEqual(tokens__.length, 7)

	test.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[0].buffer, "0")
	test.strictEqual(tokens__[0].index, 0)

	test.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[1].buffer, " ")
	test.strictEqual(tokens__[1].index, 1)

	test.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[2].buffer, "HEAD")
	test.strictEqual(tokens__[2].index, 2)

	test.strictEqual(tokens__[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens__[3].buffer, "\n")
	test.strictEqual(tokens__[3].index, 6)

	test.strictEqual(tokens__[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[4].buffer, "1")
	test.strictEqual(tokens__[4].index, 10)

	test.strictEqual(tokens__[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[5].buffer, " ")
	test.strictEqual(tokens__[5].index, 11)

	test.strictEqual(tokens__[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[6].buffer, "TEST")
	test.strictEqual(tokens__[6].index, 12)

	test.done()
}

export function trimStart(test) {
	test.expect(76)

	const tokens = Tokenizer.tokenize(" 0 HEAD ")

	test.strictEqual(tokens.length, 3)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "0")
	test.strictEqual(tokens[0].index, 1)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 2)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "HEAD")
	test.strictEqual(tokens[2].index, 3)

	const tokens_ = Tokenizer.tokenize(`
		0 HEAD `)

	test.strictEqual(tokens_.length, 3)

	test.strictEqual(tokens_[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens_[0].buffer, "0")
	test.strictEqual(tokens_[0].index, 3)

	test.strictEqual(tokens_[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens_[1].buffer, " ")
	test.strictEqual(tokens_[1].index, 4)

	test.strictEqual(tokens_[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens_[2].buffer, "HEAD")
	test.strictEqual(tokens_[2].index, 5)

	const tokens__ = Tokenizer.tokenize(`0 HEAD
		0 HEAD `)

	test.strictEqual(tokens__.length, 7)

	test.strictEqual(tokens__[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[0].buffer, "0")
	test.strictEqual(tokens__[0].index, 0)

	test.strictEqual(tokens__[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[1].buffer, " ")
	test.strictEqual(tokens__[1].index, 1)

	test.strictEqual(tokens__[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[2].buffer, "HEAD")
	test.strictEqual(tokens__[2].index, 2)

	test.strictEqual(tokens__[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens__[3].buffer, "\n")
	test.strictEqual(tokens__[3].index, 6)

	test.strictEqual(tokens__[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens__[4].buffer, "0")
	test.strictEqual(tokens__[4].index, 9)

	test.strictEqual(tokens__[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens__[5].buffer, " ")
	test.strictEqual(tokens__[5].index, 10)

	test.strictEqual(tokens__[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens__[6].buffer, "HEAD")
	test.strictEqual(tokens__[6].index, 11)

	const tokens___ = Tokenizer.tokenize(`0 HEAD
		0 HEAD
 1 TEST `)

	test.strictEqual(tokens___.length, 11)

	test.strictEqual(tokens___[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens___[0].buffer, "0")
	test.strictEqual(tokens___[0].index, 0)

	test.strictEqual(tokens___[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[1].buffer, " ")
	test.strictEqual(tokens___[1].index, 1)

	test.strictEqual(tokens___[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens___[2].buffer, "HEAD")
	test.strictEqual(tokens___[2].index, 2)

	test.strictEqual(tokens___[3].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens___[3].buffer, "\n")
	test.strictEqual(tokens___[3].index, 6)

	test.strictEqual(tokens___[4].name, Token.NAME_LEVEL)
	test.strictEqual(tokens___[4].buffer, "0")
	test.strictEqual(tokens___[4].index, 9)

	test.strictEqual(tokens___[5].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[5].buffer, " ")
	test.strictEqual(tokens___[5].index, 10)

	test.strictEqual(tokens___[6].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens___[6].buffer, "HEAD")
	test.strictEqual(tokens___[6].index, 11)

	test.strictEqual(tokens___[7].name, Token.NAME_LINE_FEED)
	test.strictEqual(tokens___[7].buffer, "\n")
	test.strictEqual(tokens___[7].index, 15)

	test.strictEqual(tokens___[8].name, Token.NAME_LEVEL)
	test.strictEqual(tokens___[8].buffer, "1")
	test.strictEqual(tokens___[8].index, 17)

	test.strictEqual(tokens___[9].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens___[9].buffer, " ")
	test.strictEqual(tokens___[9].index, 18)

	test.strictEqual(tokens___[10].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens___[10].buffer, "TEST")
	test.strictEqual(tokens___[10].index, 19)

	test.done()
}

export function separator(test) {
	test.expect(10)

	const tokens = Tokenizer.tokenize(`032132       H `)

	test.strictEqual(tokens.length, 3)

	test.strictEqual(tokens[0].name, Token.NAME_LEVEL)
	test.strictEqual(tokens[0].buffer, "032132")
	test.strictEqual(tokens[0].index, 0)

	test.strictEqual(tokens[1].name, Token.NAME_SEPARATOR)
	test.strictEqual(tokens[1].buffer, " ")
	test.strictEqual(tokens[1].index, 6)

	test.strictEqual(tokens[2].name, Token.NAME_IDENTIFIER)
	test.strictEqual(tokens[2].buffer, "H")
	test.strictEqual(tokens[2].index, 13)

	test.done()
}