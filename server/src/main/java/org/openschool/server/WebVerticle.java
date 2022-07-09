package org.openschool.server;

import java.net.URI;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import io.vertx.ext.auth.JWTOptions;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTAuthOptions;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.codec.BodyCodec;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.JWTAuthHandler;

public class WebVerticle extends AbstractVerticle {

  private final JsonObject config;

  public WebVerticle(JsonObject config) {
    this.config = config;
  }

  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    setupJwtAuth()
        .compose(this::setupRouter)
        .compose(this::startServer)
        .onComplete(startPromise::handle);
  }

  private Future<JWTAuth> setupJwtAuth() {
    var jwtConfig = config.getJsonObject("jwt");
    var issuer = jwtConfig.getString("issuer");
    var issuerUri = URI.create(issuer);

    // derive JWKS uri from Keycloak issuer URI
    var jwksUri = URI.create(jwtConfig.getString("jwksUri", String.format("%s://%s:%d%s",
        issuerUri.getScheme(), "keycloak", 8080,
        issuerUri.getPath() + "/protocol/openid-connect/certs")));

    var webClient = WebClient.create(vertx);

    var promise = Promise.<JWTAuth>promise();

    webClient.get(jwksUri.getPort(), jwksUri.getHost(), jwksUri.getPath())
        .as(BodyCodec.jsonObject())
        .send(ar -> {
          if (ar.failed()) {
            promise.fail(ar.cause());
          }

          var response = ar.result();

          var jwksResponse = response.body();
          var keys = jwksResponse.getJsonArray("keys");

          // Configure JWT validation options
          var jwtOptions = new JWTOptions()
              .setIssuer(issuer);

          // extract JWKS from keys array
          var jwks = StreamSupport.stream(keys.spliterator(), false)
              .map(JsonObject::mapFrom)
              .collect(Collectors.toList());

          // configure JWTAuth
          var jwtAuthOptions = new JWTAuthOptions()
              .setJwks(jwks)
              .setJWTOptions(jwtOptions);

          JWTAuth jwtAuth = JWTAuth.create(vertx, jwtAuthOptions);
          promise.complete(jwtAuth);
        });

    return promise.future();
  }

  private Future<Router> setupRouter(JWTAuth auth) {
    var router = Router.router(vertx);

    router.route().handler(JWTAuthHandler.create(auth));

    router.route().handler(CorsHandler.create("http://localhost:8000"));

    router.get("/info").handler(this::handleInfo);
    return Future.succeededFuture(router);
  }

  private Future<Void> startServer(Router router) {
    return vertx.createHttpServer()
        .requestHandler(router)
        .listen(config.getJsonObject("http").getInteger("port"))
        .mapEmpty();
  }

  private void handleInfo(RoutingContext ctx) {
    ctx.json(new JsonObject(Map.of("schoolName", "Waldorf Schule")));
  }
}
