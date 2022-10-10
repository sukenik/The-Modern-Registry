FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build-env
WORKDIR /app

COPY ./.NET/TheModernRegistry/*.csproj ./
RUN dotnet restore

COPY ./.NET .
RUN dotnet publish -c release -o ./out

# ------------------------------

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app

EXPOSE 5000
ENV ASPNETCORE_URLS=http://*:5000

COPY --from=build-env ./app/out .

ENTRYPOINT ["dotnet", "./TheModernRegistry.dll"]