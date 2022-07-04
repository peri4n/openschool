package org.openschool.server

import cats.effect.Sync
import cats.effect.Async
import cats.implicits._
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl
import sttp.tapir._
import sttp.tapir.json.circe._
import sttp.tapir.generic.auto._
import sttp.tapir.server.http4s.Http4sServerInterpreter
import cats.effect.IO
import sttp.tapir.docs.openapi.OpenAPIDocsInterpreter
import sttp.apispec.openapi.OpenAPI
import sttp.tapir.swagger.bundle.SwaggerInterpreter

object BackendRoutes:

  def interpreter[F[_]: Async] = Http4sServerInterpreter[F]()

  def jokeRoutes[F[_]: Sync](J: Jokes[F]): HttpRoutes[F] =
    val dsl = new Http4sDsl[F] {}
    import dsl._
    HttpRoutes.of[F] { case GET -> Root / "joke" =>
      for {
        joke <- J.get
        resp <- Ok(joke)
      } yield resp
    }

  def usersRoutes[F[_]: Sync](U: Users[F]): HttpRoutes[F] =
    val dsl = new Http4sDsl[F] {}
    import dsl._
    HttpRoutes.of[F] { case GET -> Root / "users" =>
      for {
        users <- U.get
        resp <- Ok(users)
      } yield resp
    }

  def systemInfoRoutes[F[_]: Async](J: SystemInfo[F]): HttpRoutes[F] =
    interpreter[F].toRoutes(systenInfoEndpoint.serverLogic(_ => J.get.map(Right(_))))

  val systenInfoEndpoint = endpoint.get
    .in("info")
    .out(jsonBody[SystemInfo.Info])

  def swaggerEndpoints[F[_]] = SwaggerInterpreter().fromEndpoints[F](List(systenInfoEndpoint), "Openschool", "1.0")

  def swaggerRoute[F[_]: Async] = interpreter[F].toRoutes(swaggerEndpoints)

  def helloWorldRoutes[F[_]: Sync](H: HelloWorld[F]): HttpRoutes[F] =
    val dsl = new Http4sDsl[F] {}
    import dsl._
    HttpRoutes.of[F] { case GET -> Root / "hello" / name =>
      for {
        greeting <- H.hello(HelloWorld.Name(name))
        resp <- Ok(greeting)
      } yield resp
    }
