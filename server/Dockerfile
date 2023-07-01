FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 81

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

COPY ./Web ./Web

RUN dotnet restore "Web/WebApi/WebApi.csproj"

FROM build AS publish
RUN dotnet publish "Web/WebApi/WebApi.csproj" -c Release -o /app/publish -v d

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjectDocumentation.Web.WebApi.dll"]