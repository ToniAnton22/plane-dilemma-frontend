import RequestManager from "$lib/helpers/RequestManager.js";

const requestManager = new RequestManager(new Map(), new Map());

export const starter = async (DB_HOST, X_API_KEY) => {  
  const entities = [
	/* core & meta */
	'Campaign',
	'VisibilityType',

	/* narrative timeline */
	'CampaignLog',
	'SessionSummary',
	'Context',
	'DialogueLog',
	'Tracking',

	/* choices & interactions */
	'Choice',
	'Interaction',

	/* primary entities */
	'Player',
	'Npc',
	'Location',
	'Faction',
	'Item',
	'Resource',
	'Party',

	/* membership & polymorphic links */
	'PartyMember',
	'ItemOwnership',
	'LocationNpc',
	'LocationContextLink',
	'LocationEventLink',
	'EntityLink',
	'SessionEntityLink',

	/* quests, rewards, events */
	'Quest',
	'Reward',
	'QuestRewardLink',
	'QuestLocationLink',
	'Event',

	/* relationships */
	'Relationship',
	'RelationshipChangeLog',

	/* notes */
	'Note',
	'NoteLink'
];
  const CHUNK_SIZE = 5;
  const batches = []

  const readEntity = async (entityName) => {
      try {
          let data = await fetchData(entityName, DB_HOST, X_API_KEY);
   
          if (data) {
              return data;
          } else {
              console.log("Something went wrong");
              return {};
          }
      } catch (e) {
          console.log(e);
          return {};
      }
  };

  let i = 0;

  while(i < entities.length) {
    if(i + CHUNK_SIZE > entities.length) {
        batches.push(entities.slice(i))
        break
    }else{
        batches.push(entities.slice(i, i + CHUNK_SIZE))
        i += CHUNK_SIZE;
    }
  }

  const results = []
  
  for (const batch of batches) {
    const batchData = await Promise.allSettled(batch.map(readEntity));
    results.push(...batchData);
  }


return {
	/* ─── core & meta (0-1) ─── */
	campaigns:              results[0],
	visibilityTypes:        results[1],

	/* ─── narrative timeline (2-6) ─── */
	campaignLogs:            results[2],
	sessionSummaries:       results[3],
	contexts:               results[4],
	dialogueLogs:           results[5],
	trackings:              results[6],

	/* ─── choices & interactions (7-8) ─── */
	choices:                results[7],
	interactions:           results[8],

	/* ─── primary entities (9-15) ─── */
	players:                results[9],
	npcs:                   results[10],
	locations:              results[11],
	factions:               results[12],
	items:                  results[13],
	resources:              results[14],
	parties:                results[15],

	/* ─── membership / ownership & links (16-22) ─── */
	partyMembers:           results[16],
	itemOwnerships:         results[17],
	locationNpcs:           results[18],
	locationContextLinks:   results[19],
	locationEventLinks:     results[20],
	entityLinks:            results[21],
	sessionEntityLinks:     results[22],

	/* ─── quests, rewards, events (23-27) ─── */
	quests:                 results[23],
	rewards:                results[24],
	questRewardLinks:       results[25],
	questLocationLinks:     results[26],
	events:                 results[27],

	/* ─── relationships (28-29) ─── */
	relationships:          results[28],
	relationshipChangeLogs: results[29],

	/* ─── notes (30-31) ─── */
	notes:                  results[30],
	noteLinks:              results[31]
};

};

const responseDbHandler = async function(url, tries, delay, X_API_KEY, type) {
    try {
        if(tries > 0) {
          
            const response = await fetch(url,{
                headers:{
                    'X-API-KEY':X_API_KEY
                }
            });

            if(response.ok) {
                return await response.json();
            }
            
            // Using includes for cleaner code
            if([502, 500, 504, 429].includes(response.status)) {
				console.error(`Error: ${response.statusText} in ${type}`)
                await new Promise(resolve => setTimeout(resolve, delay));
                return responseDbHandler(url, tries - 1, delay, X_API_KEY,type);
            }
        }  
     
        throw new Error(`Request failed with status: ${'No response'}`);
    } catch(e) {
        console.error(`Error: ${e} in ${type}`);
        // Re-throw the error to handle it in the calling function
        throw e;
    }
};

const databaseQueryHandler = async (type, DB_HOST, X_API_KEY) =>{
  console.log(`Performing DB query: ${type}`)


  return await requestManager.throttledRequest(
    () => responseDbHandler(`${DB_HOST}${type}`,5,6000, X_API_KEY, type),
    {key: `db-query-${type}`, cacheMs: 30000}
  )
}

const fetchData = async (entityName, DB_HOST, X_API_KEY) => {
 
    const response = await databaseQueryHandler(entityName, DB_HOST, X_API_KEY);

    return response
}
