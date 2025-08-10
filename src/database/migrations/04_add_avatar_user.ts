import type { Knex } from 'knex';
import { User } from '../../models/user-model';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(User.tableName, (table) => {
    table.string('avatar', 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(User.tableName, (table) => {
    table.dropColumn('avatar');
  });
}