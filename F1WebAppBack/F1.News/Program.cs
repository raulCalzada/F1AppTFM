using F1.Shared.Application;
using F1.Shared.Database;
using FastEndpoints;
using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder();

// Add services to the container.
builder.Services.AddFastEndpoints();
builder.Services.AddSwaggerDocument();

// Add the layers
builder.UseDatabaseLayer();
builder.UseApplicationLayer();


//Build the app
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseFastEndpoints();
app.UseSwaggerGen();

await app.RunAsync();
