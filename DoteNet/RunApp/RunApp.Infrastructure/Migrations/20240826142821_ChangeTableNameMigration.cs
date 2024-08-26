using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTableNameMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sale_StoreOwnerProfile_StoreOwnerProfileId",
                table: "Sale");

            migrationBuilder.DropForeignKey(
                name: "FK_Stock_StoreOwnerProfile_StoreOwnerProfileId",
                table: "Stock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoreOwnerProfile",
                table: "StoreOwnerProfile");

            migrationBuilder.RenameTable(
                name: "StoreOwnerProfile",
                newName: "StoreOwnerProfiles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoreOwnerProfiles",
                table: "StoreOwnerProfiles",
                column: "StoreOwnerProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sale_StoreOwnerProfiles_StoreOwnerProfileId",
                table: "Sale",
                column: "StoreOwnerProfileId",
                principalTable: "StoreOwnerProfiles",
                principalColumn: "StoreOwnerProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_StoreOwnerProfiles_StoreOwnerProfileId",
                table: "Stock",
                column: "StoreOwnerProfileId",
                principalTable: "StoreOwnerProfiles",
                principalColumn: "StoreOwnerProfileId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sale_StoreOwnerProfiles_StoreOwnerProfileId",
                table: "Sale");

            migrationBuilder.DropForeignKey(
                name: "FK_Stock_StoreOwnerProfiles_StoreOwnerProfileId",
                table: "Stock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StoreOwnerProfiles",
                table: "StoreOwnerProfiles");

            migrationBuilder.RenameTable(
                name: "StoreOwnerProfiles",
                newName: "StoreOwnerProfile");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StoreOwnerProfile",
                table: "StoreOwnerProfile",
                column: "StoreOwnerProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sale_StoreOwnerProfile_StoreOwnerProfileId",
                table: "Sale",
                column: "StoreOwnerProfileId",
                principalTable: "StoreOwnerProfile",
                principalColumn: "StoreOwnerProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stock_StoreOwnerProfile_StoreOwnerProfileId",
                table: "Stock",
                column: "StoreOwnerProfileId",
                principalTable: "StoreOwnerProfile",
                principalColumn: "StoreOwnerProfileId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
