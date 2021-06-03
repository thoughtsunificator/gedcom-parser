# gedcom-parser [![Build Status](https://travis-ci.com/thoughtsunificator/gedcom-parser.svg?branch=master)](https://travis-ci.com/thoughtsunificator/gedcom-parser)

Tiny GEDCOM parser.

## Getting Started

### Installing

- ``npm install  @thoughtsunificator/gedcom-parser``

### Usage

````javascript
import { Parser } from '@thoughtsunificator/gedcom-parser'

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
`)

````

## API

See [https://thoughtsunificator.github.io/gedcom-parser](https://thoughtsunificator.github.io/gedcom-parser).

## Try it out!

See [https://codesandbox.io/s/gedcom-parser-m11io](https://codesandbox.io/s/gedcom-parser-m11io).
