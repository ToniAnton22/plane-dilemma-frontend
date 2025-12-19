import { z } from 'zod';

// Exportable enums for schema fields
export enum ImpactLevel {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	CRITICAL = 'critical'
}

export const NpcVisibilityFieldEnum = z.enum([
	'name',
	'role',
	'background',
	'description',
	'motivation',
	'secret',
	'relationshipSummary',
	'behaviour',
	'image',
	'backgroundImage'
]);

export const NpcKnownToEntrySchema = z.object({
	characterId: z.string().uuid().describe('UUID of the character who knows this NPC'),

	visibilityProfileId: z
		.string()
		.uuid()
		.nullable()
		.optional()
		.describe('Optional UUID of a visibility/knowledge preset'),

	visibleFields: z
		.array(NpcVisibilityFieldEnum)
		.min(1)
		.describe('Which fields this character can see on this NPC'),

	aliasName: z
		.string()
		.max(100)
		.nullable()
		.describe('What this character calls the NPC, if different from public name'),

	perceivedRole: z
		.string()
		.max(50)
		.nullable()
		.describe('What the character believes the NPC’s role/job is'),

	perceivedFaction: z
		.string()
		.max(100)
		.nullable()
		.describe('What the character believes the NPC’s faction is'),

	notes: z
		.string()
		.max(500)
		.nullable()
		.describe('Notes about what this character knows or believes about the NPC'),

	firstLearnedInSessionId: z
		.string()
		.uuid()
		.nullable()
		.describe('Session where this character first learned of the NPC')
});

export enum EntityType {
	PLAYER = 'Player',
	NPC = 'Npc',
	FACTION = 'Faction',
	ITEM = 'Item',
	LOCATION = 'Location',
	QUEST = 'Quest',
	EVENT = 'Event',
	REWARD = 'Reward',
	RESOURCE = 'Resource',
	PARTY = 'Party',
	CONTEXT = 'Context',
	OTHER = 'Other'
}

export enum SpeakerType {
	PLAYER = 'Player',
	NPC = 'Npc'
}

export enum TabNameType {
	DEN = 'Den',
	RELATIONSHIPS = 'Relationships',
	SESSIONS = 'Sessions'
}

export enum OwnerType {
	PLAYER = 'Player',
	NPC = 'Npc',
	FACTION = 'Faction',
	PARTY = 'Party',
	LOCATION = 'Location'
}

export enum LocationNpcRole {
	GUARD = 'guard',
	OWNER = 'owner',
	VISITOR = 'visitor',
	RESIDENT = 'resident',
	OTHER = 'other'
}

export enum ItemRarity {
	COMMON = 'common',
	UNCOMMON = 'uncommon',
	RARE = 'rare',
	VERY_RARE = 'very_rare',
	LEGENDARY = 'legendary'
}

export enum CharacterType {
	PLAYER = 'Player',
	NPC = 'Npc'
}

export enum QuestType {
	MAIN = 'Main',
	SIDE = 'Side',
	PERSONAL = 'Personal',
	FACTION = 'Faction',
	INVESTIGATION = 'Investigation',
	EXPLORATION = 'Exploration',
	COMBAT = 'Combat',
	SOCIAL = 'Social'
}

export enum QuestStatus {
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
	COMPLETED = 'Completed',
	FAILED = 'Failed',
	ON_HOLD = 'On Hold',
	CANCELLED = 'Cancelled'
}

export enum QuestProgressStatus {
	NOT_STARTED = 'Not Started',
	EARLY_PROGRESS = 'Early Progress',
	IN_PROGRESS = 'In Progress',
	NEARLY_COMPLETE = 'Nearly Complete',
	COMPLETED = 'Completed',
	STALLED = 'Stalled',
	FAILED = 'Failed'
}

export enum RelationshipType {
	FRIEND = 'Friend',
	RIVAL = 'Rival',
	MENTOR = 'Mentor',
	ALLY = 'Ally',
	ENEMY = 'Enemy',
	FAMILY = 'Family',
	OWNER = 'Owner',
	SUBORDINATE = 'Subbordinate',
	OTHER = 'Other'
}

export enum RelationshipStatus {
	ACTIVE = 'active',
	DEAD = 'dead',
	SECRET = 'secret',
	DORMANT = 'dormant'
}

export enum ResourceType {
	GOLD = 'Gold',
	INGREDIENT = 'Ingredient',
	AMMO = 'Ammo',
	GEM = 'Gem',
	RELIC = 'Relic',
	OTHER = 'Other'
}

export enum RewardType {
	GOLD = 'Gold',
	ITEM = 'Item',
	REPUTATION = 'Reputation',
	XP = 'XP',
	FAVOR = 'Favor',
	OTHER = 'Other'
}

export enum LinkedEntityType {
	ITEM = 'Item',
	RESOURCE = 'Resource',
	QUEST = 'Quest',
	NONE = 'None'
}

export enum SourceType {
	MANUAL = 'Manual',
	AI = 'AI',
	SYSTEM = 'System'
}

export enum TrackingType {
	ARRIVED = 'Arrived',
	LEFT = 'Left',
	PASSED_THROUGH = 'PassedThrough',
	OTHER = 'Other'
}

export enum VisibilityScope {
	GLOBAL = 'Global',
	CAMPAIGN = 'Campaign',
	PERSONAL = 'Personal',
	DM = 'DM',
	ADMIN = 'Admin'
}

/**
 * Campaign record without the primary key (CampaignId).
 * Used when creating or updating a campaign via the API.
 */
export const CampaignSchema = z
	.object({
		name: z
			.string()
			.min(1)
			.max(100)
			.describe('Public title of the campaign, shown in pickers and dashboards'),
		description: z
			.string()
			.max(500)
			.nullable()
			.describe('Optional synopsis or pitch that summarises the campaign setting'),
		dungeonMasterId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the primary DM account; null if not assigned yet'),
		createdAt: z
			.date()
			.optional()
			.describe('UTC timestamp when the campaign record was created; defaults to now'),
		isActive: z
			.boolean()
			.optional()
			.describe('True if the campaign is currently running; false when archived'),
		theme: z
			.string()
			.max(64)
			.nullable()
			.describe('Optional UI theme / colour-scheme key used to style the campaign'),
		isDeleted: z
			.boolean()
			.optional()
			.describe(
				'True if the campaign was deleted. You as an LLM will never interact with this. Always false.'
			)
	})
	.describe('Schema for creating or updating a campaign (primary key generated server-side)');

export const CampaignLogSchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this log entry belongs to'),

		log_date: z
			.date()
			.nullable()
			.default(() => new Date())
			.describe('In-world or calendar date of the log entry (ISO 8601, YYYY-MM-DD)'),

		description: z
			.string()
			.max(2000)
			.nullable()
			.describe('Narrative description of what happened during the session or event'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session that generated this log; null for off-session notes'),

		tag: z
			.array(z.string().max(30))
			.nullable()
			.transform((arr) => (arr ? JSON.stringify(arr) : null))
			.describe('Quick label for filtering, e.g. “[downtime”, “recap”, “loot”]')
	})
	.describe('Represents a single campaign log entry without its primary key.');

export const ChoiceSchema = z
	.object({
		campaignId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the campaign this choice belongs to; null if inferred from sessionId'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session in which the choice occurred'),

		playerId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the player who made the choice; null for system/NPC choices'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('Narrative context or scene in which the choice was presented'),

		impact: z
			.nativeEnum(ImpactLevel)
			.describe(
				'A one word rating on how impactful the choice was in the story based on the current flow of the story or future implications of the choice (low,medium,high,critical)'
			),

		description: z
			.string()
			.max(1000)
			.nullable()
			.describe('Prompt or text describing the decision offered to the player'),

		outcome: z.string().max(1500).nullable().describe('Narrative result of choosing this option'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('Visibility level UUID that controls who can see this choice'),

		previousChoiceId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the choice that led to this one, enabling branching chains'),

		aiGeneratedInsight: z
			.string()
			.max(2000)
			.nullable()
			.describe('Optional commentary or analysis generated by AI for the DM')
	})
	.describe('Schema for creating or updating an in-game choice (ID generated by the server).');

export const ContextSchema = z
	.object({
		name: z
			.string()
			.min(1)
			.max(100)
			.nullable()
			.describe('Short human-readable title of the context or scene'),

		type: z
			.string()
			.max(50)
			.nullable()
			.describe('Category label such as “Flashback”, “Battle”, “Dream”'),

		description: z
			.string()
			.max(2000)
			.nullable()
			.describe('Detailed narrative description of the context'),

		campaignId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the campaign this context belongs to; null if inferred by session'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session where this context was introduced'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('Visibility level UUID controlling who can view this context')
	})
	.describe(
		'Schema for creating or updating a narrative context (contextId generated by the server).'
	);

/**
 * A single line of in-game dialogue captured for replay or AI analysis.
 * Primary key `dialogueId` is generated server-side.
 */
export const DialogueLogSchema = z
	.object({
		campaignId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the campaign this dialogue belongs to; null if inferred from session'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session in which the dialogue occurred'),

		contextId: z.string().uuid().nullable().describe('UUID of the narrative context or scene'),

		/* ─── speaker / target ─── */
		speakerId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the speaking entity (player character or NPC)'),

		speakerType: z
			.nativeEnum(SpeakerType)
			.nullable()
			.describe('Entity type of the speaker: "Player" or "Npc"'),

		targetId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the entity being addressed; null for a monologue'),

		targetType: z
			.nativeEnum(SpeakerType)
			.nullable()
			.describe('Entity type of the target: "Player" or "Npc"'),

		/* ─── content & meta ─── */
		dialogueText: z.string().max(4000).describe('The actual line of dialogue as spoken in-game'),

		logDate: z
			.date()
			.default(() => new Date())
			.describe('Date when the line was spoken; defaults to now if omitted'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('Visibility level UUID controlling who can view this dialogue')
	})
	.describe('Schema for creating or updating a dialogue line (ID generated by the server).');

export const EntityLinkSchema = z
	.object({
		/* ─── who is pointing ─── */
		sourceId: z
			.string()
			.uuid()
			.describe('UUID of the source entity, e.g., an Event, Faction, or Item'),

		sourceType: z.nativeEnum(EntityType).describe('Table/domain of the source entity'),

		/* ─── the target of the link ─── */
		entityId: z
			.string()
			.uuid()
			.describe('UUID of the target entity (NPC, player character, location, etc.)'),

		entityType: z.nativeEnum(EntityType).describe('Table/domain of the target entity'),

		/* ─── optional metadata ─── */
		role: z.string().max(50).nullable().describe('Semantic role, e.g., "ally", "owner", "target"'),

		notes: z
			.string()
			.max(500)
			.nullable()
			.describe('Free-form explanatory notes about the relationship'),

		/* ─── partitioning ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to')
	})
	.describe('Schema for inserting or updating an Entity-to-Entity link (no surrogate ID used).');

export const EventSchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this event belongs to'),

		name: z
			.string()
			.min(1)
			.max(100)
			.nullable()
			.describe('Public name of the event (e.g., “Siege of Northgate”)'),

		type: z
			.string()
			.max(50)
			.nullable()
			.describe('Classification such as “Battle”, “Festival”, “Political”, etc.'),

		locationId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the primary location where the event occurs'),

		scheduledDate: z
			.string()
			.date()
			.nullable()
			.describe('In-world or calendar date when the event is scheduled, ISO 8601'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('Narrative context/scene that frames the event'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the play session during which the event occurred'),

		source: z.string().max(100).describe('Origin of the event record: “DM”, “AI”, “Import”, etc.'),

		visibilityLevel: z.string().uuid().describe('UUID that controls who can view this event entry')
	})
	.describe('Schema for creating or updating an in-game event (eventId generated by the server).');

export const FactionSchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this faction belongs to'),

		name: z
			.string()
			.min(1)
			.max(100)
			.nullable()
			.describe('Name of the faction as it appears to players'),

		description: z
			.string()
			.max(2000)
			.nullable()
			.describe('Lore description of the faction, including history and goals'),

		locationId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the faction’s primary base or headquarters'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context or scene that introduces the faction'),

		ideology: z
			.string()
			.max(200)
			.nullable()
			.describe('Core beliefs or alignment of the faction (e.g., “Technocracy”, “Nature Balance”)'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID that controls who can view this faction entry')
	})
	.describe('Schema for creating or updating a faction (factionId generated by the server).');

export const InteractionSchema = z
	.object({
		/* ─── scope ─── */
		campaignId: z
			.string()
			.uuid()
			.describe('UUID of the campaign in which the interaction took place'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session that logged this interaction'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('Narrative context or scene that frames the interaction'),

		locationId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the physical location where the interaction happened'),

		/* ─── participants ─── */
		entity1Id: z.string().uuid().describe('UUID of the entity that initiated the interaction '),

		entity2Id: z.string().uuid().describe('UUID of the entity initiated'),

		entity1Type: z.nativeEnum(EntityType).describe('Type of entity of the initiator'),

		entity2Type: z.nativeEnum(EntityType).describe('Type of entity of the initiated'),
		/* ─── content ─── */
		interactionType: z
			.string()
			.max(50)
			.describe('Free-form classification such as "Trade", "Combat", "Dialogue"'),

		result: z
			.string()
			.max(500)
			.nullable()
			.describe('Outcome or resolution of the interaction (e.g., "NPC persuaded")'),

		notes: z
			.string()
			.max(2000)
			.nullable()
			.describe('Additional narrative notes from the DM or system'),

		dateTime: z
			.date()
			.nullable()
			.default(() => new Date())
			.describe(
				'Date and time in the datetime2(7) format of the interaction was recorded; defaults to now'
			),

		/* ─── metadata ─── */
		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this interaction log entry'),

		mood: z.string().max(50).nullable().describe('Emotional tone, e.g., "hostile", "friendly"'),

		tags: z
			.array(z.string().max(30))
			.nullable()
			.transform((arr) => (arr ? JSON.stringify(arr) : null))
			.describe('Arbitrary labels used for search & filtering (e.g., ["trade","quest"])')
	})
	.describe(
		'Schema for creating or updating an interaction record (interactionId generated by the server).'
	);

export const ItemSchema = z
	.object({
		/* ─── ownership & scope ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign where this item exists'),

		name: z.string().min(1).max(100).nullable().describe('Name of the item as shown to players'),

		type: z.string().max(50).nullable().describe('Category such as "Weapon", "Potion", "Artifact"'),

		description: z
			.string()
			.max(2000)
			.nullable()
			.describe('Lore description, abilities, or appearance of the item'),

		linkedLocation: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the location where the item is found or stored'),

		linkedContext: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context that introduces or references the item'),

		discoveredAt: z
			.string()
			.uuid()
			.optional()
			.describe('UUID of the session where it was discovered'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID that controls who can view this item entry'),

		/* ─── metadata ─── */
		tags: z
			.array(z.string().max(30))
			.nullable()
			.transform((arr) => (arr ? JSON.stringify(arr) : null))
			.describe('Optional list of tags for search and filtering, e.g., ["cursed","fire"]'),

		rarity: z
			.nativeEnum(ItemRarity)
			.nullable()
			.describe('Rarity tier used for loot tables and UI styling')
	})
	.describe('Schema for creating or updating an in-game item (itemId generated by the server).');

export const ItemOwnershipSchema = z
	.object({
		/* composite key */
		itemId: z.string().uuid().describe('UUID of the item whose ownership is being recorded'),

		ownerId: z
			.string()
			.uuid()
			.describe('UUID of the owning entity (player character, NPC, faction, etc.)'),

		ownerType: z
			.nativeEnum(OwnerType)
			.describe(
				'Domain table of the owner entity. Only use "Locaiton" if Item is without owner but in a specified location.'
			),

		/* scope */
		campaignId: z.string().uuid().describe('UUID of the campaign this ownership record belongs to'),

		/* timeline anchors */
		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session in which the ownership change happened'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context or scene triggering the change'),

		/* state flags & meta */
		isCurrentOwner: z
			.boolean()
			.describe('True if this row represents the current owner; false for historical entries'),

		notes: z
			.string()
			.max(500)
			.nullable()
			.describe('Free-form notes about the transfer or special conditions'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this ownership log entry')
	})
	.describe('Schema for inserting or updating an item-to-owner link (item ownership history).');

export const LocationContextLinkSchema = z
	.object({
		locationId: z
			.string()
			.uuid()
			.describe('UUID of the location being associated with the context'),

		contextId: z
			.string()
			.uuid()
			.describe('UUID of the narrative context or scene tied to the location'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to')
	})
	.describe('Associates a narrative context with a location (composite key, no surrogate ID).');

export const LocationEventLinkSchema = z
	.object({
		locationId: z.string().uuid().describe('UUID of the location where the event takes place'),

		eventId: z.string().uuid().describe('UUID of the event linked to the location'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to')
	})
	.describe('Links an event to its location (composite key, no surrogate ID).');

export const LocationNpcSchema = z
	.object({
		locationId: z
			.string()
			.uuid()
			.describe('UUID of the location where the NPC is (or was) present'),

		npcId: z
			.string()
			.uuid()
			.describe('UUID of the non-player character associated with the location'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to'),

		isPresent: z
			.boolean()
			.describe('True if the NPC is currently at the location; false if only historical'),

		role: z
			.nativeEnum(LocationNpcRole)
			.nullable()
			.describe('Narrative role the NPC plays at this location'),

		notes: z
			.string()
			.max(500)
			.nullable()
			.describe('Free-form notes about the NPC’s presence or activities'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session when this presence was logged'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context or scene related to this presence'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this location-NPC link')
	})
	.describe(
		'Associates an NPC with a location, tracking presence, role, and visibility (composite key, no surrogate ID).'
	);

export const LocationSchema = z
	.object({
		/* ─── required scope ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign this location belongs to'),

		/* ─── names & administrative hierarchy ─── */
		name: z.string().max(100).nullable().describe('Common name of the settlement or landmark'),
		province: z.string().max(100).nullable().describe('Short province label'),
		provinceFullName: z.string().max(100).nullable().describe('Formal or extended province name'),
		state: z.string().max(100).nullable().describe('Short state label'),
		stateFullName: z.string().max(100).nullable().describe('Formal or extended state name'),
		culture: z.string().max(50).nullable().describe('Dominant culture identifier'),
		religion: z.string().max(50).nullable().describe('Primary religion or creed'),
		population: z.number().int().positive().nullable().describe('Approximate population count'),

		/* ─── map coordinates ─── */
		x: z.number().nullable().describe('Projected X coordinate on your world map'),
		y: z.number().nullable().describe('Projected Y coordinate on your world map'),
		latitude: z.number().nullable().describe('Geographic latitude in decimal degrees'),
		longitude: z.number().nullable().describe('Geographic longitude in decimal degrees'),
		elevationM: z.number().int().nullable().describe('Elevation above sea level in metres'),

		/* ─── climate helpers ─── */
		temperature: z.string().max(20).nullable().describe('Average temperature band (e.g., “cold”)'),
		temperatureLikeness: z
			.string()
			.max(50)
			.nullable()
			.describe('Free-text climate likeness (“like Scotland”)'),

		/* ─── physical features ─── */
		capital: z.string().max(50).nullable().describe('Name of the capital district, if relevant'),
		port: z.string().max(50).nullable().describe('Port designation or ID'),
		citadel: z.string().max(50).nullable().describe('Name or presence of a citadel/keep'),
		walls: z.string().max(50).nullable().describe('Wall status or style'),
		plaza: z.string().max(50).nullable().describe('Central plaza or marketplace info'),
		temple: z.string().max(50).nullable().describe('Primary temple or faith centre'),
		shantyTown: z.string().max(50).nullable().describe('Shanty-town presence or status'),

		type: z
			.string()
			.max(50)
			.nullable()
			.describe('Settlement class, e.g., "City", "Village", "Ruins"'),
		description: z.string().max(4000).nullable().describe('Full lore description of the location'),

		/* ─── media & UI ─── */
		emblem: z.string().max(300).nullable().describe('URL or path to the location emblem image'),
		cityGeneratorLink: z
			.string()
			.max(250)
			.nullable()
			.describe('Link to an external city layout generator result'),
		image: z.string().max(255).nullable().describe('Primary illustrative image path/URL'),
		backgroundImage: z.string().max(255).nullable().describe('Background banner image for UI'),
		theme: z.string().max(64).nullable().describe('UI colour-scheme key for this location'),

		/* ─── access control ─── */
		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this location entry')
	})
	.describe(
		'Schema for creating or updating a campaign location (primary key is server-generated).'
	);

export const NoteSchema = z
	.object({
		/* ─── ownership & scope ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign this note belongs to'),

		creatorId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the user, NPC, or system that generated the note'),

		/* ─── core content ─── */
		title: z.string().max(120).nullable().describe('Optional headline shown in note lists'),

		content: z.string().max(8000).nullable().describe('Body text of the note; markdown supported'),

		createdAt: z
			.date()
			.optional()
			.default(() => new Date())
			.describe('UTC date when the note was created; defaults to now'),

		isAIGenerated: z
			.boolean()
			.optional()
			.describe('True if the note was produced by an AI assistant'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the visibility level controlling who can read this note'),

		/* ─── narrative anchors ─── */
		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session during which the note was taken'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context or scene to which this note applies'),

		/* ─── tagging ─── */
		tags: z
			.array(z.string().max(30))
			.nullable()
			.transform((arr) => (arr ? JSON.stringify(arr) : null))
			.describe('Optional list of short tags for search and filtering')
	})
	.describe(
		'Schema representing a note, optionally linked to locations, players, items, or parties, with visibility and creator metadata.'
	);

export const NoteLinkSchema = z
	.object({
		noteId: z.string().uuid().describe('UUID of the note being linked'),

		linkedToId: z
			.string()
			.uuid()
			.describe('UUID of the target entity (location, player, item, NPC, party, etc.)'),

		linkedToType: z.nativeEnum(EntityType).describe('Domain table of the target entity'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to')
	})
	.describe('Associates a note with any entity in the campaign (composite key, no surrogate ID).');

export const PartySchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this party belongs to'),

		name: z
			.string()
			.max(100)
			.nullable()
			.describe('Party name as shown to players (e.g., “Blades of Raphal”)'),

		formedDuring: z
			.string()
			.max(100)
			.nullable()
			.describe('Narrative anchor when the party was formed (e.g., “Session 3”)'),

		disbandedDuring: z
			.string()
			.max(100)
			.nullable()
			.describe('Narrative anchor when the party was disbanded, if applicable'),

		isActive: z
			.boolean()
			.optional()
			.describe('True if the party is currently active; false if disbanded'),

		description: z
			.string()
			.max(1000)
			.nullable()
			.describe('Lore description or mission statement of the party'),

		theme: z
			.string()
			.max(64)
			.nullable()
			.describe('Optional UI colour-scheme key associated with this party'),

		notes: z.string().max(1000).nullable().describe('DM notes or additional metadata')
	})
	.describe('Schema for creating or updating a party (partyId is generated server-side).');

export const NpcSchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this NPC belongs to'),

		name: z.string().max(100).nullable().describe('NPC’s public name'),

		role: z
			.string()
			.max(50)
			.nullable()
			.describe('Narrative role or job, e.g., "Blacksmith", "Villain"'),

		background: z.string().max(2000).nullable().describe('Back-story and origins'),

		description: z.string().max(2000).nullable().describe('Physical appearance and mannerisms'),

		motivation: z
			.string()
			.max(200)
			.nullable()
			.describe('Driving goal, e.g., "Protect village", "Avenge family"'),

		secret: z.string().max(200).nullable().describe('Hidden truth or twist known only to the DM'),

		relationshipSummary: z
			.string()
			.max(500)
			.nullable()
			.describe('Concise bullet of key relationships (“rival of PlayerX”)'),

		behaviour: z
			.string()
			.max(500)
			.nullable()
			.describe('Typical behaviour patterns or speech style'),

		image: z.string().max(255).nullable().describe('Path or URL to the NPC portrait'),

		backgroundImage: z.string().max(255).nullable().describe('Banner or full-body artwork URL'),

		firstMet: z
			.string()
			.uuid()
			.optional()
			.describe('UUID of the sessions the NPC was first met in.'),

		theme: z.string().max(64).nullable().describe('Optional UI theme key for this NPC'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this NPC entry'),

		knownTo: z
			.array(NpcKnownToEntrySchema)
			.default([])
			.describe('Per-character knowledge and field-level visibility for this NPC')
	})
	.describe(
		'Schema for creating or updating a non-player character; npcId is generated server-side.'
	);

export const PartyMemberSchema = z
	.object({
		partyId: z.string().uuid().describe('UUID of the party this character belongs to'),

		characterId: z.string().uuid().describe('UUID of the character (player or NPC)'),

		characterType: z
			.nativeEnum(CharacterType)
			.describe('Indicates whether the character is a player character or an NPC'),

		joinedDuring: z
			.string()
			.max(100)
			.nullable()
			.describe('Narrative anchor of when the character joined, e.g., “Session 14”'),

		isActive: z
			.boolean()
			.optional()
			.describe('True if the character is currently in the party; false if departed'),

		campaignId: z.string().uuid().describe('UUID of the campaign this party operates within'),

		role: z
			.string()
			.max(50)
			.nullable()
			.describe('Role within the party, e.g., “Leader”, “Scout”, “Support”'),

		notes: z
			.string()
			.max(500)
			.nullable()
			.describe('Additional notes such as “Left during betrayal arc”')
	})
	.describe(
		'Schema for linking a character (player or NPC) to a party; composite key of partyId + characterId.'
	);

export const PlayerSchema = z
	.object({
		/* ─── ownership & scope ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign this player character belongs to'),

		userId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the user account controlling this character'),

		/* ─── identity ─── */
		name: z.string().max(100).nullable().describe('Character name'),
		race: z.string().max(50).nullable().describe('Lineage/species, e.g., “Elf”, “Human”'),
		class: z.string().max(50).nullable().describe('Character class or archetype, e.g., “Wizard”'),

		level: z.number().int().min(1).optional().describe('Current level; defaults to 1'),

		background: z.string().max(1000).nullable().describe('Character back-story summary'),
		description: z.string().max(2000).nullable().describe('Physical appearance or tagline'),

		/* ─── location & media ─── */
		currentLocationId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the location where the character currently is'),

		image: z
			.string()
			.max(255)
			.nullable()
			.describe('Portrait image path/URL, (relative path, skip if not provided)'),
		backgroundImage: z
			.string()
			.max(255)
			.nullable()
			.describe('Hero/background banner image (relative path, skip if not provided)'),
		theme: z.string().max(64).nullable().describe('Optional UI colour-scheme key'),

		/* ─── notes & access ─── */
		notes: z.string().max(2000).nullable().describe('Private or DM notes about the character'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this character entry')
	})
	.describe('Schema for creating or updating a player character (playerId generated server-side).');

export const QuestRewardLinkSchema = z
	.object({
		questId: z
			.string()
			.uuid()
			.describe('UUID of the quest that grants or is associated with the reward'),

		rewardId: z.string().uuid().describe('UUID of the reward item, currency, or favor'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to')
	})
	.describe('Links a quest to one of its rewards (composite key, no surrogate ID).');

export const QuestLocationLinkSchema = z
	.object({
		questId: z.string().uuid().describe('UUID of the quest associated with the location'),
		locationId: z.string().uuid().describe('UUID of the location relevant to the quest'),
		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to'),

		coordinates: z
			.object({
				x: z.number(),
				y: z.number()
			})
			.nullable()
			.describe('Optional point marker on the map for this quest-location pair'),

		area: z
			.object({
				topLeft: z.object({ x: z.number(), y: z.number() }),
				bottomRight: z.object({ x: z.number(), y: z.number() })
			})
			.nullable()
			.describe('Optional rectangular area if the quest affects a region within this location')
	})
	.describe('Links a quest to a location, optionally placing it on a map.');

export const QuestSchema = z
	.object({
		questId: z.string().uuid().describe('Primary key UUID for the quest'),
		campaignId: z.string().uuid().describe('UUID of the campaign to which this quest belongs'),

		/* ─── narrative content ─── */
		name: z.string().max(120).nullable(),
		description: z.string().max(4000).nullable(),
		summary: z.string().max(500).nullable(),

		type: z
			.enum([
				'Main',
				'Side',
				'Personal',
				'Faction',
				'Investigation',
				'Exploration',
				'Combat',
				'Social'
			])
			.nullable(),

		status: z
			.enum(['Active', 'Inactive', 'Completed', 'Failed', 'On Hold', 'Cancelled'])
			.nullable(),

		progressStatus: z
			.enum([
				'Not Started',
				'Early Progress',
				'In Progress',
				'Nearly Complete',
				'Completed',
				'Stalled',
				'Failed'
			])
			.default('Not Started'),

		/* ─── structured progression ─── */
		milestones: z
			.array(
				z.object({
					id: z.string().uuid().describe('Unique milestone ID'),
					name: z.string().max(100),
					description: z.string().max(1000).nullable(),
					completed: z.boolean().default(false),
					sessionId: z.string().uuid().nullable(),
					linkedEntityId: z.string().uuid().nullable(),
					linkedEntityType: z.nativeEnum(EntityType).nullable()
				})
			)
			.nullable()
			.describe('Quest milestones with status and optional links'),

		progressLog: z
			.array(
				z.object({
					sessionId: z.string().uuid().nullable(),
					summary: z.string().max(1000),
					timestamp: z.date().default(() => new Date()),
					author: z.string().uuid().nullable()
				})
			)
			.nullable()
			.describe('Narrative log of quest progress per session'),

		/* ─── optional loose tracking ─── */
		currentSituation: z
			.array(
				z.object({
					summary: z.string().max(500),
					timestamp: z.date().optional(), // auto-added for sorting
					authorId: z.string().uuid().nullable(), // who wrote it (DM or player)
					sessionId: z.string().uuid().nullable()
				})
			)
			.nullable()
			.describe('Narrative snapshot(s) of the quest’s current state — editable by players or DM'),

		nextSteps: z
			.array(
				z.object({
					task: z.string().max(300).describe('What needs to be done'),
					notes: z.string().max(500).nullable().describe('Context or why it matters'),
					status: z.enum(['Pending', 'Done', 'Dropped']).default('Pending'),
					linkedEntityId: z.string().uuid().nullable(),
					linkedEntityType: z.nativeEnum(EntityType).nullable(),
					addedBy: z.string().uuid().nullable(),
					timestamp: z.date().optional()
				})
			)
			.nullable()
			.describe(
				'Structured list of remaining quest tasks or suggestions (editable by players or DM)'
			),

		complications: z.string().max(1000).nullable(),

		/* ─── timestamps ─── */
		created: z.date().default(() => new Date()),
		updated: z.date().nullable(),
		createdInSession: z.string().uuid().nullable(),
		lastProgressSessionId: z.string().uuid().nullable(),

		editableBy: z.enum(['DMOnly', 'Players', 'All']).default('All'),
		/* ─── access & tagging ─── */
		visibilityLevel: z.string().uuid().nullable(),
		tags: z.array(z.string().max(30)).nullable()
	})
	.describe('Tracks quests with structured progress, timeline logs, and optional map anchoring');

export const MapMarkerSchema = z.object({
	markerId: z.string().uuid(),
	campaignId: z.string().uuid(),

	entityId: z.string().uuid(),
	entityType: z.nativeEnum(EntityType),

	mapId: z.string().uuid().nullable(), // if using multiple maps
	x: z.number(),
	y: z.number(),

	label: z.string().max(100).nullable(),
	icon: z.string().nullable(), // 'quest', 'npc', etc.
	color: z.string().nullable(),
	visible: z.boolean().default(true)
});

export const RelationshipSchema = z
	.object({
		campaignId: z
			.string()
			.uuid()
			.describe('UUID of the campaign to which the relationship belongs'),

		/* ─── endpoints ─── */
		entity1Id: z.string().uuid().describe('UUID of the first entity in the relationship'),

		entity1Type: z
			.enum(['Player', 'Npc', 'Faction', 'Item', 'Location', 'Quest', 'Event'])
			.describe('Domain table of the first entity'),

		entity2Id: z.string().uuid().describe('UUID of the second entity in the relationship'),

		entity2Type: z
			.enum(['Player', 'Npc', 'Faction', 'Item', 'Location', 'Quest', 'Event'])
			.describe('Domain table of the second entity'),

		/* ─── attributes ─── */
		relationshipType: z
			.enum([
				'Friend',
				'Rival',
				'Mentor',
				'Ally',
				'Enemy',
				'Family',
				'Owner',
				'Subbordinate',
				'Other'
			])
			.nullable()
			.describe('Categorisation of the relationship'),

		description: z
			.string()
			.max(2000)
			.nullable()
			.describe('Narrative details that flesh out the relationship'),

		isMutual: z
			.boolean()
			.optional()
			.describe('True if both entities recognise the relationship; false if one-sided'),

		strength: z
			.number()
			.int()
			.min(-100)
			.max(100)
			.nullable()
			.describe('Numeric measure of intensity from –100 (hostile) to +100 (bonded)'),

		status: z
			.enum(['active', 'dead', 'secret', 'dormant'])
			.nullable()
			.describe('Current status of the relationship in the storyline'),

		/* ─── access control ─── */
		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this relationship entry')
	})
	.describe(
		'Schema for creating or updating an inter-entity relationship (relationshipId generated server-side).'
	);

export const RelationshipChangeLogSchema = z
	.object({
		relationshipId: z
			.string()
			.uuid()
			.describe('UUID of the relationship whose strength or status changed'),

		campaignId: z.string().uuid().describe('UUID of the campaign this change belongs to'),

		changedOnSession: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session in which the change occurred'),

		changeReason: z
			.string()
			.max(200)
			.nullable()
			.describe('Short narrative reason for the change (e.g., “Betrayal revealed”)'),

		changedBy: z
			.string()
			.max(100)
			.nullable()
			.describe('Name of the player, NPC, or “System” that triggered the change'),

		newStrength: z
			.number()
			.int()
			.min(-100)
			.max(100)
			.describe('Updated strength value after the change, from –100 to +100')
	})
	.describe(
		'Logs every change to a relationship’s strength or status (primary key generated server-side).'
	);

export const ResourceSchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign that owns the resource record'),

		name: z
			.string()
			.max(100)
			.nullable()
			.describe('Resource label as it appears in inventory lists'),

		type: z
			.enum(['Gold', 'Ingredient', 'Ammo', 'Gem', 'Relic', 'Other'])
			.nullable()
			.describe('Category of resource for sorting and rules'),

		quantity: z.number().int().min(0).nullable().describe('Current quantity of the resource'),

		ownerId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the owning entity (player, NPC, party)'),

		ownerType: z
			.enum(['Player', 'Npc', 'Party', 'Faction'])
			.nullable()
			.describe('Table/domain of the owner entity'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this resource entry')
	})
	.describe('Schema for creating or updating a resource entry (resourceId generated server-side).');

export const RewardSchema = z
	.object({
		name: z
			.string()
			.max(120)
			.nullable()
			.describe('Display name of the reward, e.g., “Bag of Gold” or “Royal Favor”'),

		type: z
			.nativeEnum(RewardType)
			.nullable()
			.describe('Category of reward for rules and UI badges'),

		description: z
			.string()
			.max(1000)
			.nullable()
			.describe('Narrative description or mechanical details of the reward'),

		linkedEntityId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the item, resource, or entity represented by this reward'),

		linkedEntityType: z
			.nativeEnum(LinkedEntityType)
			.nullable()
			.describe('Domain table of the linked entity'),

		quantity: z
			.number()
			.int()
			.min(1)
			.nullable()
			.describe('Numeric quantity for stackable rewards (e.g., 500 gold)'),

		value: z
			.number()
			.int()
			.min(0)
			.nullable()
			.describe('Optional numeric value for bookkeeping or economy systems'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this reward entry')
	})
	.describe('Schema for defining a quest or event reward (rewardId generated on the server).');

export const SessionEntityLinkSchema = z
	.object({
		sessionId: z.string().uuid().describe('UUID of the session that referenced the entity'),

		entityId: z.string().uuid().describe('UUID of the entity linked to the session'),

		entityType: z.nativeEnum(EntityType).describe('Domain table of the linked entity'),

		campaignId: z.string().uuid().describe('UUID of the campaign this link belongs to'),

		role: z
			.string()
			.max(50)
			.nullable()
			.describe('Narrative role of the entity within the session, e.g., “main conflict”'),

		order: z.number().int().min(0).nullable().describe('Optional ordering index for timeline UIs'),
		importance: z
			.number()
			.min(0)
			.max(100)
			.describe('LLM-assigned importance of this entity in this session betweem 0 and 1')
	})
	.describe(
		'Associates any entity with a play session, including narrative role and optional ordering (composite key, no surrogate ID).'
	);

export const SessionSummarySchema = z
	.object({
		campaignId: z.string().uuid().describe('UUID of the campaign this session belongs to'),

		sessionNumber: z
			.number()
			.int()
			.min(1)
			.nullable()
			.describe('Human-readable ordinal of the session (e.g., 14)'),

		date: z.string().date().nullable().describe('Date the session occurred (ISO 8601, YYYY-MM-DD)'),

		summary: z.string().nullable().describe('Full narrative recap of the session'),

		transcript: z
			.string()
			.nullable()
			.describe(
				"You never create this, it's either given or it's already there, always leave null"
			),

		highlights: z.string().max(1000).nullable().describe('Bullet-point TL;DR of key moments'),

		aiSummaryNotes: z
			.string()
			.max(2000)
			.nullable()
			.describe('Additional notes or corrections generated by AI'),

		sessionTitle: z
			.string()
			.max(120)
			.nullable()
			.describe('Optional title used in UI timelines (e.g., “The Siege of Gauntled”)'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can read this summary'),

		sourceType: z
			.nativeEnum(SourceType)
			.optional()
			.describe('Indicates how the summary was created')
	})
	.describe(
		'Schema for creating or updating a play-session summary (sessionId generated server-side).'
	);

export const TrackingSchema = z
	.object({
		/* ─── scope ─── */
		campaignId: z.string().uuid().describe('UUID of the campaign this tracking record belongs to'),

		playerId: z.string().uuid().describe('UUID of the player character being tracked'),

		locationId: z.string().uuid().describe('UUID of the named location where the player is/was'),

		sessionId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the session during which this position was logged'),

		contextId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of a narrative context that prompted the log entry'),

		/* ─── timing ─── */
		dateTime: z
			.date()
			.optional()
			.describe('UTC timestamp captured for the breadcrumb; defaults to “now” if omitted'),

		type: z
			.nativeEnum(TrackingType)
			.nullable()
			.describe('Classification of the movement event (arrival, departure, etc.)'),

		/* ─── coordinates ─── */
		x: z
			.number()
			.nullable()
			.describe('Projected X coordinate on campaign map grid. Null if not provided explicitly'),
		y: z
			.number()
			.nullable()
			.describe('Projected Y coordinate on campaign map grid. Null if not provided explicitly'),
		latitude: z
			.number()
			.nullable()
			.describe('Latitude in decimal degrees. Null if not provided explicitly'),
		longitude: z
			.number()
			.nullable()
			.describe('Longitude in decimal degrees. Null if not provided explicitly'),

		/* ─── meta ─── */
		notes: z
			.string()
			.max(500)
			.nullable()
			.describe('Extra narrative or mechanical notes about the movement'),

		visibilityLevel: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID controlling who can view this breadcrumb entry')
	})
	.describe(
		'Logs a player’s presence or movement at a specific time and place (trackingId is generated server-side).'
	);

export const VisibilityTypeSchema = z
	.object({
		/* ─── label & details ─── */
		name: z
			.string()
			.max(64)
			.describe('Human-readable label shown in UI lists, e.g., “Players only”'),

		description: z
			.string()
			.max(256)
			.nullable()
			.describe('Optional explanation of who can see data under this visibility rule'),

		/* ─── scope & ownership ─── */
		scope: z
			.nativeEnum(VisibilityScope)
			.describe('Determines whether the rule is global, campaign-specific, or user-specific'),

		campaignId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the campaign this rule belongs to (null for Global / Personal scopes)'),

		ownerUserId: z
			.string()
			.uuid()
			.nullable()
			.describe('UUID of the user who owns this personal rule (null otherwise)'),

		/* ─── advanced settings ─── */
		settingsJson: z
			.string()
			.nullable()
			.describe('Free-form JSON string for extra flags, e.g., `{"allowAI": false}`'),

		isLocked: z
			.boolean()
			.optional()
			.describe('True if the rule is protected from edits/deletion (built-ins)')
	})
	.describe(
		'Defines a visibility rule that restricts who can view specific campaign data (visibilityId generated server-side).'
	);

export const UserCanvasLayoutSchema = z.object({
	layoutId: z.string().uuid(),
	userId: z.string().uuid(),
	campaignId: z.string().uuid(),
	playerId: z.string().uuid().nullable(),
	tabName: z.nativeEnum(TabNameType),
	layoutJson: z.string().describe('Stringified JSON array of components'),
	createdAt: z
		.date()
		.default(() => new Date())
		.nullable(),
	updatedAt: z
		.date()
		.default(() => new Date())
		.nullable(),
	imageUrl: z.string().default('').nullable(),
	canvaSizeX: z.number().nullable().default(0),
	canvaSizeY: z.number().nullable().default(0)
});

export type UserCanvasLayout = z.infer<typeof UserCanvasLayoutSchema>;

// Export inferred types for all schemas
export type Campaign = z.infer<typeof CampaignSchema>;
export type CampaignLog = z.infer<typeof CampaignLogSchema>;
export type Choice = z.infer<typeof ChoiceSchema>;
export type Context = z.infer<typeof ContextSchema>;
export type DialogueLog = z.infer<typeof DialogueLogSchema>;
export type EntityLink = z.infer<typeof EntityLinkSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Faction = z.infer<typeof FactionSchema>;
export type Interaction = z.infer<typeof InteractionSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type ItemOwnership = z.infer<typeof ItemOwnershipSchema>;
export type LocationContextLink = z.infer<typeof LocationContextLinkSchema>;
export type LocationEventLink = z.infer<typeof LocationEventLinkSchema>;
export type LocationNpc = z.infer<typeof LocationNpcSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type Note = z.infer<typeof NoteSchema>;
export type NoteLink = z.infer<typeof NoteLinkSchema>;
export type Party = z.infer<typeof PartySchema>;
export type Npc = z.infer<typeof NpcSchema>;
export type PartyMember = z.infer<typeof PartyMemberSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type QuestRewardLink = z.infer<typeof QuestRewardLinkSchema>;
export type QuestLocationLink = z.infer<typeof QuestLocationLinkSchema>;
export type Quest = z.infer<typeof QuestSchema>;
export type Relationship = z.infer<typeof RelationshipSchema>;
export type RelationshipChangeLog = z.infer<typeof RelationshipChangeLogSchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type Reward = z.infer<typeof RewardSchema>;
export type SessionEntityLink = z.infer<typeof SessionEntityLinkSchema>;
export type SessionSummary = z.infer<typeof SessionSummarySchema>;
export type Tracking = z.infer<typeof TrackingSchema>;
export type VisibilityType = z.infer<typeof VisibilityTypeSchema>;
