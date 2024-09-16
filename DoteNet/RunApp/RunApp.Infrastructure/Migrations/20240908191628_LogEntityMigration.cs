using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LogEntityMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "StockAddedDate",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "StockRemoveDate",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "AddedStock",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "SoldStock",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "StockDate",
                table: "Stock");

            migrationBuilder.AddColumn<int>(
                name: "SoldQuantity",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalQuantity",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Log",
                columns: table => new
                {
                    LogId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StockAddedDate = table.Column<DateTime>(type: "datetime2", nullable: true, computedColumnSql: "case when [AddedStock] is not null then [StockDate]\r\n                                              else null end", stored: true),
                    StockRemoveDate = table.Column<DateTime>(type: "datetime2", nullable: true, computedColumnSql: "case when [SoldStock] is not null then [StockDate]\r\n                                              else null end", stored: true),
                    StockDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    AddedStock = table.Column<int>(type: "int", nullable: true),
                    SoldStock = table.Column<int>(type: "int", nullable: true),
                    StockId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.LogId);
                    table.ForeignKey(
                        name: "FK_Log_Stock_StockId",
                        column: x => x.StockId,
                        principalTable: "Stock",
                        principalColumn: "StockId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock",
                column: "StockProductId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Log_StockId",
                table: "Log",
                column: "StockId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Log");

            migrationBuilder.DropIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "SoldQuantity",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "TotalQuantity",
                table: "Stock");

            migrationBuilder.AddColumn<int>(
                name: "AddedStock",
                table: "Stock",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoldStock",
                table: "Stock",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StockDate",
                table: "Stock",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getutcdate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "StockAddedDate",
                table: "Stock",
                type: "datetime2",
                nullable: true,
                computedColumnSql: "case when [AddedStock] is not null then [StockDate]\r\n                                              else null end",
                stored: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StockRemoveDate",
                table: "Stock",
                type: "datetime2",
                nullable: true,
                computedColumnSql: "case when [SoldStock] is not null then [StockDate]\r\n                                              else null end",
                stored: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock",
                column: "StockProductId");
        }
    }
}
