import * as R from 'ramda'

export const mapEntriesToObject = entries =>
  entries.map(([key, value]) => ({
    [key]: value,
  }))

export const getEntriesList = R.pipe(Object.entries, mapEntriesToObject)
