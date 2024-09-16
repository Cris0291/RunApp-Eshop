﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RunApp.Infrastructure.Common.Persistence;

#nullable disable

namespace RunApp.Infrastructure.Migrations
{
    [DbContext(typeof(AppStoreDbContext))]
    [Migration("20240909125524_RemovedStockMigration")]
    partial class RemovedStockMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", b =>
                {
                    b.Property<Guid>("CustomerProfileId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NickName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Phone")
                        .HasColumnType("int");

                    b.HasKey("CustomerProfileId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("CustomerProfiles");
                });

            modelBuilder.Entity("RunApp.Domain.CustomerProfileAggregate.ProductStatuses.ProductStatus", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool?>("Bought")
                        .HasColumnType("bit");

                    b.Property<bool?>("Dislike")
                        .HasColumnType("bit");

                    b.Property<bool?>("Like")
                        .HasColumnType("bit");

                    b.Property<bool?>("Viewed")
                        .HasColumnType("bit");

                    b.HasKey("Id", "ProductId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductStatus");
                });

            modelBuilder.Entity("RunApp.Domain.ProductAggregate.Reviews.Review", b =>
                {
                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<double>("NumOfStars")
                        .HasPrecision(2, 1)
                        .HasColumnType("float(2)");

                    b.Property<string>("ReviewDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProductId", "Id");

                    b.HasIndex("Id");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("RunApp.Domain.Products.Product", b =>
                {
                    b.Property<Guid>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("ActualPrice")
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProductId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Sales.Sale", b =>
                {
                    b.Property<Guid>("SaleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("AmountSold")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<DateTime>("DateOfTheSale")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<int>("NumberOfitemsSold")
                        .HasColumnType("int");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("StoreOwnerProfileId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("SaleId");

                    b.HasIndex("ProductId");

                    b.HasIndex("StoreOwnerProfileId");

                    b.ToTable("Sale");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.LogsStock.Log", b =>
                {
                    b.Property<Guid>("LogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("AddedStock")
                        .HasColumnType("int");

                    b.Property<int?>("RemovedStock")
                        .HasColumnType("int");

                    b.Property<int?>("SoldStock")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StockAddedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasComputedColumnSql("case when [AddedStock] is not null then [StockDate]\r\n                                              else null end", true);

                    b.Property<DateTime>("StockDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getutcdate()");

                    b.Property<Guid>("StockId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("StockRemoveDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasComputedColumnSql("case when [RemovedStock] is not null then [StockDate]\r\n                                              else null end", true);

                    b.Property<DateTime?>("StockSoldDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasComputedColumnSql("case when [SoldStock] is not null then [StockDate]\r\n                                              else null end", true);

                    b.HasKey("LogId");

                    b.HasIndex("StockId");

                    b.ToTable("Log");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.Stock", b =>
                {
                    b.Property<Guid>("StockId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RemovedQuantity")
                        .HasColumnType("int");

                    b.Property<int>("SoldQuantity")
                        .HasColumnType("int");

                    b.Property<Guid>("StockProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("StoreOwnerProfileId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("TotalQuantity")
                        .HasColumnType("int");

                    b.HasKey("StockId");

                    b.HasIndex("StockProductId")
                        .IsUnique();

                    b.HasIndex("StoreOwnerProfileId");

                    b.ToTable("Stock");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", b =>
                {
                    b.Property<Guid>("StoreProfileId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("InitialInvestment")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<bool>("IsAccountPaid")
                        .HasColumnType("bit");

                    b.Property<string>("SalesLevel")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)")
                        .HasComputedColumnSql("case when [TotalProductsSold] >=0 and [TotalProductsSold] < 1000 then 'Junior' \r\n                                        when [TotalProductsSold] >= 1000 and [TotalProductsSold] < 5000 then 'Intermediate'\r\n                                         else 'Senior' end", true);

                    b.Property<string>("StoreName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalProductsSold")
                        .HasColumnType("int");

                    b.Property<int>("TotalRemovedStock")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalSalesInCash")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<int>("TotalStock")
                        .HasColumnType("int");

                    b.HasKey("StoreProfileId");

                    b.HasIndex("Id")
                        .IsUnique();

                    b.ToTable("StoreOwnerProfiles");
                });

            modelBuilder.Entity("RunApp.Domain.UserAggregate.AppUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NickName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("RunApp.Domain.UserAggregate.Roles.AppRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.Roles.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.Roles.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithOne()
                        .HasForeignKey("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("RunApp.Domain.CustomerProfileAggregate.ValueTypes.Address", "ShippingAdress", b1 =>
                        {
                            b1.Property<Guid>("CustomerProfileId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int?>("AlternativeHouseNumber")
                                .HasColumnType("int");

                            b1.Property<string>("AlternativeStreet")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int?>("HouseNumber")
                                .HasColumnType("int");

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int?>("ZipCode")
                                .HasColumnType("int");

                            b1.HasKey("CustomerProfileId");

                            b1.ToTable("CustomerProfiles");

                            b1.WithOwner()
                                .HasForeignKey("CustomerProfileId");
                        });

                    b.Navigation("ShippingAdress");
                });

            modelBuilder.Entity("RunApp.Domain.CustomerProfileAggregate.ProductStatuses.ProductStatus", b =>
                {
                    b.HasOne("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", null)
                        .WithMany("Statuses")
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RunApp.Domain.Products.Product", null)
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.ProductAggregate.Reviews.Review", b =>
                {
                    b.HasOne("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", null)
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RunApp.Domain.Products.Product", null)
                        .WithMany("Reviews")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.Products.Product", b =>
                {
                    b.OwnsMany("RunApp.Domain.ProductAggregate.ValueType.About", "BulletPoints", b1 =>
                        {
                            b1.Property<Guid>("ProductId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"));

                            b1.Property<string>("BulletPoint")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("ProductId", "Id");

                            b1.ToTable("Bulletpoints", (string)null);

                            b1.WithOwner()
                                .HasForeignKey("ProductId");
                        });

                    b.OwnsOne("RunApp.Domain.ProductAggregate.ValueTypes.Characteristics", "Characteristic", b1 =>
                        {
                            b1.Property<Guid>("ProductId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Brand")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Color")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Type")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<decimal>("Weight")
                                .HasColumnType("decimal(6,2)");

                            b1.HasKey("ProductId");

                            b1.ToTable("Products");

                            b1.WithOwner()
                                .HasForeignKey("ProductId");
                        });

                    b.OwnsOne("RunApp.Domain.ProductAggregate.ValueTypes.PriceOffer", "PriceOffer", b1 =>
                        {
                            b1.Property<Guid>("ProductId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<decimal?>("Discount")
                                .ValueGeneratedOnAddOrUpdate()
                                .HasColumnType("decimal(5,2)")
                                .HasColumnName("Discount")
                                .HasComputedColumnSql("100 * (1-[PriceWithDiscount]/[ActualPrice])", true);

                            b1.Property<decimal?>("PriceWithDiscount")
                                .HasColumnType("decimal(10,2)")
                                .HasColumnName("PriceWithDiscount");

                            b1.Property<string>("PromotionalText")
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("PromotionalText");

                            b1.HasKey("ProductId");

                            b1.ToTable("Products");

                            b1.WithOwner()
                                .HasForeignKey("ProductId");
                        });

                    b.Navigation("BulletPoints");

                    b.Navigation("Characteristic")
                        .IsRequired();

                    b.Navigation("PriceOffer")
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Sales.Sale", b =>
                {
                    b.HasOne("RunApp.Domain.Products.Product", "ProductSold")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", null)
                        .WithMany("Sales")
                        .HasForeignKey("StoreOwnerProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProductSold");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.LogsStock.Log", b =>
                {
                    b.HasOne("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.Stock", null)
                        .WithMany("Logs")
                        .HasForeignKey("StockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.Stock", b =>
                {
                    b.HasOne("RunApp.Domain.Products.Product", null)
                        .WithOne()
                        .HasForeignKey("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.Stock", "StockProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", null)
                        .WithMany("Stocks")
                        .HasForeignKey("StoreOwnerProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", b =>
                {
                    b.HasOne("RunApp.Domain.UserAggregate.AppUser", null)
                        .WithOne()
                        .HasForeignKey("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("RunApp.Domain.StoreOwnerProfileAggregate.ValueTypes.Address", "BussinesAdress", b1 =>
                        {
                            b1.Property<Guid>("StoreOwnerProfileStoreProfileId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int?>("AlternativeBuildingNumber")
                                .HasColumnType("int");

                            b1.Property<string>("AlternativeStreet")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int>("BuildingNumber")
                                .HasColumnType("int");

                            b1.Property<string>("City")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Country")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Street")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<int>("ZipCode")
                                .HasColumnType("int");

                            b1.HasKey("StoreOwnerProfileStoreProfileId");

                            b1.ToTable("StoreOwnerProfiles");

                            b1.WithOwner()
                                .HasForeignKey("StoreOwnerProfileStoreProfileId");
                        });

                    b.OwnsOne("RunApp.Domain.StoreOwnerProfileAggregate.ValueTypes.Card", "CreditOrBussinesCard", b1 =>
                        {
                            b1.Property<Guid>("StoreOwnerProfileStoreProfileId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("CVV")
                                .HasColumnType("int");

                            b1.Property<int>("CardNumber")
                                .HasColumnType("int");

                            b1.Property<DateTime>("ExpityDate")
                                .HasColumnType("datetime2");

                            b1.Property<string>("HoldersName")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("StoreOwnerProfileStoreProfileId");

                            b1.ToTable("StoreOwnerProfiles");

                            b1.WithOwner()
                                .HasForeignKey("StoreOwnerProfileStoreProfileId");
                        });

                    b.Navigation("BussinesAdress")
                        .IsRequired();

                    b.Navigation("CreditOrBussinesCard")
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.CustomerProfileAggregate.CustomerProfile", b =>
                {
                    b.Navigation("Statuses");
                });

            modelBuilder.Entity("RunApp.Domain.Products.Product", b =>
                {
                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.Stocks.Stock", b =>
                {
                    b.Navigation("Logs");
                });

            modelBuilder.Entity("RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfile", b =>
                {
                    b.Navigation("Sales");

                    b.Navigation("Stocks");
                });
#pragma warning restore 612, 618
        }
    }
}
