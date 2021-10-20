/** @module parser */

import * as Tokenizer from "./tokenizer.js"
import Record from "./record.js"

/**
 * @param   {string} str
 * @returns {Object[]}
 */
function tokenize(str) {
	const tokens = Tokenizer.tokenize(str)
	const lines = []
	const line = []
	for(const [index, token] of tokens.entries()) {
		if(token.name !== "separator" && token.name !== "line feed") {
			line.push(token)
		}
		if(token.name === "line feed" || index === tokens.length - 1) {
			lines.push([ ...line ])
			line.splice(0, line.length)
		}
	}
	return lines
}

/**
 * @param   {string} 	 str
 * @returns {Record[]}
 */
function parse(str) {
	const lines = tokenize(str)
	const records = []

	const flatRecords = []

	for(const line of lines) {

		const level = parseInt(line[0].buffer)

		const record = new Record(line[1].buffer)

		if(line.length === 3) {
			record.value = line[2].buffer
		}

		flatRecords.push({ level, record })

	}

	for(const [index, flatRecord] of flatRecords.entries()) {
		if(flatRecord.level === 0) {
			records.push(flatRecord.record)
		} else {
			const parentFlatRecords = flatRecords.slice(0, index)
			parentFlatRecords.reverse()
			const parentFlatRecord = parentFlatRecords.find(flatRecord_ => flatRecord_.level === flatRecord.level - 1)
			if(parentFlatRecord) {
				parentFlatRecord.record.appendChild(flatRecord.record)
			}
		}
	}

	return records
}

export {
	tokenize,
	parse
}
