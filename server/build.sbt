val Http4sVersion = "0.23.6"
val MunitVersion = "0.7.29"
val LogbackVersion = "1.2.6"
val MunitCatsEffectVersion = "1.0.6"
val TapirVersion = "1.0.1"

lazy val server = (project in file("."))
  .settings(
    organization := "org.openschool",
    name := "server",
    version := "0.0.1-SNAPSHOT",
    scalaVersion := "3.1.0",
    assembly / mainClass := Some("org.openschool.server.Main"),
    libraryDependencies ++= Seq(
      "com.typesafe" % "config" % "1.4.2",

      "org.http4s" %% "http4s-ember-server" % Http4sVersion,
      "org.http4s" %% "http4s-ember-client" % Http4sVersion,
      "org.http4s" %% "http4s-circe" % Http4sVersion,
      "io.circe" %% "circe-generic" % "0.14.1",

      "org.http4s" %% "http4s-dsl" % Http4sVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-core" % TapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-json-circe" % TapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-http4s-server" % TapirVersion,
      "com.softwaremill.sttp.tapir" %% "tapir-swagger-ui-bundle" % TapirVersion,

      "org.scalameta" %% "munit" % MunitVersion % Test,
      "org.typelevel" %% "munit-cats-effect-3" % MunitCatsEffectVersion % Test,

      "ch.qos.logback" % "logback-classic" % LogbackVersion
    ),
    testFrameworks += new TestFramework("munit.Framework")
  )
