# 1st Docker build stage: build the project with Gradle
FROM gradle:7.4.2-jdk18 as builder

WORKDIR /project
COPY . /project/

RUN gradle assemble

# 2nd Docker build stage: copy builder output and configure entry point
FROM eclipse-temurin:18
ENV APP_DIR /application
ENV APP_FILE build/container-uber-jar.jar

EXPOSE 8080

WORKDIR $APP_DIR
COPY --from=builder /project/build/libs/*-fat.jar $APP_DIR/$APP_FILE

ENTRYPOINT ["sh", "-c"]
CMD ["exec java -Dkeycloak.hostname=keycloak -Dkeycloak.port=8080 -jar $APP_FILE"]
