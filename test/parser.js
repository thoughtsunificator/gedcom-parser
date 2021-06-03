import { Parser } from "../index.js"

export function tokenize(test) {
	test.expect(5)

	test.strictEqual(Parser.tokenize(`0 HEAD`).length, 1)
	test.strictEqual(Parser.tokenize(`0 HEAD
	`).length, 1)
	test.strictEqual(Parser.tokenize(`
		0 HEAD
	`).length, 1)
	test.strictEqual(Parser.tokenize(`0 HEAD
		1 SUBM @U1
	`).length, 2)
	test.strictEqual(Parser.tokenize(`0 HEAD
		1 SUBM @U1`).length, 2)

	test.done()
}

export function simpleRecord(test) {
	test.expect(4)

	test.strictEqual(Parser.parse(`0 HEAD`)[0].name, "HEAD")
	test.strictEqual(Parser.parse(`0 HEAD`)[0].value, null)
	test.strictEqual(Parser.parse(`1 SUBM @U1`).length, 0)
	test.strictEqual(Parser.parse(`1 SUBM @U1`).length, 0)

	test.done()
}

export function singleRecord(test) {
	test.expect(37)

	const records = Parser.parse(`0 HEAD
1 GEDC
2 VERS 5.5.5
2 FORM LINEAGE-LINKED
3 VERS 5.5.5
1 CHAR UTF-8
1 SOUR gedcom.org
2 NAME The GEDCOM Site
2 VERS 5.5.5
2 CORP gedcom.org
3 ADDR
4 CITY LEIDEN
3 WWW www.gedcom.org
1 DATE 2 Oct 2019
2 TIME 0:00:00
1 FILE REMARR.GED
1 LANG English
1 SUBM @U1@
`	)
	test.strictEqual(records.length, 1)
	test.strictEqual(records[0].name, "HEAD")
	test.strictEqual(records[0].records.length, 7)
	test.strictEqual(records[0].value, null)

	test.strictEqual(records[0].records[0].name, "GEDC")
	test.strictEqual(records[0].records[0].records[0].name, "VERS")
	test.strictEqual(records[0].records[0].records.length, 2)
	test.strictEqual(records[0].records[0].records[0].value, "5.5.5")

	test.strictEqual(records[0].records[0].records[1].name, "FORM")
	test.strictEqual(records[0].records[0].records[1].records.length, 1)
	test.strictEqual(records[0].records[0].records[1].records[0].name, "VERS")

	test.strictEqual(records[0].records[1].name, "CHAR")
	test.strictEqual(records[0].records[1].records.length, 0)

	test.strictEqual(records[0].records[2].name, "SOUR")
	test.strictEqual(records[0].records[2].records.length, 3)

	test.strictEqual(records[0].records[2].records[0].name, "NAME")
	test.strictEqual(records[0].records[2].records[0].records.length, 0)
	test.strictEqual(records[0].records[2].records[0].value, "The GEDCOM Site")

	test.strictEqual(records[0].records[2].records[1].name, "VERS")
	test.strictEqual(records[0].records[2].records[1].records.length, 0)

	test.strictEqual(records[0].records[2].records[2].name, "CORP")
	test.strictEqual(records[0].records[2].records[2].records[0].name, "ADDR")

	test.strictEqual(records[0].records[2].records[2].records[0].records.length, 1)
	test.strictEqual(records[0].records[2].records[2].records[0].records[0].name, "CITY")

	test.strictEqual(records[0].records[2].records[2].records[1].name, "WWW")
	test.strictEqual(records[0].records[2].records[2].records[1].records.length, 0)

	test.strictEqual(records[0].records[3].name, "DATE")
	test.strictEqual(records[0].records[3].records.length, 1)

	test.strictEqual(records[0].records[3].records[0].name, "TIME")
	test.strictEqual(records[0].records[3].records[0].records.length, 0)
	test.strictEqual(records[0].records[3].records[0].value, "0:00:00")

	test.strictEqual(records[0].records[4].name, "FILE")
	test.strictEqual(records[0].records[4].records.length, 0)

	test.strictEqual(records[0].records[5].name, "LANG")
	test.strictEqual(records[0].records[5].records.length, 0)

	test.strictEqual(records[0].records[6].name, "SUBM")
	test.strictEqual(records[0].records[6].records.length, 0)

	test.done()
}

export function multipleRecords(test) {
	test.expect(4)

	const records = Parser.parse(`0 HEAD
1 GEDC
0 FORM LINEAGE-LINKED
1 VERS 5.5.5
`	)
	test.strictEqual(records[0].name, "HEAD")
	test.strictEqual(records[0].records[0].name, "GEDC")
	test.strictEqual(records[1].name, "FORM")
	test.strictEqual(records[1].records[0].name, "VERS")

	test.done()
}

export function levelOrder(test) {
		test.expect(19)

		const records = Parser.parse(`0 HEAD
1 GEDC
4 CITY LEIDEN
2 CORP gedcom.org
1 TEST
	`	)
		test.strictEqual(Parser.parse(`0 HEAD`).length, 1)

		test.strictEqual(records[0].name, "HEAD")
		test.strictEqual(records.length, 1)
		test.strictEqual(records[0].records.length, 2)
		test.strictEqual(records[0].records[0].name, "GEDC")
		test.strictEqual(records[0].records[0].records[0].name, "CORP")
		test.strictEqual(records[0].records[0].records[0].value, "gedcom.org")
		test.strictEqual(records[0].records[1].name, "TEST")

		test.strictEqual(Parser.parse(`1 HEAD`).length, 0)
		test.strictEqual(Parser.parse(`1 HEAD
0 TEST`)[0].name, "TEST")
		test.strictEqual(Parser.parse(`1 HEAD
2 TEST`).length, 0)
		test.strictEqual(Parser.parse(`1 HEAD
1 TEST`).length, 0)
		test.strictEqual(Parser.parse(`0 HEAD
2 TEST`).length, 1)
		test.strictEqual(Parser.parse(`0 HEAD
2 TEST`)[0].records.length, 0)

		const records_ = Parser.parse(`0 HEAD
1 GEDC
0 VERS 5.5.5
2 VERS 5.5.5`)

		test.strictEqual(records_.length, 2)
		test.strictEqual(records_[0].records[0].name, "GEDC")
		test.strictEqual(records_[0].records.length, 1)
		test.strictEqual(records_[0].records[0].records[0].name, "VERS")
		test.strictEqual(records_[0].records[0].records.length, 1)

		test.done()
}