using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StockMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stock_ProductId",
                table: "Stock");

            migrationBuilder.RenameColumn(
                name: "StockChangeDate",
                table: "Stock",
                newName: "StockDate");

            migrationBuilder.AlterColumn<int>(
                name: "SoldStock",
                table: "Stock",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AddedStock",
                table: "Stock",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductType",
                table: "Stock",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Characteristic_Brand",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Characteristic_Color",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Characteristic_Type",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Characteristic_Weight",
                table: "Products",
                type: "decimal(6,2)",
                nullable: false,
                defaultValue: 0m);

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
                name: "IX_Stock_ProductId",
                table: "Stock",
                column: "ProductId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stock_ProductId",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "StockAddedDate",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "StockRemoveDate",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "ProductType",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Stock");

            migrationBuilder.DropColumn(
                name: "Characteristic_Brand",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Characteristic_Color",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Characteristic_Type",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Characteristic_Weight",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "StockDate",
                table: "Stock",
                newName: "StockChangeDate");

            migrationBuilder.AlterColumn<int>(
                name: "SoldStock",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddedStock",
                table: "Stock",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stock_ProductId",
                table: "Stock",
                column: "ProductId");
        }
    }
}
