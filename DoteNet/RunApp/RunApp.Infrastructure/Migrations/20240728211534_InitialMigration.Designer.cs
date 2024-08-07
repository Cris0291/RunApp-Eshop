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
    [Migration("20240728211534_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RunApp.Domain.ProductAggregate.Reviews.Review", b =>
                {
                    b.Property<Guid>("ReviewId")
                        .ValueGeneratedOnAdd()
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

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ReviewDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ReviewId");

                    b.HasIndex("ProductId");

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

                    b.Property<decimal?>("Discount")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("decimal(5,2)")
                        .HasComputedColumnSql("100 * (1-[PriceWithDiscount]/[ActualPrice])", true);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("PriceWithDiscount")
                        .HasColumnType("decimal(10,2)");

                    b.Property<string>("PromotionalText")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProductId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            ProductId = new Guid("1115bad9-7787-4d1f-aa8c-46b863d9bfec"),
                            ActualPrice = 500m,
                            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            Name = "Xbox",
                            PriceWithDiscount = 275.75m,
                            PromotionalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae enim dolor. Nunc in nibh lectus. Cvestibulum id augue. Sed luctus convar. Sed interdum non quam quis eleifend"
                        },
                        new
                        {
                            ProductId = new Guid("3a58c55b-acb0-4d17-9d95-9242af2b0431"),
                            ActualPrice = 500m,
                            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                            Name = "PlayStation",
                            PromotionalText = ""
                        });
                });

            modelBuilder.Entity("RunApp.Domain.ProductAggregate.Reviews.Review", b =>
                {
                    b.HasOne("RunApp.Domain.Products.Product", null)
                        .WithMany("Reviews")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RunApp.Domain.Products.Product", b =>
                {
                    b.OwnsMany("RunApp.Domain.ProductAggregate.AboutValueType.About", "BulletPoints", b1 =>
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

                    b.Navigation("BulletPoints");
                });

            modelBuilder.Entity("RunApp.Domain.Products.Product", b =>
                {
                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
