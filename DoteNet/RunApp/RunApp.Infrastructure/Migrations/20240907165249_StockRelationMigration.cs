using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StockRelationMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Stock");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock",
                column: "StockProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock",
                column: "StockProductId",
                unique: true);
        }
    }
}
