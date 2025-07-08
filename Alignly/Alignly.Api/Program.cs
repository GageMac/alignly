using Alignly.Api.Services;
using OpenAI;
using OpenAI.Chat;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure OpenAI
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");

if (!string.IsNullOrEmpty(openAiApiKey))
{
    // Register real OpenAI services when API key is available
    builder.Services.AddSingleton(new OpenAIClient(openAiApiKey));
    builder.Services.AddTransient<ChatClient>(provider => 
        provider.GetRequiredService<OpenAIClient>().GetChatClient("gpt-3.5-turbo"));
    builder.Services.AddScoped<IResumeService, ResumeService>();
}
else
{
    // Register mock service when no API key is available
    builder.Services.AddScoped<IResumeService, MockResumeService>();
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
