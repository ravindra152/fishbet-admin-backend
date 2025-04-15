import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvKeywords from 'ajv-keywords'

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all', allowUnionTypes: true, useDefaults: true })

addFormats(ajv)
ajvKeywords(ajv)

export default ajv
