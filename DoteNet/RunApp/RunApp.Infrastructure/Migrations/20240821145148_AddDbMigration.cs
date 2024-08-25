using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDbMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProfile_AspNetUsers_Id",
                table: "CustomerProfile");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductStatus_CustomerProfile_Id",
                table: "ProductStatus");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_CustomerProfile_Id",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProfile",
                table: "CustomerProfile");

            migrationBuilder.RenameTable(
                name: "CustomerProfile",
                newName: "CustomerProfiles");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProfile_Id",
                table: "CustomerProfiles",
                newName: "IX_CustomerProfiles_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles",
                column: "CustomerProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProfiles_AspNetUsers_Id",
                table: "CustomerProfiles",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductStatus_CustomerProfiles_Id",
                table: "ProductStatus",
                column: "Id",
                principalTable: "CustomerProfiles",
                principalColumn: "CustomerProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_CustomerProfiles_Id",
                table: "Review",
                column: "Id",
                principalTable: "CustomerProfiles",
                principalColumn: "CustomerProfileId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProfiles_AspNetUsers_Id",
                table: "CustomerProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductStatus_CustomerProfiles_Id",
                table: "ProductStatus");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_CustomerProfiles_Id",
                table: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles");

            migrationBuilder.RenameTable(
                name: "CustomerProfiles",
                newName: "CustomerProfile");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerProfiles_Id",
                table: "CustomerProfile",
                newName: "IX_CustomerProfile_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProfile",
                table: "CustomerProfile",
                column: "CustomerProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProfile_AspNetUsers_Id",
                table: "CustomerProfile",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductStatus_CustomerProfile_Id",
                table: "ProductStatus",
                column: "Id",
                principalTable: "CustomerProfile",
                principalColumn: "CustomerProfileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_CustomerProfile_Id",
                table: "Review",
                column: "Id",
                principalTable: "CustomerProfile",
                principalColumn: "CustomerProfileId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
