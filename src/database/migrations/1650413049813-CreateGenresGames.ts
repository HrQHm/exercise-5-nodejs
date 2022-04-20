import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGenresGames1650413049813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'genres_games',
                columns: [
                    {
                        name: 'game_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'genre_id',
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

        await queryRunner.createForeignKey('genres_games',
            new TableForeignKey({
                name: 'FKGenreGame',
                referencedTableName: 'genres',
                referencedColumnNames: ['id'],
                columnNames: ['genre_id'],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey('genres_games',
            new TableForeignKey({
                name: 'FkGameGenre',
                referencedTableName: 'games',
                referencedColumnNames: ['id'],
                columnNames: ['game_id'],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('genres_games', 'FKGenreGame');
        await queryRunner.dropForeignKey('genres_games', 'FKGameGenre');
        await queryRunner.dropTable('genres_games');
    }

}
