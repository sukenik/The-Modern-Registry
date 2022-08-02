FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source

COPY ./.NET ./
RUN dotnet restore "./TheModernRegistry/TheModernRegistry.csproj" --disable-parallel
RUN dotnet publish "./TheModernRegistry/TheModernRegistry.csproj" -c release -o /app --no-restore

# ------------------------------

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app
COPY --from=build /app ./

EXPOSE 80

ENTRYPOINT ["dotnet", "./TheModernRegistry.dll"]