// var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; //CORS

// var builder = WebApplication.CreateBuilder(args);

// // CORS
// builder.Services.AddCors(options =>
// {                     // placeholder for string which is above
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       policy  =>
//                       {
//                                             // This is the link to your website
//                           policy.WithOrigins("https://localhost:7039")
//                           .AllowAnyHeader()
//                           .AllowAnyMethod();
//                       });
// });
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// var app = builder.Build();
// if (app.Environment.IsDevelopment()) // Configure the HTTP request pipeline.
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
// app.UseHttpsRedirection();
// app.UseStaticFiles(); // CORS
// app.UseRouting();
// app.UseCors(MyAllowSpecificOrigins); // Cors must be between routing and authorization
// app.UseAuthorization();
// app.MapControllers();
// app.Run();


// 
// var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AnotherPolicy",
                      policy  =>
                      {
                          policy.AllowAnyOrigin()
                                            .AllowAnyHeader()
                                            .AllowAnyMethod()
                                            ;
                      });
});

// services.AddResponseCaching();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// app.UseCors(MyAllowSpecificOrigins);
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();