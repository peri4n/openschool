FROM hseeberger/scala-sbt:17.0.1_1.6.1_3.1.0 as build

WORKDIR /app

COPY build.sbt .

COPY project/build.properties project/

COPY project/plugins.sbt project/

COPY src src

RUN sbt assembly

FROM openjdk:17.0.2-slim

COPY --from=build /app/target/scala-3.1.0/server-assembly-0.0.1-SNAPSHOT.jar ./

CMD java -jar server-assembly-0.0.1-SNAPSHOT.jar
