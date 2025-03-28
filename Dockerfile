# Usa l'immagine base di OpenJDK 17
FROM openjdk:17-jdk-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file JAR nel container
COPY target/restfulBarber-0.0.1-SNAPSHOT.jar /app/restfulBarber-0.0.1-SNAPSHOT.jar

# Espone la porta sulla quale l'applicazione Spring Boot ascolta
EXPOSE 8092

# Comando per eseguire il JAR
CMD ["java", "-jar", "restfulBarber-0.0.1-SNAPSHOT.jar"]