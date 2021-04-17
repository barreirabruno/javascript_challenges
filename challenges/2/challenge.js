/*
 * Normalização de estruturas
 */

/* ENUNCIADO
 *
 * Você deve escrever uma função que realize a
 * normalização da estrutura representada pela variável input de
 * forma que o retorno seja compatível com a variável output
 *
 */

/*
 * [INPUT] Object
 * {
 *   "id": "6197b77e-3942-11ea-a137-2e728ce88125",
 *   "user": {
 *     "id": "6197ba94",
 *     "name": "Laura"
 *   },
 *   "reports": [
 *     {
 *       "id": "51ddf1a9",
 *       "result": {
 *         "document": "356.4325-10",
 *         "status": "em análise",
 *       }
 *     }
 *   ]
 * }
 *
 * [OUTPUT] Object
 *  {
 *   "results": {
 *     "6197b77e-3942-11ea-a137-2e728ce88125": {
 *       id: "6197b77e-3942-11ea-a137-2e728ce88125",
 *       user: "6197ba94",
 *       reports: ["51ddf1a9"]
 *     }
 *   },
 *   "users": {
 *     "6197ba94": { "id": "6197ba94", "name": "Laura" }
 *   },
 *   "reports": {
 *     "51ddf1a9": {
 *        "id": "51ddf1a9",
 *        "user": "6197ba94",
 *        "document": "356.4325-10",
 *        "status": "em análise",
 *      }
 *    }
 *  }
 */


const normalizeData = unormalized => {
  return Object.keys(unormalized).reduce((finalObject, objectKey, index, arraySource) => {
    if (typeof unormalized[objectKey] === "string") {
      finalObject.results = {}
      finalObject.results[unormalized[objectKey]] = {}
    } else {
      if (Array.isArray(unormalized[objectKey])) {
        finalObject.results[unormalized[arraySource[index - 2]]].reports = []
        finalObject.reports = {}
        unormalized[objectKey].map((report, reportIndex) => {
          finalObject.results[unormalized[arraySource[index - 2]]].reports.push(report.id)
          finalObject.reports[unormalized[objectKey][reportIndex].id] = {
            id: unormalized[objectKey][reportIndex].id,
            user: unormalized[arraySource[index - 1]].id,
            document: unormalized[objectKey][reportIndex].result.document,
            status: unormalized[objectKey][reportIndex].result.status
          }
        })
      } else {
        finalObject.results[unormalized[arraySource[index - 1]]] = {
          id: unormalized[arraySource[index - 1]],
          user: unormalized[objectKey].id
        }
        finalObject.users = {}
        finalObject.users[unormalized[objectKey].id] = {
          id: unormalized[objectKey].id,
          name: unormalized[objectKey].name
        }
      }
    }
    return finalObject
  }, {})
}

module.exports = normalizeData
