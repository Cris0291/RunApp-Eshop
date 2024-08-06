﻿using RunApp.Domain.ProductAggregate.Reviews.Common;
using RunApp.Domain.Products;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("TestsUtilities")]
namespace RunApp.Domain.ProductAggregate.Reviews
{
    public class Review
    {
        internal Review() { }
        // Constructor use for unit testing
        internal Review(Guid reviewId, string comment, double numOfStars, DateTime date, ReviewDescriptionEnums reviewDescription, Guid productId)
        {
            ReviewId = reviewId;
            Comment = comment;
            NumOfStars = numOfStars;
            Date = date;
            ReviewDescription = reviewDescription;
            ProductId = productId;
        }

        public Guid ReviewId { get; internal set; }
        public string Comment { get; internal set; }
        public double NumOfStars { get; internal set; }
        //Could be map to the database as a computed column
        public DateTime Date { get; internal set; }
        public ReviewDescriptionEnums ReviewDescription { get; internal set; }
        public Guid ProductId { get; internal set; }

    }
}
