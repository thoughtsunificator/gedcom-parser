import assert from "assert"
import { Parser } from "../index.js"

describe("parser", () => {

	it("tokenize", () => {

		assert.strictEqual(Parser.tokenize(`0 HEAD`).length, 1)
		assert.strictEqual(Parser.tokenize(`0 HEAD
		`).length, 1)
		assert.strictEqual(Parser.tokenize(`
			0 HEAD
		`).length, 1)
		assert.strictEqual(Parser.tokenize(`0 HEAD
			1 SUBM @U1
		`).length, 2)
		assert.strictEqual(Parser.tokenize(`0 HEAD
			1 SUBM @U1`).length, 2)

	})

	it("simpleRecord", () => {

		assert.strictEqual(Parser.parse(`0 HEAD`)[0].name, "HEAD")
		assert.strictEqual(Parser.parse(`0 HEAD`)[0].value, null)
		assert.strictEqual(Parser.parse(`0 HEAD`)[0].parentRecord, null)
		assert.strictEqual(Parser.parse(`1 SUBM @U1`).length, 0)

	})

	it("singleRecord", () => {

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
		assert.strictEqual(records.length, 1)
		assert.strictEqual(records[0].name, "HEAD")
		assert.strictEqual(records[0].records.length, 7)
		assert.strictEqual(records[0].value, null)

		assert.strictEqual(records[0].records[0].name, "GEDC")
		assert.strictEqual(records[0].records[0].records[0].name, "VERS")
		assert.strictEqual(records[0].records[0].records.length, 2)
		assert.strictEqual(records[0].records[0].records[0].value, "5.5.5")
		assert.strictEqual(records[0].records[0].parentRecord, records[0])
		assert.strictEqual(records[0].records[0].records[0].parentRecord, records[0].records[0])

		assert.strictEqual(records[0].records[0].records[1].name, "FORM")
		assert.strictEqual(records[0].records[0].records[1].records.length, 1)
		assert.strictEqual(records[0].records[0].records[1].records[0].name, "VERS")
		assert.strictEqual(records[0].records[0].records[1].parentRecord, records[0].records[0])

		assert.strictEqual(records[0].records[1].name, "CHAR")
		assert.strictEqual(records[0].records[1].records.length, 0)
		assert.strictEqual(records[0].records[1].parentRecord, records[0])

		assert.strictEqual(records[0].records[2].name, "SOUR")
		assert.strictEqual(records[0].records[2].records.length, 3)
		assert.strictEqual(records[0].records[2].parentRecord, records[0])

		assert.strictEqual(records[0].records[2].records[0].name, "NAME")
		assert.strictEqual(records[0].records[2].records[0].records.length, 0)
		assert.strictEqual(records[0].records[2].records[0].value, "The GEDCOM Site")
		assert.strictEqual(records[0].records[2].records[0].parentRecord, records[0].records[2])

		assert.strictEqual(records[0].records[2].records[1].name, "VERS")
		assert.strictEqual(records[0].records[2].records[1].records.length, 0)
		assert.strictEqual(records[0].records[2].records[1].parentRecord, records[0].records[2])

		assert.strictEqual(records[0].records[2].records[2].name, "CORP")
		assert.strictEqual(records[0].records[2].records[2].records[0].name, "ADDR")
		assert.strictEqual(records[0].records[2].records[2].records[0].parentRecord, records[0].records[2].records[2])
		assert.strictEqual(records[0].records[2].records[2].parentRecord, records[0].records[2])

		assert.strictEqual(records[0].records[2].records[2].records[0].records.length, 1)
		assert.strictEqual(records[0].records[2].records[2].records[0].records[0].name, "CITY")
		assert.strictEqual(records[0].records[2].records[2].records[0].records[0].parentRecord, records[0].records[2].records[2].records[0])

		assert.strictEqual(records[0].records[2].records[2].records[1].name, "WWW")
		assert.strictEqual(records[0].records[2].records[2].records[1].records.length, 0)
		assert.strictEqual(records[0].records[2].records[2].records[1].parentRecord, records[0].records[2].records[2])

		assert.strictEqual(records[0].records[3].name, "DATE")
		assert.strictEqual(records[0].records[3].records.length, 1)
		assert.strictEqual(records[0].records[3].parentRecord, records[0])

		assert.strictEqual(records[0].records[3].records[0].name, "TIME")
		assert.strictEqual(records[0].records[3].records[0].records.length, 0)
		assert.strictEqual(records[0].records[3].records[0].value, "0:00:00")
		assert.strictEqual(records[0].records[3].records[0].parentRecord, records[0].records[3])

		assert.strictEqual(records[0].records[4].name, "FILE")
		assert.strictEqual(records[0].records[4].records.length, 0)
		assert.strictEqual(records[0].records[4].parentRecord, records[0])

		assert.strictEqual(records[0].records[5].name, "LANG")
		assert.strictEqual(records[0].records[5].records.length, 0)
		assert.strictEqual(records[0].records[5].parentRecord, records[0])

		assert.strictEqual(records[0].records[6].name, "SUBM")
		assert.strictEqual(records[0].records[6].records.length, 0)
		assert.strictEqual(records[0].records[6].parentRecord, records[0])

	})

	it("multipleRecords", () => {

		const records = Parser.parse(`0 HEAD
1 GEDC
0 FORM LINEAGE-LINKED
1 VERS 5.5.5
	`	)
		assert.strictEqual(records[0].name, "HEAD")
		assert.strictEqual(records[0].records[0].name, "GEDC")
		assert.strictEqual(records[1].name, "FORM")
		assert.strictEqual(records[1].records[0].name, "VERS")

	})

	it("levelOrder", () => {

			const records = Parser.parse(`0 HEAD
1 GEDC
4 CITY LEIDEN
2 CORP gedcom.org
1 TEST
		`	)
			assert.strictEqual(Parser.parse(`0 HEAD`).length, 1)

			assert.strictEqual(records[0].name, "HEAD")
			assert.strictEqual(records.length, 1)
			assert.strictEqual(records[0].records.length, 2)
			assert.strictEqual(records[0].records[0].name, "GEDC")
			assert.strictEqual(records[0].records[0].parentRecord, records[0])
			assert.strictEqual(records[0].records[0].records[0].parentRecord, records[0].records[0])
			assert.strictEqual(records[0].records[0].records[0].name, "CORP")
			assert.strictEqual(records[0].records[0].records[0].value, "gedcom.org")
			assert.strictEqual(records[0].records[1].parentRecord, records[0])
			assert.strictEqual(records[0].records[1].name, "TEST")

			assert.strictEqual(Parser.parse(`1 HEAD`).length, 0)
			assert.strictEqual(Parser.parse(`1 HEAD
0 TEST`)[0].name, "TEST")
			assert.strictEqual(Parser.parse(`1 HEAD
2 TEST`).length, 0)
			assert.strictEqual(Parser.parse(`1 HEAD
1 TEST`).length, 0)
			assert.strictEqual(Parser.parse(`0 HEAD
2 TEST`).length, 1)
			assert.strictEqual(Parser.parse(`0 HEAD
2 TEST`)[0].records.length, 0)

			const records_ = Parser.parse(`0 HEAD
1 GEDC
0 VERS 5.5.5
2 VERS 5.5.5`)

			assert.strictEqual(records_.length, 2)
			assert.strictEqual(records_[0].records[0].parentRecord, records_[0])
			assert.strictEqual(records_[0].records[0].name, "GEDC")
			assert.strictEqual(records_[0].records.length, 1)
			assert.strictEqual(records_[0].records[0].records[0].parentRecord, records_[0].records[0])
			assert.strictEqual(records_[0].records[0].records[0].name, "VERS")
			assert.strictEqual(records_[0].records[0].records.length, 1)

	})

})
