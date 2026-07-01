CREATE TYPE "public"."carriage" AS ENUM('cabin', 'checked');--> statement-breakpoint
CREATE TYPE "public"."complexity" AS ENUM('simple', 'medium', 'complex', 'very_complex');--> statement-breakpoint
CREATE TYPE "public"."confidence" AS ENUM('confirmed', 'likely', 'provisional');--> statement-breakpoint
CREATE TYPE "public"."consumption_context" AS ENUM('standard', 'glanceable_offline');--> statement-breakpoint
CREATE TYPE "public"."decision_type" AS ENUM('verdict', 'requirement', 'procedure', 'threshold', 'comparison', 'checklist', 'decision', 'emergency');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('country', 'airline', 'airport', 'document', 'travel_item', 'traveller_profile', 'authority');--> statement-breakpoint
CREATE TYPE "public"."evidence_level" AS ENUM('government_regulation', 'government_advisory', 'international_standard', 'airport_policy', 'airline_policy', 'expert_recommendation', 'traveller_experience');--> statement-breakpoint
CREATE TYPE "public"."fact_value_type" AS ENUM('number', 'string', 'boolean', 'range', 'structured');--> statement-breakpoint
CREATE TYPE "public"."intent" AS ENUM('reassurance', 'verdict', 'requirement', 'threshold', 'procedure', 'comparison', 'decision', 'checklist', 'timing', 'cost', 'emergency');--> statement-breakpoint
CREATE TYPE "public"."node_state" AS ENUM('draft', 'in_review', 'approved', 'published', 'superseded', 'retired');--> statement-breakpoint
CREATE TYPE "public"."resolver_dimension" AS ENUM('airline', 'airport', 'origin', 'destination', 'transit', 'carriage', 'profile');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'in_progress', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."review_target" AS ENUM('fact', 'claim', 'topic');--> statement-breakpoint
CREATE TYPE "public"."risk_level" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."time_phase" AS ENUM('before', 'during', 'after', 'emergency');--> statement-breakpoint
CREATE TYPE "public"."topic_edge" AS ENUM('next_decision', 'sibling', 'latent_question');--> statement-breakpoint
CREATE TYPE "public"."travel_type" AS ENUM('domestic', 'international');--> statement-breakpoint
CREATE TYPE "public"."validity" AS ENUM('stable', 'temporary', 'seasonal', 'under_review', 'deprecated');--> statement-breakpoint
CREATE TYPE "public"."verdict" AS ENUM('allowed', 'allowed_with_conditions', 'not_allowed', 'unresolved');--> statement-breakpoint
CREATE TYPE "public"."volatility" AS ENUM('very_high', 'high', 'medium', 'low');--> statement-breakpoint
CREATE TABLE "authorities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"jurisdiction_country" text,
	"website_url" text,
	"default_evidence_level" "evidence_level" NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"authority_id" uuid NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"archived_url" text,
	"source_type" text,
	"published_at" timestamp with time zone,
	"accessed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"superseded_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" uuid NOT NULL,
	"assertion" text NOT NULL,
	"evidence_level" "evidence_level" NOT NULL,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL,
	"superseded_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "airlines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"country_code" text,
	"website_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "airports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"city" text,
	"country_code" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "travel_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"aliases" text[],
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "traveller_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "fact_evidence" (
	"fact_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fact_evidence_fact_id_evidence_id_pk" PRIMARY KEY("fact_id","evidence_id")
);
--> statement-breakpoint
CREATE TABLE "fact_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fact_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"value_type" "fact_value_type" NOT NULL,
	"value" jsonb NOT NULL,
	"unit" text,
	"evidence_level" "evidence_level" NOT NULL,
	"confidence" "confidence" NOT NULL,
	"verified_at" timestamp with time zone,
	"change_reason" text,
	"supersedes_version" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "facts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject_type" "entity_type" NOT NULL,
	"subject_code" text NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"value_type" "fact_value_type" NOT NULL,
	"value" jsonb NOT NULL,
	"unit" text,
	"owner_authority_id" uuid NOT NULL,
	"evidence_level" "evidence_level" NOT NULL,
	"confidence" "confidence" DEFAULT 'provisional' NOT NULL,
	"volatility" "volatility" DEFAULT 'medium' NOT NULL,
	"last_verified_at" timestamp with time zone,
	"review_due" timestamp with time zone,
	"state" "node_state" DEFAULT 'draft' NOT NULL,
	"current_version" integer DEFAULT 1 NOT NULL,
	"superseded_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "claim_evidence" (
	"claim_id" uuid NOT NULL,
	"evidence_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "claim_evidence_claim_id_evidence_id_pk" PRIMARY KEY("claim_id","evidence_id")
);
--> statement-breakpoint
CREATE TABLE "claim_exceptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"claim_id" uuid NOT NULL,
	"profile_code" text NOT NULL,
	"dimension" "resolver_dimension",
	"modifier" text NOT NULL,
	"verdict_override" "verdict",
	"evidence_id" uuid,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "claim_facts" (
	"claim_id" uuid NOT NULL,
	"fact_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "claim_facts_claim_id_fact_id_pk" PRIMARY KEY("claim_id","fact_id")
);
--> statement-breakpoint
CREATE TABLE "claim_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"claim_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"verdict" "verdict" NOT NULL,
	"validity" "validity" NOT NULL,
	"summary" text NOT NULL,
	"conditions" jsonb,
	"evidence_level" "evidence_level" NOT NULL,
	"confidence" "confidence" NOT NULL,
	"verified_at" timestamp with time zone,
	"change_reason" text,
	"supersedes_version" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject_type" "entity_type" NOT NULL,
	"subject_code" text NOT NULL,
	"question" text NOT NULL,
	"verdict" "verdict" NOT NULL,
	"resolver_dimensions" "resolver_dimension"[],
	"validity" "validity" DEFAULT 'stable' NOT NULL,
	"summary" text NOT NULL,
	"conditions" jsonb,
	"scope_origin" text[],
	"scope_destination" text[],
	"scope_transit" text[],
	"scope_travel_type" "travel_type"[],
	"scope_carriage" "carriage"[],
	"scope_airlines" text[],
	"scope_airports" text[],
	"scope_profiles" text[],
	"valid_from" timestamp with time zone,
	"valid_until" timestamp with time zone,
	"owner_authority_id" uuid NOT NULL,
	"evidence_level" "evidence_level" NOT NULL,
	"confidence" "confidence" DEFAULT 'provisional' NOT NULL,
	"volatility" "volatility" DEFAULT 'medium' NOT NULL,
	"risk_level" "risk_level" DEFAULT 'medium' NOT NULL,
	"last_verified_at" timestamp with time zone,
	"review_due" timestamp with time zone,
	"state" "node_state" DEFAULT 'draft' NOT NULL,
	"current_version" integer DEFAULT 1 NOT NULL,
	"superseded_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "topic_claims" (
	"topic_id" uuid NOT NULL,
	"claim_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "topic_claims_topic_id_claim_id_pk" PRIMARY KEY("topic_id","claim_id")
);
--> statement-breakpoint
CREATE TABLE "topic_edges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_topic_id" uuid NOT NULL,
	"to_topic_id" uuid NOT NULL,
	"edge_type" "topic_edge" NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"question" text NOT NULL,
	"journey_stage" text,
	"time_phase" time_phase NOT NULL,
	"intent" "intent" NOT NULL,
	"search_pattern" text,
	"decision_type" "decision_type" NOT NULL,
	"complexity" "complexity" DEFAULT 'simple' NOT NULL,
	"risk_level" "risk_level" DEFAULT 'medium' NOT NULL,
	"volatility" "volatility" DEFAULT 'medium' NOT NULL,
	"emotional_entry" text,
	"emotional_exit" text,
	"seasonality" text[],
	"consumption_context" "consumption_context" DEFAULT 'standard' NOT NULL,
	"state" "node_state" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "journey_stages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"journey_id" uuid NOT NULL,
	"stage_key" text NOT NULL,
	"title" text NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "journey_topics" (
	"journey_id" uuid NOT NULL,
	"topic_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "journey_topics_journey_id_topic_id_pk" PRIMARY KEY("journey_id","topic_id")
);
--> statement-breakpoint
CREATE TABLE "journeys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target_type" "review_target" NOT NULL,
	"target_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"risk_level" "risk_level" DEFAULT 'medium' NOT NULL,
	"scheduled_for" timestamp with time zone NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"outcome" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	"updated_by" uuid
);
--> statement-breakpoint
ALTER TABLE "sources" ADD CONSTRAINT "sources_authority_id_authorities_id_fk" FOREIGN KEY ("authority_id") REFERENCES "public"."authorities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact_evidence" ADD CONSTRAINT "fact_evidence_fact_id_facts_id_fk" FOREIGN KEY ("fact_id") REFERENCES "public"."facts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact_evidence" ADD CONSTRAINT "fact_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact_versions" ADD CONSTRAINT "fact_versions_fact_id_facts_id_fk" FOREIGN KEY ("fact_id") REFERENCES "public"."facts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "facts" ADD CONSTRAINT "facts_owner_authority_id_authorities_id_fk" FOREIGN KEY ("owner_authority_id") REFERENCES "public"."authorities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_evidence" ADD CONSTRAINT "claim_evidence_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_evidence" ADD CONSTRAINT "claim_evidence_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_exceptions" ADD CONSTRAINT "claim_exceptions_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_exceptions" ADD CONSTRAINT "claim_exceptions_evidence_id_evidence_id_fk" FOREIGN KEY ("evidence_id") REFERENCES "public"."evidence"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_facts" ADD CONSTRAINT "claim_facts_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_facts" ADD CONSTRAINT "claim_facts_fact_id_facts_id_fk" FOREIGN KEY ("fact_id") REFERENCES "public"."facts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claim_versions" ADD CONSTRAINT "claim_versions_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_owner_authority_id_authorities_id_fk" FOREIGN KEY ("owner_authority_id") REFERENCES "public"."authorities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_claims" ADD CONSTRAINT "topic_claims_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_claims" ADD CONSTRAINT "topic_claims_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_edges" ADD CONSTRAINT "topic_edges_from_topic_id_topics_id_fk" FOREIGN KEY ("from_topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_edges" ADD CONSTRAINT "topic_edges_to_topic_id_topics_id_fk" FOREIGN KEY ("to_topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_stages" ADD CONSTRAINT "journey_stages_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_topics" ADD CONSTRAINT "journey_topics_journey_id_journeys_id_fk" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journey_topics" ADD CONSTRAINT "journey_topics_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "authorities_code_uniq" ON "authorities" USING btree ("code");--> statement-breakpoint
CREATE INDEX "authorities_jurisdiction_idx" ON "authorities" USING btree ("jurisdiction_country");--> statement-breakpoint
CREATE INDEX "sources_authority_idx" ON "sources" USING btree ("authority_id");--> statement-breakpoint
CREATE INDEX "evidence_source_idx" ON "evidence" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "evidence_level_idx" ON "evidence" USING btree ("evidence_level");--> statement-breakpoint
CREATE UNIQUE INDEX "airlines_code_uniq" ON "airlines" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "airports_code_uniq" ON "airports" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "countries_code_uniq" ON "countries" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "documents_code_uniq" ON "documents" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "travel_items_code_uniq" ON "travel_items" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "traveller_profiles_code_uniq" ON "traveller_profiles" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "fact_versions_fact_version_uniq" ON "fact_versions" USING btree ("fact_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "facts_single_home_uniq" ON "facts" USING btree ("subject_type","subject_code","key") WHERE "facts"."deleted_at" is null;--> statement-breakpoint
CREATE INDEX "facts_subject_idx" ON "facts" USING btree ("subject_type","subject_code");--> statement-breakpoint
CREATE INDEX "facts_owner_idx" ON "facts" USING btree ("owner_authority_id");--> statement-breakpoint
CREATE INDEX "facts_review_due_idx" ON "facts" USING btree ("review_due");--> statement-breakpoint
CREATE INDEX "facts_state_idx" ON "facts" USING btree ("state");--> statement-breakpoint
CREATE INDEX "claim_exceptions_claim_idx" ON "claim_exceptions" USING btree ("claim_id");--> statement-breakpoint
CREATE UNIQUE INDEX "claim_versions_claim_version_uniq" ON "claim_versions" USING btree ("claim_id","version");--> statement-breakpoint
CREATE INDEX "claims_subject_idx" ON "claims" USING btree ("subject_type","subject_code");--> statement-breakpoint
CREATE INDEX "claims_owner_idx" ON "claims" USING btree ("owner_authority_id");--> statement-breakpoint
CREATE INDEX "claims_review_due_idx" ON "claims" USING btree ("review_due");--> statement-breakpoint
CREATE INDEX "claims_state_idx" ON "claims" USING btree ("state");--> statement-breakpoint
CREATE INDEX "claims_scope_airlines_gin" ON "claims" USING gin ("scope_airlines");--> statement-breakpoint
CREATE INDEX "claims_scope_destination_gin" ON "claims" USING gin ("scope_destination");--> statement-breakpoint
CREATE UNIQUE INDEX "topic_edges_uniq" ON "topic_edges" USING btree ("from_topic_id","to_topic_id","edge_type");--> statement-breakpoint
CREATE INDEX "topic_edges_from_idx" ON "topic_edges" USING btree ("from_topic_id","edge_type");--> statement-breakpoint
CREATE UNIQUE INDEX "topics_slug_uniq" ON "topics" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "topics_time_phase_idx" ON "topics" USING btree ("time_phase");--> statement-breakpoint
CREATE INDEX "topics_risk_idx" ON "topics" USING btree ("risk_level");--> statement-breakpoint
CREATE INDEX "topics_state_idx" ON "topics" USING btree ("state");--> statement-breakpoint
CREATE UNIQUE INDEX "journey_stages_pos_uniq" ON "journey_stages" USING btree ("journey_id","position");--> statement-breakpoint
CREATE INDEX "journey_topics_journey_idx" ON "journey_topics" USING btree ("journey_id");--> statement-breakpoint
CREATE UNIQUE INDEX "journeys_slug_uniq" ON "journeys" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "reviews_target_idx" ON "reviews" USING btree ("target_type","target_id");--> statement-breakpoint
CREATE INDEX "reviews_status_idx" ON "reviews" USING btree ("status");--> statement-breakpoint
CREATE INDEX "reviews_scheduled_idx" ON "reviews" USING btree ("scheduled_for");