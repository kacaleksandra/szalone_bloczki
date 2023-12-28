FROM gradle:8.5.0-jdk11 AS cache
RUN mkdir -p /home/gradle/cache_home
ENV GRADLE_USER_HOME /home/gradle/cache_home
COPY build.gradle /home/gradle/java-code/
WORKDIR /home/gradle/java-code
RUN gradle clean build -i --stacktrace

FROM gradle:8.5.0-jdk11 AS build
COPY --from=cache /home/gradle/cache_home /home/gradle/.gradle
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle uberJar --no-daemon -i --stacktrace

FROM adoptopenjdk/openjdk11-openj9:alpine-slim
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/bloczki-server.jar
ENTRYPOINT ["java", "-server", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/bloczki-server.jar"]