FROM maven:3.6.3-openjdk-11 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -q
CMD mvn spring-boot:run
EXPOSE 8080
