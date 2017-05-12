const azure = require("azure-storage");

function makeEntity(entity, term, canonical) {
    return {
        PartitionKey : { '_' : entity },
        RowKey : { '_' : term },
        Canonical : { '_' : canonical }
    };
}

/**
 * 
 */
class Synonyms {
    /**
     * 
     */
    constructor() {
        let retryOperations = new azure.ExponentialRetryPolicyFilter();
        this.tableSvc = azure.createTableService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY).withFilter(retryOperations);
    }

    /**
     * 
     */
    import(data, callback) {
        this.tableSvc.createTableIfNotExists('synonyms', (error, result, response) => {
            if(!error){
                
                let promises = [];
        
                for(let entity in data) {
                    let canonicals = data[entity];
                    let batch = new azure.TableBatch();
                    for(let canonical in canonicals) {
                        let terms = canonicals[canonical];

                        //make sure we have a synonym entry for the canonical term
                        batch.insertOrReplaceEntity(makeEntity(entity, canonical.toLowerCase(), canonical.toLowerCase()), {echoContent: true});
                        for(let i = 0; i < terms.length; i++) {
                            batch.insertOrReplaceEntity(makeEntity(entity, terms[i].toLowerCase(), canonical.toLowerCase()), {echoContent: true});
                        }
                    }
                    promises.push(new Promise((resolve, reject) => {
                        this.tableSvc.executeBatch('synonyms', batch, (batchError, batchResult, batchResponse) => {
                            if(batchError) {
                                reject(batchError);
                            } else {
                                resolve(batchResult);
                            }
                        });
                    }));
                }

                Promise.all(promises).then((result) => {
                    callback(null, result);
                }, (error) => {
                    callback(error);
                });
            } else {
                callback(error);
            }
        });
    }

    /**
     * Adds a synonym to the system
     * @param {string} entity - the name of the entity this synonym is for
     * @param {string|Array} term - the synonym(s) to add
     * @param {string} canonical - the canonical representation to return on lookups
     */
    register(entity, term, canonical, callback) {
        this.tableSvc.createTableIfNotExists('synonyms', (error, result, response) => {
            if(!error){
                let batch = new azure.TableBatch();
                
                //make sure we have a synonym entry for the canonical term
                batch.insertOrReplaceEntity(makeEntity(entity, canonical, canonical), {echoContent: true});

                // Table exists or created
                if(Array.isArray(term)) {
                    for(let i = 0; i < term.length; i++) {
                        batch.insertOrReplaceEntity(makeEntity(entity, term[i], canonical), {echoContent: true});
                    }
                } else {
                    batch.insertOrReplaceEntity(makeEntity(entity, term, canonical), {echoContent: true});
                }

                this.tableSvc.executeBatch('synonyms', batch, (batchError, batchResult, batchResponse) => {
                    callback(batchError, batchResult);
                });
            } else {
                callback(error);
            }
        });
    }

    canonicalize(entity, term, callback) {
        this.tableSvc.retrieveEntity('synonyms', entity, term, (error, result, response) => {
            callback(error, result.Canonical._);
        });
    }

    canonicalizeBatch(pairs, callback) {
        let query = new azure.TableQuery().select(["PartitionKey", "RowKey", "Canonical"]);
        let batch = new azure.TableBatch();
        for(let i = 0; i < pairs.length; i++) {
            if(i === 0) {
                query.where("PartitionKey eq ? and RowKey eq ?", pairs[i].entity, pairs[i].term);
            } else {
                query.or("PartitionKey eq ? and RowKey eq ?", pairs[i].entity, pairs[i].term);
            }
        }

        this.tableSvc.queryEntities('synonyms', query, null, (error, result) => {
            callback(error, result.entries.map(x=> ({ entity: x.PartitionKey._, canonical : x.Canonical._, synonym: x.RowKey._})))
        });
    }

    canonicalizeEntities(entities, callback) {
        if(entities && entities.length) {
            let query = entities.reduce((prev, curr, ind, arr) => {
                if(0 === ind) {
                    return prev.where("PartitionKey eq ? and RowKey eq ?", curr.type, curr.entity);
                } else {
                    return prev.or("PartitionKey eq ? and RowKey eq ?", curr.type, curr.entity);
                }
            }, new azure.TableQuery().select(["PartitionKey", "RowKey", "Canonical"]));

            this.tableSvc.queryEntities('synonyms', query, null, (error, result) => {
                let canonicalEntities = entities.map((value, index, array) => {
                    result.entries
                        .filter(x => value.type === x.PartitionKey._ && value.entity == x.RowKey._)
                        .forEach(x=> Object.assign(value, { canonical : x.Canonical._ }));
                    
                    return value;
                });

                callback(null, canonicalEntities);
            });
        }
        else {
            callback(null, entities);
        }
    }

    synonyms(entity, canonical, callback) {
        let query = new azure.TableQuery().select('RowKey').where('PartitionKey eq ?', entity).and('Canonical eq ?', canonical);
        this.tableSvc.queryEntities('synonyms', query, null, (error, result) => {
            callback(error, result.entries.map(x => x.RowKey._));
        });
    }
}

module.exports = Synonyms;