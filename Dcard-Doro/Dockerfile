#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/runtime:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Dcard-Doro/Dcard-Doro.csproj", "Dcard-Doro/"]
RUN dotnet restore "Dcard-Doro/Dcard-Doro.csproj"
COPY . .
WORKDIR "/src/Dcard-Doro"
RUN dotnet build "Dcard-Doro.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dcard-Doro.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dcard-Doro.dll"]