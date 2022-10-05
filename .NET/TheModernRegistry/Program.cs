using TheModernRegistry.Data;
using Microsoft.EntityFrameworkCore;
using TheModernRegistry.Models;
using TheModernRegistry;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MissionDbContext>(
    o =>
    {
        if (builder.Environment.IsProduction())
        {
            DotNetEnv.Env.Load();
            var conString = Environment.GetEnvironmentVariable("CON_STRING");

            o.UseSqlServer(
                conString,
                providerOptions => providerOptions.EnableRetryOnFailure()
            );
        }
        else
        {
            o.UseSqlServer(builder.Configuration["Mission:LocalConnectionString"]);
        }
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
PrepDB.PrepPopulation(app);
app.UseAuthorization();

app.MapControllers();

app.Run();
