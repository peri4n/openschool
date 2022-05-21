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

trait Users[F[_]]:
  def get: F[Users.Students]


object Users :
  def apply[F[_]](using ev: Users[F]): Users[F] = ev
  
  final case class Student(id: Int, first: String, last: String)
  final case class Students(students: List[Student])

  object Student:
    given Decoder[Student] = Decoder.derived[Student]
    given [F[_]: Concurrent]: EntityDecoder[F, Student] = jsonOf
    given Encoder[Student] = Encoder.AsObject.derived[Student]
    given [F[_]]: EntityEncoder[F, Student] = jsonEncoderOf

  object Students:
    given Decoder[Students] = Decoder.derived[Students]
    given [F[_]: Concurrent]: EntityDecoder[F, Students] = jsonOf
    given Encoder[Students] = Encoder.AsObject.derived[Students]
    given [F[_]]: EntityEncoder[F, Students] = jsonEncoderOf

  def impl[F[_]: Concurrent]: Users[F] = new Users[F]:
    import dsl._
    def get: F[Students] = Students(List(Student(1, "foo", "bar"))).pure[F]

