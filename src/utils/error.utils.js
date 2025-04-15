function isTrustedError (error) {
  return error?.isOperational || false
}

function getLocalizedError (error) {
  const localizedError = {
    name: error.name,
    description: error.description,
    errorCode: error.errorCode,
    fields: error.fields
  }

  return localizedError
}

function extractErrorAttributes (errors) {
  const errorAttributes = []
  for (const serviceName in errors) {
    if (Object.hasOwnProperty.call(errors, serviceName)) {
      const serviceErrors = errors[serviceName]
      for (const errAttr in serviceErrors) {
        if (Object.hasOwnProperty.call(serviceErrors, errAttr)) {
          errorAttributes.push(errAttr)
        }
      }
    }
  }
  return errorAttributes
}

export {
  isTrustedError,
  getLocalizedError,
  extractErrorAttributes
}
