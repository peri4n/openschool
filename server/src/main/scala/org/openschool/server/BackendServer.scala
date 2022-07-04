package org.openschool.server

import cats.Applicative
import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import cats.effect.{Async, Resource}
import cats.syntax.all._
import com.comcast.ip4s._
import fs2.Stream
import org.http4s.ember.client.EmberClientBuilder
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.implicits._
import org.http4s.server.middleware.Logger
import org.http4s.server.middleware.CORS
import org.http4s.headers.Origin
import org.http4s.Uri

object BackendServer:

  def config[F[_]: Applicative]: Resource[F, Config] = 
    Resource.pure(ConfigFactory.load())

  def stream[F[_]: Async]: Stream[F, Nothing] = {
    for {
      config <- Stream.resource(config[F])
      port = config.getInt("port")
      client <- Stream.resource(EmberClientBuilder.default[F].build)
      helloWorldAlg = HelloWorld.impl[F]
      systemInfoAlg = SystemInfo.impl[F]
      users = Users.impl[F]
      jokeAlg = Jokes.impl[F](client)

      corsOriginSettings = CORS.policy
        .withAllowOriginHost(
          Set(
            Origin.Host(Uri.Scheme.https, Uri.RegName("localhost"), port.some),
            Origin.Host(Uri.Scheme.http, Uri.RegName("localhost"), port.some)
          )
        )
        .withAllowCredentials(false)

      // Combine Service Routes into an HttpApp.
      // Can also be done via a Router if you
      // want to extract a segments not checked
      // in the underlying routes.
      httpApp = corsOriginSettings(
        BackendRoutes.helloWorldRoutes[F](helloWorldAlg) <+>
          API.systemInfoRoutes[F](systemInfoAlg) <+>
          BackendRoutes.jokeRoutes[F](jokeAlg) <+>
          API.swaggerRoute[F] <+>
          BackendRoutes.usersRoutes[F](users)
      ).orNotFound

      // With Middlewares in place
      finalHttpApp = Logger.httpApp(true, true)(httpApp)

      exitCode <- Stream.resource(
        EmberServerBuilder
          .default[F]
          .withHost(ipv4"0.0.0.0")
          .withPort(Port.fromInt(port).get)
          .withHttpApp(finalHttpApp)
          .build >>
          Resource.eval(Async[F].never)
      )
    } yield exitCode
  }.drain
