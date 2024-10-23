using Microsoft.AspNetCore.Authentication.JwtBearer;
using RunApp.Api.Middleware;
using RunApp.Infrastructure;
using RunnApp.Application;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RunApp.Api.Services;
using RunApp.Infrastructure.Middleware;
using RunnApp.Application.Common.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration.GetConnectionString("DefaultConnection"), builder.Configuration);
builder.Services.AddApplicationLayer();
builder.Services.AddTransient<IJwtServiceGenerator, JwtServiceGenerator>();
builder.Logging.AddConsole();
builder.Services.AddHttpContextAccessor();


builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    
}).AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };
        opt.IncludeErrorDetails = true;
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "StoreProfile", 
        policyBuilder => policyBuilder.RequireClaim("StoreProfile", "true"));

    options.AddPolicy(
        "ProductMustBeBoughtInOrderToBeRated",
        policyBuilder => policyBuilder.AddRequirements(new ProductMusBeBoughtRequirement())
        );
});

var app = builder.Build();

app.UseEventsInfrastructureMiddleware();

app.UseExceptionMiddleware();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
