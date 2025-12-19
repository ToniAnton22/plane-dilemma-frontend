import requestManager from './RequestManager';
import requestQueue from './RequestQueue';
import schema from './DbSchemas';
import { DB_HOST, DAVE_KEY, CAMPAIGN_ID, INTERNAL_KEY } from '$env/static/private';

// Define the possible entity names as a union type
type EntityName =
	| 'Campaign'
	| 'CampaignLog'
	| 'SessionSummary'
	| 'Context'
	| 'DialogueLog'
	| 'Tracking'
	| 'Choice'
	| 'Interaction'
	| 'Player'
	| 'Npc'
	| 'Location'
	| 'Faction'
	| 'Item'
	| 'Resource'
	| 'Party'
	| 'PartyMember'
	| 'ItemOwnership'
	| 'LocationNpc'
	| 'LocationContextLink'
	| 'LocationEventLink'
	| 'EntityLink'
	| 'SessionEntityLink'
	| 'Quest'
	| 'Reward'
	| 'QuestRewardLink'
	| 'QuestLocationLink'
	| 'Event'
	| 'Relationship'
	| 'RelationshipChangeLog'
	| 'Note'
	| 'NoteLink';

// Map entity names to their corresponding schema types
type EntityTypeMap = {
	Campaign: schema.Campaign[];
	CampaignLog: schema.CampaignLog[];
	SessionSummary: schema.SessionSummary[];
	Context: schema.Context[];
	DialogueLog: schema.DialogueLog[];
	Tracking: schema.Tracking[];
	Choice: schema.Choice[];
	Interaction: schema.Interaction[];
	Player: schema.Player[];
	Npc: schema.Npc[];
	Location: schema.Location[];
	Faction: schema.Faction[];
	Item: schema.Item[];
	Resource: schema.Resource[];
	Party: schema.Party[];
	PartyMember: schema.PartyMember[];
	ItemOwnership: schema.ItemOwnership[];
	LocationNpc: schema.LocationNpc[];
	LocationContextLink: schema.LocationContextLink[];
	LocationEventLink: schema.LocationEventLink[];
	EntityLink: schema.EntityLink[];
	SessionEntityLink: schema.SessionEntityLink[];
	Quest: schema.Quest[];
	Reward: schema.Reward[];
	QuestRewardLink: schema.QuestRewardLink[];
	QuestLocationLink: schema.QuestLocationLink[];
	Event: schema.Event[];
	Relationship: schema.Relationship[];
	RelationshipChangeLog: schema.RelationshipChangeLog[];
	Note: schema.Note[];
	NoteLink: schema.NoteLink[];
};

// Define the return type structure with proper pluralized keys
type StarterReturnType = {
	campaigns?: EntityTypeMap['Campaign'];
	campaignLogs?: EntityTypeMap['CampaignLog'];
	sessionSummaries?: EntityTypeMap['SessionSummary'];
	contexts?: EntityTypeMap['Context'];
	dialogueLogs?: EntityTypeMap['DialogueLog'];
	trackings?: EntityTypeMap['Tracking'];
	choices?: EntityTypeMap['Choice'];
	interactions?: EntityTypeMap['Interaction'];
	players?: EntityTypeMap['Player'];
	npcs?: EntityTypeMap['Npc'];
	locations?: EntityTypeMap['Location'];
	factions?: EntityTypeMap['Faction'];
	items?: EntityTypeMap['Item'];
	resources?: EntityTypeMap['Resource'];
	parties?: EntityTypeMap['Party'];
	partyMembers?: EntityTypeMap['PartyMember'];
	itemOwnerships?: EntityTypeMap['ItemOwnership'];
	locationNpcs?: EntityTypeMap['LocationNpc'];
	locationContextLinks?: EntityTypeMap['LocationContextLink'];
	locationEventLinks?: EntityTypeMap['LocationEventLink'];
	entityLinks?: EntityTypeMap['EntityLink'];
	sessionEntityLinks?: EntityTypeMap['SessionEntityLink'];
	quests?: EntityTypeMap['Quest'];
	rewards?: EntityTypeMap['Reward'];
	questRewardLinks?: EntityTypeMap['QuestRewardLink'];
	questLocationLinks?: EntityTypeMap['QuestLocationLink'];
	events?: EntityTypeMap['Event'];
	relationships?: EntityTypeMap['Relationship'];
	relationshipChangeLogs?: EntityTypeMap['RelationshipChangeLog'];
	notes?: EntityTypeMap['Note'];
	noteLinks?: EntityTypeMap['NoteLink'];
};

export const starter = async (
	options: EntityName[] = [],
	exclude: EntityName[] = [],
	auth
): Promise<StarterReturnType> => {
	let entities: EntityName[] = [
		/* core & meta */
		'Campaign',

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
	var CHUNK_SIZE = 5;
	const batches: EntityName[][] = [];
	const readEntity = async (entityName: EntityName): Promise<any> => {
		try {
			const lowerCaseName = entityName.replace(/^[A-Z]/, (c) => c.toLowerCase());
			console.log('Getting the ' + lowerCaseName);
			let data = await requestQueue.enqueue(
				async () =>
					await requestManager.throttledRequest(async () => {
						return await responseDbHandler(
							`${DB_HOST}/api/${entityName}?campaignId=${CAMPAIGN_ID}`,
							5,
							4000,
							DAVE_KEY,
							'GET',
							auth
						);
					},{key:`${lowerCaseName}`})
			);
	
			if (data) {
				return data;
			} else {
				console.log('Something went wrong');
				return {};
			}
		} catch (e) {
			console.log('Error: ' + e);
			return {};
		}
	};

	let i = 0;

	if (options && options.length > 0) {
		entities = entities.filter((entity) => options.includes(entity));
	}

	while (i < entities.length) {
		if (i + CHUNK_SIZE > entities.length) {
			batches.push(entities.slice(i));
			break;
		} else {
			batches.push(entities.slice(i, i + CHUNK_SIZE));
			i += CHUNK_SIZE;
		}
	}

	const results: PromiseSettledResult<any>[] = [];

	for (const batch of batches) {
		const batchData = await Promise.allSettled(batch.map(readEntity));
		const batchedProcess = batchData.map((value) => {
			return value.value;
		});
		results.push(...batchedProcess);
	}

	if (results) {
		// await api.startLoadJson()
	}

	const toCamelCase = (str: string): string => {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	const pluralOverrides: Record<EntityName, string> = {
		SessionSummary: 'sessionSummaries',
		Party: 'parties',
		NoteLink: 'noteLinks',
		QuestRewardLink: 'questRewardLinks',
		QuestLocationLink: 'questLocationLinks',
		RelationshipChangeLog: 'relationshipChangeLogs',
		DialogueLog: 'dialogueLogs',
		CampaignLog: 'campaignLogs',
		LocationNpc: 'locationNpcs',
		LocationContextLink: 'locationContextLinks',
		LocationEventLink: 'locationEventLinks',
		ItemOwnership: 'itemOwnerships',
		PartyMember: 'partyMembers',
		EntityLink: 'entityLinks',
		SessionEntityLink: 'sessionEntityLinks',

		Campaign: 'campaigns',
		Context: 'contexts',
		Tracking: 'trackings',
		Choice: 'choices',
		Interaction: 'interactions',
		Player: 'players',
		Npc: 'npcs',
		Location: 'locations',
		Faction: 'factions',
		Item: 'items',
		Resource: 'resources',
		Quest: 'quests',
		Reward: 'rewards',
		Event: 'events',
		Relationship: 'relationships',
		Note: 'notes'
	};

	const resultObject: StarterReturnType = {};
	entities.forEach((entity, index) => {
		const key = pluralOverrides[entity] || toCamelCase(entity) + (entity.endsWith('s') ? '' : 's');
		(resultObject as any)[key] = results[index];
	});
	return resultObject;
};

const responseDbHandler = async function (url, tries, delay, daveKey, method, auth) {
	try {
		if (tries > 0) {
			const response = await fetch(url, {
				method,
				headers: {
					'DAVE-KEY': daveKey,
					Authorization: `Bearer ${auth}`,
					'X-Internal-Request': INTERNAL_KEY
				}
			});

			if (response.ok) {

				return await response.json();
			}

			// Using includes for cleaner code
			if ([502, 500, 504, 429].includes(response.status)) {
				console.error(`Error: ${response.statusText} in ${type}`);
				await new Promise((resolve) => setTimeout(resolve, delay));
				return responseDbHandler(url, tries - 1, delay, DAVE_KEY, 'GET', auth);
			}
		}

		throw new Error(`Request failed with status: ${'No response'}`);
	} catch (e) {
		console.error(`Error: ${e} in ${type}`);

		throw e;
	}
};
