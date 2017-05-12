const ADD_SYNONYM = "ADD_SYNONYM";
const DELETE_CANONICAL = "DELETE_CANONICAL";


export function addSynonym(entity, canonical, synonym) {
    return {
        type: ADD_SYNONYM,
        entity: entity,
        canonical: canonical,
        synonym: synonym
    };
}