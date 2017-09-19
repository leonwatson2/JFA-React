const responses = {
    OK:200,
    CREATED:201,
    ACCEPTED:202,
    NO_CONTENT:204,
    NOT_MODIFIED:304,
    BAD_REQUEST:400,
    FORBIDDEN:403,
    NOT_FOUND:404,
    SERVER_ERROR:500
}

const handleError = (res, reason, message, code)=> {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}
const hasPropertiesInBody = (properties) => {
    return (req, res, next)=>{
      properties.forEach(property => {
        if(!(property in req.body))
          handleError(res, `No ${property} object passed.`, `No ${property} object passed.`, responses.BAD_REQUEST)
      });
      if(!res.headersSent)
        next()
    }
  }
  
  const hasParams = (params) => {
    return (req, res, next) =>{
      params.forEach( param =>{
        if(!(param in req.params))
        handleError(res, `No ${param} param passed.`, `No ${param} param passed.`, responses.BAD_REQUEST)
      })
      if(!res.headersSent)
        next()
    }
  }
  const hasQueries = (queries) => {
    return (req, res, next) =>{
      queries.forEach( query =>{
        if(!(query in req.query))
        handleError(res, `No ${query} query passed.`, `No ${query} query passed.`, responses.BAD_REQUEST)
      })
      if(!res.headersSent)
        next()
    }
  }

module.exports = {
    handleError,
    hasParams,
    hasQueries,
    hasPropertiesInBody,
    responses    
}