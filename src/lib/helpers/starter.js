import RequestManager from "$lib/helpers/RequestManager.js";

const requestManager = new RequestManager(new Map(), new Map());

export const starter = async (DB_HOST, X_API_KEY) => {  
  const entities = [
      'CampaignLog', 'Choice', 'context', 'DialogueLog', 'Events', 'Faction', 'Interaction', 'Item', 'LocationNpc', 'locations', 'Note', 'npcs', 'Party', 'PartyMembers', 'players', 'QuestReward', 'Quest', 'Relationship', 'Resource', 'Reward', 'session-npcs', 'SessionPlayer', 'summary', 'Tracking', 'VisibilityTypes'
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
      campaignLog: results[0],
      choices: results[1],
      context: results[2],
      dialogueLog: results[3],
      events: results[4],
      factions: results[5],
      interactions: results[6],
      items: results[7],
      locationNpcs: results[8],
      locations: results[9],
      notes: results[10],
      npcs: results[11],
      parties: results[12],
      partyMembers: results[13],
      players: results[14],
      questRewards: results[15],
      quests: results[16],
      relationships: results[17],
      resources: results[18],
      rewards: results[19],
      sessionNpcs: results[20],
      sessionPlayers: results[21],
      sessionSummaries: results[22],
      tracking: results[23],
      visibilityTypes: results[24]
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
