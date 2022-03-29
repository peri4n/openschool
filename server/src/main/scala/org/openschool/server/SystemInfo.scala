package org.openschool.server

import cats.effect.Concurrent
import cats.implicits._
import io.circe.{Encoder, Decoder}
import org.http4s._
import org.http4s.implicits._
import org.http4s.client.Client
import org.http4s.client.dsl.Http4sClientDsl
import org.http4s.circe._
import org.http4s.Method._

trait SystemInfo[F[_]]:
  def get: F[SystemInfo.Info]

object SystemInfo:
  def apply[F[_]](using ev: SystemInfo[F]): SystemInfo[F] = ev

  final case class Info(schoolName: String)
  object Info:
    given Decoder[Info] = Decoder.derived[Info]
    given [F[_]: Concurrent]: EntityDecoder[F, Info] = jsonOf
    given Encoder[Info] = Encoder.AsObject.derived[Info]
    given [F[_]]: EntityEncoder[F, Info] = jsonEncoderOf

  final case class InfoError(e: Throwable) extends RuntimeException

  def impl[F[_]: Concurrent]: SystemInfo[F] = new SystemInfo[F]:
    import dsl._
    def get: F[SystemInfo.Info] = Info("Walldorf Schule").pure[F]
