using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedStockMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalRemovedStock",
                table: "StoreOwnerProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RemovedQuantity",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RemovedStock",
                table: "Log",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "StockRemoveDate",
                table: "Log",
                type: "datetime2",
                nullable: true,
                computedColumnSql: "case when [RemovedStock] is not null then [StockDate]\r\n                                              else null end",
                stored: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldComputedColumnSql: "case when [SoldStock] is not null then [StockDate]\r\n                                              else null end",
                oldStored: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StockSoldDate",
                table: "Log",
                type: "datetime2",
                nullable: true,
                computedColumnSql: "case when [SoldStock] is not null then [StockDate]\r\n                                              else null end",
                stored: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StockSoldDate",
                table: "Log");

            migrationBuilder.DropColumn(
                name: "TotalRemovedStock",
                table: "StoreOwnerProfiles");

            migrationBuilder.DropColumn(
                name: "RemovedQuantity",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "RemovedStock",
                table: "Log");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StockRemoveDate",
                table: "Log",
                type: "datetime2",
                nullable: true,
                computedColumnSql: "case when [SoldStock] is not null then [StockDate]\r\n                                              else null end",
                stored: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldComputedColumnSql: "case when [RemovedStock] is not null then [StockDate]\r\n                                              else null end",
                oldStored: true);
        }
    }
}
