import { MigrationInterface, QueryRunner } from "typeorm";

export class Ma1697131450493 implements MigrationInterface {
    name = 'Ma1697131450493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_entity_permissions_enum" AS ENUM('demo.perm', 'create.company', 'read.company')`);
        await queryRunner.query(`CREATE TABLE "user_role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "name" character varying NOT NULL, "permissions" "public"."user_role_entity_permissions_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_43019865301516c7997e39dfff2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cloud_storage_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now(), "etag" character varying NOT NULL, "bucket" character varying NOT NULL, "location" character varying NOT NULL, "key" character varying NOT NULL, "fileMimeType" character varying NOT NULL, CONSTRAINT "PK_a82dafa0a96ea8ca58df3ba28c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity_roles_user_role_entity" ("userEntityId" uuid NOT NULL, "userRoleEntityId" uuid NOT NULL, CONSTRAINT "PK_2ee5d3a95f80245826ea08b509e" PRIMARY KEY ("userEntityId", "userRoleEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61780684524c974ae0b65a8859" ON "user_entity_roles_user_role_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a1520cdbfdb6f4762ad110100" ON "user_entity_roles_user_role_entity" ("userRoleEntityId") `);
        await queryRunner.query(`ALTER TABLE "user_entity_roles_user_role_entity" ADD CONSTRAINT "FK_61780684524c974ae0b65a88590" FOREIGN KEY ("userEntityId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_entity_roles_user_role_entity" ADD CONSTRAINT "FK_7a1520cdbfdb6f4762ad1101003" FOREIGN KEY ("userRoleEntityId") REFERENCES "user_role_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity_roles_user_role_entity" DROP CONSTRAINT "FK_7a1520cdbfdb6f4762ad1101003"`);
        await queryRunner.query(`ALTER TABLE "user_entity_roles_user_role_entity" DROP CONSTRAINT "FK_61780684524c974ae0b65a88590"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a1520cdbfdb6f4762ad110100"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61780684524c974ae0b65a8859"`);
        await queryRunner.query(`DROP TABLE "user_entity_roles_user_role_entity"`);
        await queryRunner.query(`DROP TABLE "cloud_storage_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "user_role_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_entity_permissions_enum"`);
    }

}
