import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrdersGames1650415520582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders_games',
                columns: [
                    {
                        name: 'order_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'game_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey('orders_games',
            new TableForeignKey({
                name: 'FKOrderGame',
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                columnNames: ['order_id'],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey('orders_games',
            new TableForeignKey({
                name: 'FKGameOrder',
                referencedTableName: 'games',
                referencedColumnNames: ['id'],
                columnNames: ['game_id'],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_games', 'FKOrderGame');
        await queryRunner.dropForeignKey('orders_games', 'FKGameOrder');
        await queryRunner.dropTable('orders_games');
    }

}
