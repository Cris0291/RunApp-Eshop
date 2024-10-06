using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReModelDomainMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductStatus");

            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CustomerProfiles_Id",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "CustomerProfileId",
                table: "CustomerProfiles");

            migrationBuilder.AddColumn<string>(
                name: "Ratings",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Reviews",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Statuses",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "BoughtProducts",
                table: "CustomerProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Ratings",
                table: "CustomerProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Reviews",
                table: "CustomerProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Statuses",
                table: "CustomerProfiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ProductStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductStatusId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Like = table.Column<bool>(type: "bit", nullable: true),
                    Dislike = table.Column<bool>(type: "bit", nullable: true),
                    Viewed = table.Column<bool>(type: "bit", nullable: true),
                    Bought = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatuses", x => new { x.Id, x.ProductId });
                    table.UniqueConstraint("AK_ProductStatuses_ProductStatusId", x => x.ProductStatusId);
                    table.ForeignKey(
                        name: "FK_ProductStatuses_CustomerProfiles_Id",
                        column: x => x.Id,
                        principalTable: "CustomerProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductStatuses_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RatingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumOfStars = table.Column<decimal>(type: "decimal(2,1)", precision: 2, scale: 1, nullable: false),
                    DateOfRate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => new { x.ProductId, x.Id });
                    table.UniqueConstraint("AK_Ratings_RatingId", x => x.RatingId);
                    table.ForeignKey(
                        name: "FK_Ratings_CustomerProfiles_Id",
                        column: x => x.Id,
                        principalTable: "CustomerProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ratings_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReviewId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    ReviewDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => new { x.ProductId, x.Id });
                    table.UniqueConstraint("AK_Reviews_ReviewId", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_Reviews_CustomerProfiles_Id",
                        column: x => x.Id,
                        principalTable: "CustomerProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductStatuses_ProductId",
                table: "ProductStatuses",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductStatuses_ProductStatusId",
                table: "ProductStatuses",
                column: "ProductStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_Id",
                table: "Ratings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_RatingId",
                table: "Ratings",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_Id",
                table: "Reviews",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReviewId",
                table: "Reviews",
                column: "ReviewId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductStatuses");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "Ratings",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Reviews",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Statuses",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "BoughtProducts",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "Ratings",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "Reviews",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "Statuses",
                table: "CustomerProfiles");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerProfileId",
                table: "CustomerProfiles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerProfiles",
                table: "CustomerProfiles",
                column: "CustomerProfileId");

            migrationBuilder.CreateTable(
                name: "ProductStatus",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Bought = table.Column<bool>(type: "bit", nullable: true),
                    Dislike = table.Column<bool>(type: "bit", nullable: true),
                    Like = table.Column<bool>(type: "bit", nullable: true),
                    Viewed = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatus", x => new { x.Id, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ProductStatus_CustomerProfiles_Id",
                        column: x => x.Id,
                        principalTable: "CustomerProfiles",
                        principalColumn: "CustomerProfileId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductStatus_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    RatingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerProfileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateOfRate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    NumOfStars = table.Column<decimal>(type: "decimal(2,1)", precision: 2, scale: 1, nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.RatingId);
                    table.ForeignKey(
                        name: "FK_Rating_CustomerProfiles_CustomerProfileId",
                        column: x => x.CustomerProfileId,
                        principalTable: "CustomerProfiles",
                        principalColumn: "CustomerProfileId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rating_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    ReviewDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => new { x.ProductId, x.Id });
                    table.ForeignKey(
                        name: "FK_Review_CustomerProfiles_Id",
                        column: x => x.Id,
                        principalTable: "CustomerProfiles",
                        principalColumn: "CustomerProfileId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerProfiles_Id",
                table: "CustomerProfiles",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductStatus_ProductId",
                table: "ProductStatus",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_CustomerProfileId",
                table: "Rating",
                column: "CustomerProfileId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rating_ProductId",
                table: "Rating",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_Id",
                table: "Review",
                column: "Id");
        }
    }
}
