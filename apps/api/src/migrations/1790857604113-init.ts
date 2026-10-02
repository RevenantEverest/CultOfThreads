import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1790857604113 implements MigrationInterface {
    name = 'Init1790857604113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_media" DROP CONSTRAINT "product_media_product_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "market_details" DROP CONSTRAINT "market_details_market_id_fkey"`);
        await queryRunner.query(`CREATE TABLE "order_line_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "purchase_price_snapshot" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" uuid, "order_id" uuid, CONSTRAINT "PK_db9b7d91249f905cc953375fb1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "customer_email" character varying, "customer_name" character varying, "billing_address" character varying, "shipping_address" character varying, "shipping_option_name" character varying, "shipping_option_id" character varying, "shipping_amount_in_cents" integer, "tracking_number" character varying, "amount_subtotal_in_cents" integer, "amount_total_in_cents" integer, "tax_collected_in_cents" integer, "stripe_transaction_id" character varying, "stripe_checkout_session_id" character varying, "customer_notes" text, "tokens_valid_before" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_provider_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stripe_product_id" uuid, "stripe_price_id" character varying, "square_product_id" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" uuid NOT NULL, CONSTRAINT "UQ_7750ec3557fd0f0afd8a675ec4c" UNIQUE ("product_id"), CONSTRAINT "PK_d20375d34e8c05243e4eb10d617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "market_details" ADD CONSTRAINT "market_details_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_line_items" ADD CONSTRAINT "FK_7269176c85d86bc6f2dc394e0d0" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line_items" ADD CONSTRAINT "FK_297288bf81b5ab6e35c9b68eb50" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_1631a193003bfc4297c61ba38ba" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_provider_details" ADD CONSTRAINT "FK_7750ec3557fd0f0afd8a675ec4c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_provider_details" DROP CONSTRAINT "FK_7750ec3557fd0f0afd8a675ec4c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_1631a193003bfc4297c61ba38ba"`);
        await queryRunner.query(`ALTER TABLE "order_line_items" DROP CONSTRAINT "FK_297288bf81b5ab6e35c9b68eb50"`);
        await queryRunner.query(`ALTER TABLE "order_line_items" DROP CONSTRAINT "FK_7269176c85d86bc6f2dc394e0d0"`);
        await queryRunner.query(`ALTER TABLE "market_details" DROP CONSTRAINT "market_details_market_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "product_media" DROP CONSTRAINT "product_media_product_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "order_id"`);
        await queryRunner.query(`DROP TABLE "product_provider_details"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_line_items"`);
        await queryRunner.query(`ALTER TABLE "market_details" ADD CONSTRAINT "market_details_market_id_fkey" FOREIGN KEY ("market_id") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_media" ADD CONSTRAINT "product_media_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
