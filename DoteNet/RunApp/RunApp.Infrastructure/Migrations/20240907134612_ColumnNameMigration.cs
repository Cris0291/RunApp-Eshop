using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ColumnNameMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Products_ProductId",
                table: "Stock");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Stock",
                newName: "StockProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Stock_ProductId",
                table: "Stock",
                newName: "IX_Stock_StockProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Products_StockProductId",
                table: "Stock",
                column: "StockProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stock_Products_StockProductId",
                table: "Stock");

            migrationBuilder.RenameColumn(
                name: "StockProductId",
                table: "Stock",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Stock_StockProductId",
                table: "Stock",
                newName: "IX_Stock_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_Products_ProductId",
                table: "Stock",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
