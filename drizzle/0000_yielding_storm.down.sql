-- Down migration (manual) for 0000_yielding_storm.sql
-- Rule 5: every migration must be reversible. Drizzle Kit emits only "up" SQL,
-- so each migration ships a hand-written, reviewed reverse here. Applied via the
-- documented rollback runbook (see docs/adr/0005-migrations-and-reversibility.md).
-- Tables dropped with CASCADE (handles FKs); enums dropped after their tables.

DROP TABLE IF EXISTS "reviews" CASCADE;
DROP TABLE IF EXISTS "journey_topics" CASCADE;
DROP TABLE IF EXISTS "journey_stages" CASCADE;
DROP TABLE IF EXISTS "journeys" CASCADE;
DROP TABLE IF EXISTS "topic_edges" CASCADE;
DROP TABLE IF EXISTS "topic_claims" CASCADE;
DROP TABLE IF EXISTS "topics" CASCADE;
DROP TABLE IF EXISTS "claim_versions" CASCADE;
DROP TABLE IF EXISTS "claim_facts" CASCADE;
DROP TABLE IF EXISTS "claim_exceptions" CASCADE;
DROP TABLE IF EXISTS "claim_evidence" CASCADE;
DROP TABLE IF EXISTS "claims" CASCADE;
DROP TABLE IF EXISTS "fact_versions" CASCADE;
DROP TABLE IF EXISTS "fact_evidence" CASCADE;
DROP TABLE IF EXISTS "facts" CASCADE;
DROP TABLE IF EXISTS "travel_items" CASCADE;
DROP TABLE IF EXISTS "traveller_profiles" CASCADE;
DROP TABLE IF EXISTS "documents" CASCADE;
DROP TABLE IF EXISTS "airports" CASCADE;
DROP TABLE IF EXISTS "airlines" CASCADE;
DROP TABLE IF EXISTS "countries" CASCADE;
DROP TABLE IF EXISTS "evidence" CASCADE;
DROP TABLE IF EXISTS "sources" CASCADE;
DROP TABLE IF EXISTS "authorities" CASCADE;

DROP TYPE IF EXISTS "public"."fact_value_type";
DROP TYPE IF EXISTS "public"."topic_edge";
DROP TYPE IF EXISTS "public"."review_status";
DROP TYPE IF EXISTS "public"."review_target";
DROP TYPE IF EXISTS "public"."entity_type";
DROP TYPE IF EXISTS "public"."consumption_context";
DROP TYPE IF EXISTS "public"."complexity";
DROP TYPE IF EXISTS "public"."decision_type";
DROP TYPE IF EXISTS "public"."intent";
DROP TYPE IF EXISTS "public"."time_phase";
DROP TYPE IF EXISTS "public"."carriage";
DROP TYPE IF EXISTS "public"."travel_type";
DROP TYPE IF EXISTS "public"."risk_level";
DROP TYPE IF EXISTS "public"."node_state";
DROP TYPE IF EXISTS "public"."volatility";
DROP TYPE IF EXISTS "public"."confidence";
DROP TYPE IF EXISTS "public"."validity";
DROP TYPE IF EXISTS "public"."resolver_dimension";
DROP TYPE IF EXISTS "public"."verdict";
DROP TYPE IF EXISTS "public"."evidence_level";
