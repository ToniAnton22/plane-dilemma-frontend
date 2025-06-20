import RequestManager from "$lib/helpers/RequestManager.js";

const requestManager = new RequestManager(new Map(), new Map());

export const starter = async (DB_HOST, X_API_KEY) => {  
  const entities = [
	/* core & meta */
	'Campaign',
	'User',
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
          console.log("Error: " + e);
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
    /* core & meta (0-2) */
    campaigns:               results[0],
    users:                   results[1],
    visibilityTypes:         results[2],

    /* narrative timeline (3-7) */
    campaignLog:             results[3],
    sessionSummaries:        results[4],
    contexts:                 results[5],
    dialogueLogs:             results[6],
    trackings:                results[7],

    /* choices & interactions (8-9) */
    choices:                 results[8],
    interactions:            results[9],

    /* primary entities (10-16) */
    players:                 results[10],
    npcs:                    results[11],
    locations:               results[12],
    factions:                results[13],
    items:                   results[14],
    resources:               results[15],
    parties:                 results[16],

    /* membership / ownership & links (17-23) */
    partyMembers:            results[17],
    itemOwnerships:          results[18],
    locationNpcs:            results[19],
    locationContextLinks:    results[20],
    locationEventLinks:      results[21],
    entityLinks:             results[22],
    sessionEntityLinks:      results[23],

    /* quests, rewards, events (24-28) */
    quests:                  results[24],
    rewards:                 results[25],
    questRewardLinks:        results[26],
    questLocationLinks:      results[27],
    events:                  results[28],

    /* relationships (29-30) */
    relationships:           results[29],
    relationshipChangeLogs:  results[30],

    /* notes (31-32) */
    notes:                   results[31],
    noteLinks:               results[32]
    };
};

const responseDbHandler = async function(url, tries, delay, X_API_KEY) {
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
                await new Promise(resolve => setTimeout(resolve, delay));
                return responseDbHandler(url, tries - 1, delay, X_API_KEY);
            }
        }  
     
        throw new Error(`Request failed with status: ${'No response'}`);
    } catch(e) {
        console.error("Error:", e);
        // Re-throw the error to handle it in the calling function
        throw e;
    }
};

const databaseQueryHandler = async (type, DB_HOST, X_API_KEY) =>{
  console.log(`Performing DB query: ${type}`)


  return await requestManager.throttledRequest(
    () => responseDbHandler(`${DB_HOST}${type}`,5,6000, X_API_KEY),
    {key: `db-query-${type}`, cacheMs: 30000}
  )
}

const fetchData = async (entityName, DB_HOST, X_API_KEY) => {
 
    const response = await databaseQueryHandler(entityName, DB_HOST, X_API_KEY);

    return response
}
