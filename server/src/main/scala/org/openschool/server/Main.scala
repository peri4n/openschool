package org.openschool.server

import cats.effect.{ExitCode, IO, IOApp}

object Main extends IOApp.Simple:
  def run: IO[Unit] =
    BackendServer.stream[IO].compile.drain.as(ExitCode.Success)
