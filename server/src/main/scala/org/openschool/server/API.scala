package org.openschool.server

import cats.implicits._
import sttp.apispec.openapi.OpenAPI
import sttp.tapir._
import sttp.tapir.docs.openapi.OpenAPIDocsInterpreter
import sttp.tapir.generic.auto._
import sttp.tapir.json.circe._
import sttp.tapir.server.http4s.Http4sServerInterpreter
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import cats.effect.Async

object API:

  def interpreter[F[_]: Async] = Http4sServerInterpreter[F]()

  val systenInfoEndpoint = endpoint.get
    .in("info")
    .out(jsonBody[SystemInfo.Info])

  def systemInfoRoutes[F[_]: Async](J: SystemInfo[F]) = interpreter[F].toRoutes(
      systenInfoEndpoint.serverLogic(_ => J.get.map(Right(_))))

  def swaggerEndpoints[F[_]] = SwaggerInterpreter().fromEndpoints[F](List(systenInfoEndpoint), "Openschool", "1.0")

  def swaggerRoute[F[_]: Async] = interpreter[F].toRoutes(swaggerEndpoints)

