using Alignly.Api.Services;
using OpenAI;
using OpenAI.Chat;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Configure JSON serialization for camelCase to match PDF service
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure HTTP Client for PDF service
builder.Services.AddHttpClient("PdfService", client =>
{
    var pdfServiceUrl = builder.Configuration["PdfService:BaseUrl"] ?? "http://localhost:3001";
    client.BaseAddress = new Uri(pdfServiceUrl);
    client.DefaultRequestHeaders.Add("Accept", "application/pdf");
    client.Timeout = TimeSpan.FromMinutes(2); // PDF generation can take time
});

// Register default HttpClient for controller injection
builder.Services.AddScoped<HttpClient>(provider =>
{
    var httpClientFactory = provider.GetRequiredService<IHttpClientFactory>();
    return httpClientFactory.CreateClient("PdfService");
});

// Configure OpenAI - API key is required for production
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");

if (string.IsNullOrEmpty(openAiApiKey))
{
    throw new InvalidOperationException("OpenAI API key is required. Please set the OPENAI_API_KEY environment variable or configure it in appsettings.json.");
}

// Register OpenAI services
builder.Services.AddSingleton(new OpenAIClient(openAiApiKey));
builder.Services.AddTransient<ChatClient>(provider => 
    provider.GetRequiredService<OpenAIClient>().GetChatClient("gpt-3.5-turbo"));
builder.Services.AddScoped<IResumeService, ResumeService>();

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
